// gdshader → GLSL ES 1.0 translation utilities

export const FRAG_PREAMBLE = `precision mediump float;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uTexturePixelSize;
uniform vec2 uScreenPixelSize;

varying vec2 vUV;

#define TEXTURE uTexture
#define UV vUV
#define TIME uTime
#define TEXTURE_PIXEL_SIZE uTexturePixelSize
#define SCREEN_PIXEL_SIZE uScreenPixelSize
#define FRAGCOORD gl_FragCoord
#define COLOR gl_FragColor
`

export const FRAG_PREAMBLE_GL2 = `#version 300 es
precision mediump float;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uTexturePixelSize;
uniform vec2 uScreenPixelSize;

in vec2 vUV;
out vec4 fragColor;

#define TEXTURE uTexture
#define UV vUV
#define TIME uTime
#define TEXTURE_PIXEL_SIZE uTexturePixelSize
#define SCREEN_PIXEL_SIZE uScreenPixelSize
#define FRAGCOORD gl_FragCoord
#define COLOR fragColor
`

export const VERT_SRC = `
attribute vec2 aPosition;
attribute vec2 aUV;
varying vec2 vUV;
void main() {
  vUV = aUV;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

export const VERT_SRC_GL2 = `#version 300 es
in vec2 aPosition;
in vec2 aUV;
out vec2 vUV;
void main() {
  vUV = aUV;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

/** Returns true when the source contains a void vertex() function. */
export function hasVertexFunction(src: string): boolean {
  return /void\s+vertex\s*\(\s*\)/.test(src)
}

/**
 * Translates a gdshader source into a GLSL ES 1.0 vertex shader.
 * Falls back to the default VERT_SRC passthrough if no vertex() function is found.
 *
 * VERTEX is exposed as a mutable global vec2 in local pixel-space (±uVertHalfSize),
 * where uVertHalfSize is vec2(width/2, height/2) passed from the canvas component.
 * mirroring Godot's canvas_item vertex built-in.
 * UV is also a mutable global vec2, so vertex() can remap texture coordinates.
 *
 * uVertPadding (0–1) scales the initial quad position inward, giving vertex
 * displacements room to move without being clipped at the canvas edge.
 */
export function gdshaderToVertGLSL(raw: string, gl2 = false): string {
  if (!hasVertexFunction(raw)) return gl2 ? VERT_SRC_GL2 : VERT_SRC

  let s = raw

  // Strip Godot-specific top-level declarations
  s = s.replace(/shader_type\s+\w+\s*;/g, '')
  s = s.replace(/render_mode\s+[^;]+;/g, '')

  // Strip Godot uniform hints and default values
  s = s.replace(/(uniform\s+\w+\s+\w+)\s*(?::[^=;\n]+)?(?:=[^;\n]+)?;/g, '$1;')

  // Rename vertex() → _gdshader_vertex() so we can wrap it in our own main()
  s = s.replace(/void\s+vertex\s*\(\s*\)/, 'void _gdshader_vertex()')

  // Strip fragment() — it can't compile in the vertex shader context
  s = stripFunction(s, 'fragment')

  // GLSL ES 1.0 uses texture2D(); GLSL ES 3.00 (WebGL2) uses texture()
  if (!gl2) s = s.replace(/\btexture\s*\(/g, 'texture2D(')

  const preamble = gl2 ? `#version 300 es
in vec2 aPosition;
in vec2 aUV;
out vec2 vUV;

uniform float uTime;
uniform vec2 uVertHalfSize;
uniform float uVertPadding;
uniform vec2 uTexturePixelSize;
uniform vec2 uScreenPixelSize;

#define TIME uTime
#define TEXTURE_PIXEL_SIZE uTexturePixelSize
#define SCREEN_PIXEL_SIZE uScreenPixelSize

// Mutable built-ins — read and write these inside vertex()
vec2 VERTEX;
vec2 UV;
` : `attribute vec2 aPosition;
attribute vec2 aUV;
varying vec2 vUV;

uniform float uTime;
uniform vec2 uVertHalfSize;
uniform float uVertPadding;
uniform vec2 uTexturePixelSize;
uniform vec2 uScreenPixelSize;

#define TIME uTime
#define TEXTURE_PIXEL_SIZE uTexturePixelSize
#define SCREEN_PIXEL_SIZE uScreenPixelSize

// Mutable built-ins — read and write these inside vertex()
vec2 VERTEX;
vec2 UV;
`

  const mainFn = `
void main() {
  vec2 _half = uVertHalfSize;
  VERTEX = aPosition * _half * (1.0 - uVertPadding);
  UV = aUV;
  _gdshader_vertex();
  vUV = UV;
  gl_Position = vec4(VERTEX / _half, 0.0, 1.0);
}
`

  return preamble + '\n' + s + mainFn
}

/** Removes a top-level `void <name>() { ... }` function, handling nested braces. */
export function stripFunction(src: string, name: string): string {
  const pattern = new RegExp(String.raw`void\s+${name}\s*\(\s*\)\s*\{`)
  const match = pattern.exec(src)
  if (!match) return src

  let depth = 0
  let i = match.index + match[0].length - 1 // position of opening '{'
  while (i < src.length) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') {
      depth--
      if (depth === 0) return src.slice(0, match.index) + src.slice(i + 1)
    }
    i++
  }
  return src // unbalanced — return as-is
}

