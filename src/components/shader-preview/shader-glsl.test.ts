import { describe, it, expect } from 'vitest'
import { FRAG_PREAMBLE, FRAG_PREAMBLE_GL2, VERT_SRC, stripFunction, gdshaderToGLSL, gdshaderToVertGLSL, parseUniformDefaults } from './shader-glsl'

describe('FRAG_PREAMBLE', () => {
  it('declares the built-in uniforms', () => {
    expect(FRAG_PREAMBLE).toContain('uniform sampler2D uTexture')
    expect(FRAG_PREAMBLE).toContain('uniform float uTime')
    expect(FRAG_PREAMBLE).toContain('uniform vec2 uTexturePixelSize')
    expect(FRAG_PREAMBLE).toContain('uniform vec2 uScreenPixelSize')
  })

  it('defines the gdshader macro aliases', () => {
    expect(FRAG_PREAMBLE).toContain('#define UV vUV')
    expect(FRAG_PREAMBLE).toContain('#define TIME uTime')
    expect(FRAG_PREAMBLE).toContain('#define COLOR gl_FragColor')
  })
})

describe('VERT_SRC', () => {
  it('declares aPosition and aUV attributes', () => {
    expect(VERT_SRC).toContain('attribute vec2 aPosition')
    expect(VERT_SRC).toContain('attribute vec2 aUV')
  })

  it('passes UV to vUV varying', () => {
    expect(VERT_SRC).toContain('varying vec2 vUV')
    expect(VERT_SRC).toContain('vUV = aUV')
  })
})

describe('stripFunction', () => {
  it('removes a simple top-level function', () => {
    const src = 'float x = 1.0;\nvoid vertex() {\n  x = 2.0;\n}\nfloat y = 3.0;'
    const result = stripFunction(src, 'vertex')
    expect(result).not.toContain('void vertex()')
    expect(result).not.toContain('x = 2.0')
    expect(result).toContain('float x = 1.0')
    expect(result).toContain('float y = 3.0')
  })

  it('handles nested braces correctly', () => {
    const src = 'void vertex() {\n  if (true) {\n    if (false) { int n = 0; }\n  }\n}\nvoid main() {}'
    const result = stripFunction(src, 'vertex')
    expect(result).not.toContain('void vertex()')
    expect(result).not.toContain('int n = 0')
    expect(result).toContain('void main()')
  })

  it('returns the source unchanged when function is not found', () => {
    const src = 'void main() { gl_FragColor = vec4(1.0); }'
    expect(stripFunction(src, 'vertex')).toBe(src)
  })

  it('preserves everything outside the stripped function', () => {
    const src = 'uniform float u;\nvoid vertex() { float x; }\nuniform vec2 v;'
    const result = stripFunction(src, 'vertex')
    expect(result).toContain('uniform float u')
    expect(result).toContain('uniform vec2 v')
  })

  it('handles a function with whitespace variants in the signature', () => {
    const src = 'void vertex  (  )  {\n  float x = 0.0;\n}\nfloat z;'
    const result = stripFunction(src, 'vertex')
    expect(result).not.toContain('float x = 0.0')
    expect(result).toContain('float z')
  })
})

