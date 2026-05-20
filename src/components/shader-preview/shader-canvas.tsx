import { useRef, useEffect } from 'react'
import type { UniformControlDef } from './shader-preview'
import { gdshaderToGLSL, VERT_SRC } from './shader-glsl'
import { buildProgram, hexToRgb } from './shader-webgl'
import './shader-canvas.css'

interface ShaderCanvasProps {
  fullShader: string
  sprite: string
  size?: number
  controlsRef: { current: Record<string, UniformControlDef> | undefined }
  controlValuesRef: { current: Record<string, number> }
  colorValuesRef: { current: Record<string, string> }
  vecValuesRef: { current: Record<string, number[]> }
}

export function ShaderCanvas({ fullShader, sprite, size = 128, controlsRef, controlValuesRef, colorValuesRef, vecValuesRef }: Readonly<ShaderCanvasProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

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

    const customLocs: [string, WebGLUniformLocation | null][] = []
    const colorLocs:  [string, WebGLUniformLocation | null][] = []
    const vecLocs:    [string, 2 | 3, WebGLUniformLocation | null][] = []
    for (const [name, def] of Object.entries(controlsRef.current ?? {})) {
      const loc = gl.getUniformLocation(program, name)
      if (def.type === 'color') colorLocs.push([name, loc])
      else if (def.type === 'vec2') vecLocs.push([name, 2, loc])
      else if (def.type === 'vec3') vecLocs.push([name, 3, loc])
      else customLocs.push([name, loc])
    }

    // Create texture — start with a 1×1 transparent pixel while the image loads
    const texture = gl.createTexture()!
    let texW = 1, texH = 1
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]))
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    let destroyed = false
    const img = new Image()
    img.onload = () => {
      if (destroyed) return
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
    let running = false

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
      for (const [name, loc] of customLocs) {
        if (loc !== null) gl!.uniform1f(loc, controlValuesRef.current[name] ?? 0)
      }
      for (const [name, loc] of colorLocs) {
        if (loc !== null) {
          const [r, g, b] = hexToRgb(colorValuesRef.current[name] ?? '#ffffff')
          gl!.uniform3f(loc, r, g, b)
        }
      }
      for (const [name, count, loc] of vecLocs) {
        if (loc !== null) {
          const vals = vecValuesRef.current[name] ?? Array.from({ length: count }, () => 0)
          if (count === 2) gl!.uniform2f(loc, vals[0] ?? 0, vals[1] ?? 0)
          else gl!.uniform3f(loc, vals[0] ?? 0, vals[1] ?? 0, vals[2] ?? 0)
        }
      }
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        raf = requestAnimationFrame(render)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    }, { threshold: 0 })
    observer.observe(canvas)

    return () => {
      destroyed = true
      cancelAnimationFrame(raf)
      observer.disconnect()
      gl.deleteProgram(program)
      gl.deleteBuffer(buf)
      gl.deleteTexture(texture)
    }
  }, [fullShader, sprite])

  return (
    <div className="shader-preview-canvas-wrap">
      <canvas ref={canvasRef} width={size * 2} height={size * 2} className="shader-preview-canvas" style={{ width: size, height: size }} />
    </div>
  )
}