/** Translates a gdshader source string to GLSL ES 1.0 (WebGL1) or GLSL ES 3.00 (WebGL2). */
export function gdshaderToGLSL(raw: string, gl2 = false): string {
  let s = raw

  // Strip Godot-specific top-level declarations
  s = s.replace(/shader_type\s+\w+\s*;/g, '')
  s = s.replace(/render_mode\s+[^;]+;/g, '')

  // Strip Godot uniform hints (: source_color, : hint_range(...), etc.) and default values
  s = s.replace(/(uniform\s+\w+\s+\w+)\s*(?::[^=;\n]+)?(?:=[^;\n]+)?;/g, '$1;')

  // If there is no fragment entry point, treat the whole thing as the body
  const hasEntry = /void\s+fragment\s*\(\s*\)/.test(s)
  if (hasEntry) {
    s = s.replace(/void\s+fragment\s*\(\s*\)/, 'void main()')
  } else {
    s = `void main() {\n${s}\n}`
  }

  // Strip any vertex() function (brace-counter handles nested blocks)
  s = stripFunction(s, 'vertex')

  // GLSL ES 1.0 uses texture2D(); GLSL ES 3.00 (WebGL2) uses texture()
  if (!gl2) s = s.replace(/\btexture\s*\(/g, 'texture2D(')

  return (gl2 ? FRAG_PREAMBLE_GL2 : FRAG_PREAMBLE) + '\n' + s
}

export interface UniformDefault {
  type: 'float' | 'vec2' | 'vec3' | 'vec4'
  value: number[]
}

/** Parses uniform declarations from a gdshader source, returning name → type + default value. */
export function parseUniformDefaults(src: string): Record<string, UniformDefault> {
  const result: Record<string, UniformDefault> = {}
  const pattern = /uniform\s+(float|vec[234])\s+(\w+)\s*(?::[^=;\n]+)?(?:=\s*([^;\n]+))?;/g
  let match: RegExpExecArray | null
  while ((match = pattern.exec(src)) !== null) {
    const type = match[1] as UniformDefault['type']
    const name = match[2]
    const defaultStr = match[3]?.trim()
    let value: number[]
    if (defaultStr) {
      value = type === 'float'
        ? [parseFloat(defaultStr)]
        : (defaultStr.match(/\(([^)]+)\)/)?.[1] ?? '').split(',').map(s => parseFloat(s.trim()))
    } else {
      const count = type === 'float' ? 1 : parseInt(type[3])
      value = Array.from({ length: count }, () => 0)
    }
    result[name] = { type, value }
  }
  return result
}