describe('gdshaderToGLSL', () => {
  it('strips shader_type declaration', () => {
    const src = 'shader_type canvas_item;\nvoid fragment() { COLOR = vec4(1.0); }'
    expect(gdshaderToGLSL(src)).not.toContain('shader_type')
  })

  it('strips render_mode declaration', () => {
    const src = 'render_mode blend_mix, unshaded;\nvoid fragment() { COLOR = vec4(1.0); }'
    expect(gdshaderToGLSL(src)).not.toContain('render_mode')
  })

  it('renames void fragment() to void main()', () => {
    const src = 'void fragment() { COLOR = vec4(UV, 0.0, 1.0); }'
    const result = gdshaderToGLSL(src)
    expect(result).toContain('void main()')
    expect(result).not.toContain('void fragment()')
  })

  it('wraps bare body (no fragment entry point) in void main()', () => {
    const src = 'COLOR = vec4(1.0, 0.0, 0.0, 1.0);'
    const result = gdshaderToGLSL(src)
    expect(result).toContain('void main()')
    expect(result).toContain('COLOR = vec4(1.0, 0.0, 0.0, 1.0)')
  })

  it('strips the vertex() function', () => {
    const src = 'void vertex() { VERTEX.x += 1.0; }\nvoid fragment() { COLOR = vec4(1.0); }'
    const result = gdshaderToGLSL(src)
    expect(result).not.toContain('void vertex()')
    expect(result).not.toContain('VERTEX.x')
  })

  it('replaces texture( with texture2D(', () => {
    const src = 'void fragment() { COLOR = texture(TEXTURE, UV); }'
    const result = gdshaderToGLSL(src)
    expect(result).toContain('texture2D(')
    expect(result).not.toMatch(/\btexture\(/)
  })

  it('prepends FRAG_PREAMBLE to the output', () => {
    const src = 'void fragment() { COLOR = vec4(1.0); }'
    const result = gdshaderToGLSL(src)
    expect(result.startsWith(FRAG_PREAMBLE)).toBe(true)
  })

  it('handles a full realistic shader', () => {
    const src = [
      'shader_type canvas_item;',
      'render_mode blend_mix;',
      'uniform float uBrightness : hint_range(0.0, 2.0) = 1.0;',
      'void vertex() { VERTEX.x = 0.0; }',
      'void fragment() {',
      '  vec4 col = texture(TEXTURE, UV);',
      '  COLOR = vec4(col.rgb * uBrightness, col.a);',
      '}',
    ].join('\n')

    const result = gdshaderToGLSL(src)
    expect(result).not.toContain('shader_type')
    expect(result).not.toContain('render_mode')
    expect(result).not.toContain('void vertex()')
    expect(result).toContain('void main()')
    expect(result).toContain('texture2D(TEXTURE')
    expect(result).toContain('uniform float uBrightness')
    expect(result.startsWith(FRAG_PREAMBLE)).toBe(true)
  })

  it('preserves sampler2D uniform declarations', () => {
    const src = [
      'shader_type canvas_item;',
      'uniform sampler2D noise_tex;',
      'void fragment() {',
      '  vec4 n = texture(noise_tex, UV);',
      '  COLOR = n;',
      '}',
    ].join('\n')
    const result = gdshaderToGLSL(src)
    expect(result).toContain('uniform sampler2D noise_tex;')
    expect(result).toContain('texture2D(noise_tex')
  })

  it('preserves multiple sampler2D uniforms', () => {
    const src = [
      'shader_type canvas_item;',
      'uniform sampler2D overlay_tex;',
      'uniform sampler2D mask_tex;',
      'void fragment() {',
      '  vec4 o = texture(overlay_tex, UV);',
      '  vec4 m = texture(mask_tex, UV);',
      '  COLOR = o * m.r;',
      '}',
    ].join('\n')
    const result = gdshaderToGLSL(src)
    expect(result).toContain('uniform sampler2D overlay_tex;')
    expect(result).toContain('uniform sampler2D mask_tex;')
  })

  it('strips hints from sampler2D uniforms (source_color etc.)', () => {
    const src = [
      'shader_type canvas_item;',
      'uniform sampler2D noise_tex : source_color;',
      'void fragment() { COLOR = texture(noise_tex, UV); }',
    ].join('\n')
    const result = gdshaderToGLSL(src)
    expect(result).toContain('uniform sampler2D noise_tex;')
    expect(result).not.toContain('source_color')
  })

  it('uses texture() (not texture2D) in WebGL2 mode', () => {
    const src = 'void fragment() { COLOR = texture(TEXTURE, UV); }'
    const result = gdshaderToGLSL(src, true)
    expect(result).toContain('texture(')
    expect(result).not.toContain('texture2D(')
    expect(result.startsWith(FRAG_PREAMBLE_GL2)).toBe(true)
  })
})

describe('gdshaderToVertGLSL', () => {
  it('returns default passthrough when no vertex() function exists', () => {
    const src = 'void fragment() { COLOR = vec4(1.0); }'
    const result = gdshaderToVertGLSL(src)
    expect(result).toContain('attribute vec2 aPosition')
    expect(result).toContain('vUV = aUV')
    expect(result).toContain('gl_Position')
  })

  it('wraps vertex() in a main() function', () => {
    const src = 'void vertex() { VERTEX.x += 10.0; }'
    const result = gdshaderToVertGLSL(src)
    expect(result).toContain('void main()')
    expect(result).toContain('_gdshader_vertex()')
    expect(result).toContain('VERTEX.x += 10.0')
  })

  it('strips fragment() from the vertex shader output', () => {
    const src = [
      'void vertex() { VERTEX.x += 1.0; }',
      'void fragment() { COLOR = vec4(1.0); }',
    ].join('\n')
    const result = gdshaderToVertGLSL(src)
    expect(result).not.toContain('COLOR')
    expect(result).toContain('VERTEX.x += 1.0')
  })

  it('strips shader_type and render_mode', () => {
    const src = [
      'shader_type canvas_item;',
      'render_mode unshaded;',
      'void vertex() { VERTEX.y += 5.0; }',
    ].join('\n')
    const result = gdshaderToVertGLSL(src)
    expect(result).not.toContain('shader_type')
    expect(result).not.toContain('render_mode')
  })

  it('preserves user uniforms in vertex output', () => {
    const src = [
      'uniform float wave_amount : hint_range(0.0, 10.0) = 2.0;',
      'void vertex() { VERTEX.x += wave_amount; }',
    ].join('\n')
    const result = gdshaderToVertGLSL(src)
    expect(result).toContain('uniform float wave_amount;')
    expect(result).not.toContain('hint_range')
  })

  it('replaces texture() with texture2D() in WebGL1 mode', () => {
    const src = 'void vertex() { vec4 c = texture(TEXTURE, UV); }'
    const result = gdshaderToVertGLSL(src)
    expect(result).toContain('texture2D(')
  })

  it('keeps texture() in WebGL2 mode', () => {
    const src = 'void vertex() { vec4 c = texture(TEXTURE, UV); }'
    const result = gdshaderToVertGLSL(src, true)
    expect(result).toContain('texture(')
    expect(result).not.toContain('texture2D(')
  })
})

describe('parseUniformDefaults', () => {
  it('parses a float uniform with default', () => {
    const src = 'uniform float brightness : hint_range(0.0, 2.0) = 1.5;'
    const result = parseUniformDefaults(src)
    expect(result.brightness).toEqual({ type: 'float', value: [1.5] })
  })

  it('parses a float uniform without default', () => {
    const src = 'uniform float speed;'
    const result = parseUniformDefaults(src)
    expect(result.speed).toEqual({ type: 'float', value: [0] })
  })

  it('parses a vec2 uniform with default', () => {
    const src = 'uniform vec2 offset = vec2(0.5, 0.3);'
    const result = parseUniformDefaults(src)
    expect(result.offset).toEqual({ type: 'vec2', value: [0.5, 0.3] })
  })

  it('parses a vec3 uniform with default', () => {
    const src = 'uniform vec3 tint : source_color = vec3(1.0, 0.5, 0.0);'
    const result = parseUniformDefaults(src)
    expect(result.tint).toEqual({ type: 'vec3', value: [1.0, 0.5, 0.0] })
  })

  it('parses a vec4 uniform without default', () => {
    const src = 'uniform vec4 color;'
    const result = parseUniformDefaults(src)
    expect(result.color).toEqual({ type: 'vec4', value: [0, 0, 0, 0] })
  })

  it('ignores sampler2D uniforms', () => {
    const src = [
      'uniform sampler2D noise_tex;',
      'uniform sampler2D overlay_tex : source_color;',
      'uniform float brightness = 1.0;',
    ].join('\n')
    const result = parseUniformDefaults(src)
    expect(result.noise_tex).toBeUndefined()
    expect(result.overlay_tex).toBeUndefined()
    expect(result.brightness).toBeDefined()
  })

  it('parses multiple uniforms from a full shader', () => {
    const src = [
      'shader_type canvas_item;',
      'uniform float speed : hint_range(0.0, 5.0) = 1.0;',
      'uniform vec2 direction = vec2(1.0, 0.0);',
      'uniform sampler2D noise;',
      'void fragment() { COLOR = vec4(1.0); }',
    ].join('\n')
    const result = parseUniformDefaults(src)
    expect(Object.keys(result)).toHaveLength(2)
    expect(result.speed).toEqual({ type: 'float', value: [1.0] })
    expect(result.direction).toEqual({ type: 'vec2', value: [1.0, 0.0] })
  })
})
