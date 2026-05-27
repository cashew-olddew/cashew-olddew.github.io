import { useRef, useEffect } from 'react'
import type { UniformControlDef } from './shader-preview'
import { gdshaderToGLSL, gdshaderToVertGLSL, parseUniformDefaults, type UniformDefault } from './shader-glsl'
import { buildProgram, hexToRgb } from './shader-webgl'
import './shader-canvas.css'

interface ShaderCanvasProps {
  fullShader: string
  sprite: string
  width?: number
  height?: number
  border?: boolean
  /** 'linear' (default) or 'nearest' for pixel-art textures. */
  sampling?: 'linear' | 'nearest'
  /** Fraction (0–1) to scale the initial quad inward, giving vertex displacements room to move. Default: 0. */
  vertexPadding?: number
  controlsRef: { current: Record<string, UniformControlDef> | undefined }
  controlValuesRef: { current: Record<string, number> }
  colorValuesRef: { current: Record<string, string> }
  vecValuesRef: { current: Record<string, number[]> }
}

export function ShaderCanvas({ fullShader, sprite, width, height, border = true, sampling = 'linear', vertexPadding = 0, controlsRef, controlValuesRef, colorValuesRef, vecValuesRef }: Readonly<ShaderCanvasProps>) {
  const w = width ?? height ?? 128
  const h = height ?? width ?? 128
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const vertexPaddingRef = useRef(vertexPadding)
  vertexPaddingRef.current = vertexPadding
  const widthRef = useRef(w)
  widthRef.current = w
  const heightRef = useRef(h)
  heightRef.current = h

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Pre-compile shader sources — no GL context needed
    const shaderUniforms = parseUniformDefaults(fullShader)

    let gl: WebGLRenderingContext | null = null
    let isGL2 = false
    let loseExt: WEBGL_lose_context | null = null
    let program: WebGLProgram | null = null
    let buf: WebGLBuffer | null = null
    let texture: WebGLTexture | null = null
    let texW = 1, texH = 1
    let raf = 0
    let running = false
    let destroyed = false
    let imgEl: HTMLImageElement | null = null

    // Uniform locations — rebuilt whenever GPU resources are recreated
    let uTimeLoc: WebGLUniformLocation | null = null
    let uTexLoc: WebGLUniformLocation | null = null
    let uTexPixelSize: WebGLUniformLocation | null = null
    let uScreenPixSz: WebGLUniformLocation | null = null
    let uVertHalfSizeLoc: WebGLUniformLocation | null = null
    let uVertPadLoc: WebGLUniformLocation | null = null
    let customLocs: [string, WebGLUniformLocation | null][] = []
    let colorLocs:  [string, WebGLUniformLocation | null][] = []
    let vecLocs:    [string, 2 | 3, WebGLUniformLocation | null][] = []
    let defaultLocs: [UniformDefault, WebGLUniformLocation | null][] = []

    const start = performance.now()

    // Pre-load the sprite so it's ready when the context first initialises
    const img = new Image()
    img.onload = () => {
      if (destroyed) return
      imgEl = img
      texW = img.width
      texH = img.height
      if (gl && texture && !gl.isContextLost()) uploadImg(gl, texture)
    }
    img.src = sprite

    function uploadImg(g: WebGLRenderingContext, tex: WebGLTexture) {
      if (!imgEl) return
      const filter = sampling === 'nearest' ? g.NEAREST : g.LINEAR
      g.bindTexture(g.TEXTURE_2D, tex)
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, imgEl)
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, filter)
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, filter)
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE)
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE)
    }

    // (Re)build all GPU resources on the current gl context.
    // Called on first intersection and after every context restore.
    function buildGPU(): boolean {
      if (!gl) return false
      const fragSrc = gdshaderToGLSL(fullShader, isGL2)
      const vertSrc = gdshaderToVertGLSL(fullShader, isGL2)
      const filter = sampling === 'nearest' ? gl.NEAREST : gl.LINEAR
      try {
        program = buildProgram(gl, vertSrc, fragSrc)
      } catch (e) {
        console.log(String(e))
        return false
      }

      const verts = new Float32Array([
        -1, -1,  0, 1,
         1, -1,  1, 1,
        -1,  1,  0, 0,
         1,  1,  1, 0,
      ])
      buf = gl.createBuffer()!
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)

      gl.useProgram(program)
      const aPos = gl.getAttribLocation(program, 'aPosition')
      const aUV  = gl.getAttribLocation(program, 'aUV')
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0)
      gl.enableVertexAttribArray(aUV)
      gl.vertexAttribPointer(aUV,  2, gl.FLOAT, false, 16, 8)

      uTimeLoc      = gl.getUniformLocation(program, 'uTime')
      uTexLoc       = gl.getUniformLocation(program, 'uTexture')
      uTexPixelSize = gl.getUniformLocation(program, 'uTexturePixelSize')
      uScreenPixSz  = gl.getUniformLocation(program, 'uScreenPixelSize')
      uVertHalfSizeLoc = gl.getUniformLocation(program, 'uVertHalfSize')
      uVertPadLoc   = gl.getUniformLocation(program, 'uVertPadding')

      customLocs = []; colorLocs = []; vecLocs = []
      for (const [name, def] of Object.entries(controlsRef.current ?? {})) {
        const loc = gl.getUniformLocation(program, name)
        if (def.type === 'color') colorLocs.push([name, loc])
        else if (def.type === 'vec2') vecLocs.push([name, 2, loc])
        else if (def.type === 'vec3') vecLocs.push([name, 3, loc])
        else customLocs.push([name, loc])
      }

      const controlledNames = new Set(Object.keys(controlsRef.current ?? {}))
      defaultLocs = []
      for (const [name, def] of Object.entries(shaderUniforms)) {
        if (!controlledNames.has(name)) {
          defaultLocs.push([def, gl.getUniformLocation(program, name)])
        }
      }

      // Create texture — start with a 1×1 transparent pixel while the image loads
      texture = gl.createTexture()!
      texW = 1; texH = 1
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]))
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      if (imgEl) uploadImg(gl, texture)

      return true
    }

    function render() {
      const g = gl
      if (!g || !program || !buf || g.isContextLost()) return
      const t = (performance.now() - start) / 1000
      g.viewport(0, 0, canvas!.width, canvas!.height)
      g.clearColor(0, 0, 0, 0)
      g.clear(g.COLOR_BUFFER_BIT)
      g.useProgram(program)
      g.activeTexture(g.TEXTURE0)
      g.bindTexture(g.TEXTURE_2D, texture)
      g.uniform1i(uTexLoc, 0)
      g.uniform1f(uTimeLoc, t)
      g.uniform2f(uTexPixelSize, 1 / texW, 1 / texH)
      g.uniform2f(uScreenPixSz,  1 / canvas!.width, 1 / canvas!.height)
      if (uVertHalfSizeLoc !== null) g.uniform2f(uVertHalfSizeLoc, widthRef.current / 2, heightRef.current / 2)
      if (uVertPadLoc !== null) g.uniform1f(uVertPadLoc, vertexPaddingRef.current)
      for (const [name, loc] of customLocs) {
        if (loc !== null) g.uniform1f(loc, controlValuesRef.current[name] ?? 0)
      }
      for (const [name, loc] of colorLocs) {
        if (loc !== null) {
          const [r, b2, b] = hexToRgb(colorValuesRef.current[name] ?? '#ffffff')
          if (shaderUniforms[name]?.type === 'vec4') g.uniform4f(loc, r, b2, b, 1.0)
          else g.uniform3f(loc, r, b2, b)
        }
      }
      for (const [name, count, loc] of vecLocs) {
        if (loc !== null) {
          const vals = vecValuesRef.current[name] ?? Array.from({ length: count }, () => 0)
          if (count === 2) g.uniform2f(loc, vals[0] ?? 0, vals[1] ?? 0)
          else g.uniform3f(loc, vals[0] ?? 0, vals[1] ?? 0, vals[2] ?? 0)
        }
      }
      for (const [def, loc] of defaultLocs) {
        if (loc !== null) {
          const v = def.value
          if (def.type === 'float') g.uniform1f(loc, v[0] ?? 0)
          else if (def.type === 'vec2') g.uniform2f(loc, v[0] ?? 0, v[1] ?? 0)
          else if (def.type === 'vec3') g.uniform3f(loc, v[0] ?? 0, v[1] ?? 0, v[2] ?? 0)
          else g.uniform4f(loc, v[0] ?? 0, v[1] ?? 0, v[2] ?? 0, v[3] ?? 0)
        }
      }
      g.bindBuffer(g.ARRAY_BUFFER, buf)
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }

    function startRendering() {
      if (!running) { running = true; raf = requestAnimationFrame(render) }
    }

    function stopRendering() {
      running = false
      cancelAnimationFrame(raf)
    }

    // Free all GPU resources and release the context slot.
    // The webglcontextlost handler (below) calls e.preventDefault() so the
    // context can be restored the next time this canvas enters the viewport.
    function releaseGPU() {
      stopRendering()
      if (!gl || gl.isContextLost()) return
      if (program) { gl.deleteProgram(program); program = null }
      if (buf)     { gl.deleteBuffer(buf);      buf     = null }
      if (texture) { gl.deleteTexture(texture); texture = null }
      loseExt?.loseContext()
    }

    canvas.addEventListener('webglcontextlost', (e: Event) => {
      e.preventDefault() // required to allow restoreContext() later
      stopRendering()
    })

    canvas.addEventListener('webglcontextrestored', () => {
      if (!destroyed && buildGPU()) startRendering()
    })

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!gl) {
          // First time entering the viewport: prefer WebGL2 to avoid gl_FragColor deprecation warnings
          const rawCtx = canvas!.getContext('webgl2') ?? canvas!.getContext('webgl')
          if (!rawCtx) return
          gl = rawCtx as WebGLRenderingContext
          isGL2 = rawCtx instanceof WebGL2RenderingContext
          loseExt = gl.getExtension('WEBGL_lose_context')
          if (buildGPU()) startRendering()
        } else if (gl.isContextLost()) {
          // Coming back after context was released off-screen
          loseExt?.restoreContext() // triggers webglcontextrestored
        } else {
          startRendering()
        }
      } else {
        releaseGPU()
      }
    }, { threshold: 0, rootMargin: '0px 0px' })
    observer.observe(canvas)

    return () => {
      destroyed = true
      stopRendering()
      observer.disconnect()
      if (gl && !gl.isContextLost()) {
        if (program) gl.deleteProgram(program)
        if (buf)     gl.deleteBuffer(buf)
        if (texture) gl.deleteTexture(texture)
        loseExt?.loseContext()
      }
    }
  }, [fullShader, sprite, sampling])

  return (
    <div className={`shader-preview-canvas-wrap${border ? '' : ' no-border'}`}>
      <canvas ref={canvasRef} width={w * 2} height={h * 2} className="shader-preview-canvas" style={{ width: w, height: h }} />
    </div>
  )
}
