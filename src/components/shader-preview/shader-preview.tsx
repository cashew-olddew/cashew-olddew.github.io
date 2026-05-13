/* WARNING: This file has been AI generated */

import React, { useRef, useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import defaultSprite from '../../assets/link-icons/kofi.png'
import './shader-preview.css'

// ---------------------------------------------------------------------------
// gdshader → GLSL ES 1.0 translation
// ---------------------------------------------------------------------------

const FRAG_PREAMBLE = `precision mediump float;

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

// Removes a top-level `void <name>() { ... }` function, handling nested braces.
function stripFunction(src: string, name: string): string {
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

function gdshaderToGLSL(raw: string): string {
  let s = raw

  // Strip Godot-specific top-level declarations
  s = s.replace(/shader_type\s+\w+\s*;/g, '')
  s = s.replace(/render_mode\s+[^;]+;/g, '')

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

const VERT_SRC = `
attribute vec2 aPosition;
attribute vec2 aUV;
varying vec2 vUV;
void main() {
  vUV = aUV;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

// ---------------------------------------------------------------------------
// WebGL helpers
// ---------------------------------------------------------------------------

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? 'unknown error'
    gl.deleteShader(shader)
    throw new Error(log)
  }
  return shader
}

function buildProgram(gl: WebGLRenderingContext, vertSrc: string, fragSrc: string): WebGLProgram {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc)
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc)
  const program = gl.createProgram()!
  gl.attachShader(program, vert)
  gl.attachShader(program, frag)
  gl.linkProgram(program)
  gl.deleteShader(vert)
  gl.deleteShader(frag)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) ?? 'link error'
    gl.deleteProgram(program)
    throw new Error(log)
  }
  return program
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ShaderPreviewProps {
  /**
   * Maps to CSS `flex-direction` on the flex container.
   * E.g. 'row' | 'row-reverse' | 'column' | 'column-reverse'
   */
  direction?: React.CSSProperties['flexDirection']
  /**
   * Maps to CSS `justify-content` on the flex container.
   * Controls placement along the main (horizontal) axis.
   * E.g. 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
   */
  layoutX?: React.CSSProperties['justifyContent']
  /**
   * Maps to CSS `align-items` on the flex container.
   * Controls placement along the cross (vertical) axis.
   * E.g. 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
   */
  layoutY?: React.CSSProperties['alignItems']
  /** URL of a sprite/image to use as TEXTURE. Defaults to kofi.png. */
  sprite?: string
  /**
   * The full runnable gdshader. Always used for the WebGL preview.
   * If `children` is omitted, this is also shown as the code block.
   */
  fullShader: string
  /**
   * Optional snippet to display in the code block instead of fullShader.
   * Useful when you want to highlight only a relevant part of the shader.
   */
  children?: string
}

export function ShaderPreview({ direction = 'row', layoutX = 'flex-start', layoutY = 'center', sprite = defaultSprite, fullShader, children }: Readonly<ShaderPreviewProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const displayCode = children ?? fullShader

  const [highlightedCode, setHighlightedCode] = useState<string>(
    `<pre><code>${displayCode.replaceAll('<', '&lt;')}</code></pre>`
  )

  // Syntax-highlight with shiki (glsl is the closest grammar to gdshader)
  useEffect(() => {
    const escaped = `<pre><code>${displayCode.replaceAll('<', '&lt;')}</code></pre>`
    setHighlightedCode(escaped)
    codeToHtml(displayCode, {
      lang: 'glsl',
      theme: 'everforest-light',
    }).then(html => setHighlightedCode(html)).catch(() => {
      // keep the plain fallback already set above
    })
  }, [displayCode])

  // WebGL render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) { return }

    const fragSrc = gdshaderToGLSL(fullShader)

    let program: WebGLProgram
    try {
      program = buildProgram(gl, VERT_SRC, fragSrc)
    } catch (e) {
      console.log(String(e))
      return
    }

    // Full-screen quad: position (x,y) + UV (u,v) interleaved, TRIANGLE_STRIP
    const verts = new Float32Array([
      -1, -1,  0, 1,
       1, -1,  1, 1,
      -1,  1,  0, 0,
       1,  1,  1, 0,
    ])
    const buf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)

    gl.useProgram(program)
    const aPos = gl.getAttribLocation(program, 'aPosition')
    const aUV  = gl.getAttribLocation(program, 'aUV')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0)
    gl.enableVertexAttribArray(aUV)
    gl.vertexAttribPointer(aUV,  2, gl.FLOAT, false, 16, 8)

    const uTimeLoc      = gl.getUniformLocation(program, 'uTime')
    const uTexLoc       = gl.getUniformLocation(program, 'uTexture')
    const uTexPixelSize = gl.getUniformLocation(program, 'uTexturePixelSize')
    const uScreenPixSz  = gl.getUniformLocation(program, 'uScreenPixelSize')

    // Create texture and load sprite into it
    const texture = gl.createTexture()!
    let texW = 1, texH = 1

    // Start with a 1×1 transparent pixel so the canvas isn't black while loading
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]))
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    const img = new Image()
    img.onload = () => {
      texW = img.width; texH = img.height
      gl.bindTexture(gl.TEXTURE_2D, texture)
      // WebGL1: no mipmaps for NPOT textures — use LINEAR + CLAMP_TO_EDGE
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    }
    img.src = sprite

    const start = performance.now()
    let raf = 0

    function render() {
      const t = (performance.now() - start) / 1000
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
      gl!.clearColor(0, 0, 0, 0)
      gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.useProgram(program)
      gl!.activeTexture(gl!.TEXTURE0)
      gl!.bindTexture(gl!.TEXTURE_2D, texture)
      gl!.uniform1i(uTexLoc, 0)
      gl!.uniform1f(uTimeLoc, t)
      gl!.uniform2f(uTexPixelSize, 1 / texW, 1 / texH)
      gl!.uniform2f(uScreenPixSz,  1 / canvas!.width, 1 / canvas!.height)
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      gl.deleteProgram(program)
      gl.deleteBuffer(buf)
      gl.deleteTexture(texture)
    }
  }, [fullShader, sprite])

  return (
    <div className="shader-preview" style={{ flexDirection: direction, justifyContent: layoutX, alignItems: layoutY }}>
      <div className="shader-preview-canvas-wrap">
        <canvas ref={canvasRef} width={256} height={256} className="shader-preview-canvas" />
      </div>
      <div
        className="shader-preview-code"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  )
}
