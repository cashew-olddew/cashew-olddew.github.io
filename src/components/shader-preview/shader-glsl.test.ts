import { describe, it, expect } from 'vitest'
import { FRAG_PREAMBLE, VERT_SRC, stripFunction, gdshaderToGLSL } from './shader-glsl'

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
})
