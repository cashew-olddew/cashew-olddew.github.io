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

export const VERT_SRC = `
attribute vec2 aPosition;
attribute vec2 aUV;
varying vec2 vUV;
void main() {
  vUV = aUV;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

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

/** Translates a gdshader source string to GLSL ES 1.0. */
export function gdshaderToGLSL(raw: string): string {
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

  // GLSL ES 1.0 uses texture2D(); gdshader/GLSL ES 3.0 uses texture()
  s = s.replace(/\btexture\s*\(/g, 'texture2D(')

  return FRAG_PREAMBLE + '\n' + s
}
