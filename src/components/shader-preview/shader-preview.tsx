import { useRef, useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import defaultSprite from '../../assets/link-icons/kofi.png'
import { ShaderCanvas } from './shader-canvas'
import { ShaderControls } from './shader-controls'
import './shader-preview.css'

export interface UniformControlDef {
  /** Human-readable label shown next to the slider. Defaults to the uniform name. */
  label?: string
  /**
   * 'float' (default) renders a range slider and maps to `uniform float`.
   * 'vec2' renders two sliders and maps to `uniform vec2`.
   * 'vec3' renders three sliders and maps to `uniform vec3`.
   * 'color' renders a color picker and maps to `uniform vec3` (linear RGB 0–1).
   */
  type?: 'float' | 'vec2' | 'vec3' | 'color'
  // float / vec2 / vec3 options
  min?: number
  max?: number
  step?: number
  /** Initial value for float uniforms. Defaults to the midpoint of [min, max]. */
  default?: number
  /** Initial values for vec2/vec3 uniforms. Defaults to midpoint of [min, max] per component. */
  defaultVec?: number[]
  /** Initial hex color for color uniforms, e.g. '#ff8040'. Defaults to '#ffffff'. */
  defaultColor?: string
}

interface ShaderPreviewProps {
  /** Canvas display size in pixels. Default: 128. */
  size?: number
  /** Horizontal alignment of the canvas+controls group. Default: 'center'. */
  align?: 'left' | 'center' | 'right'
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
  /**
   * Optional map of uniform controls to render.
   * Declare matching uniforms in your shader, e.g. `uniform float uSpeed;`
   */
  controls?: Record<string, UniformControlDef>
  /** Whether to show the syntax-highlighted code block. Default: true. */
  showCode?: boolean
  /** Whether to show the decorative border around the canvas. Default: true. */
  border?: boolean
}

export function ShaderPreview({ size, align = 'center', sprite = defaultSprite, fullShader, children, controls, showCode = true, border = true }: Readonly<ShaderPreviewProps>) {
  const [controlValues, setControlValues] = useState<Record<string, number>>(() => {
    if (!controls) return {}
    return Object.fromEntries(
      Object.entries(controls)
        .filter(([, def]) => !def.type || def.type === 'float')
        .map(([name, def]) => [name, def.default ?? ((def.min ?? 0) + (def.max ?? 1)) / 2])
    )
  })

  const [colorValues, setColorValues] = useState<Record<string, string>>(() => {
    if (!controls) return {}
    return Object.fromEntries(
      Object.entries(controls)
        .filter(([, def]) => def.type === 'color')
        .map(([name, def]) => [name, def.defaultColor ?? '#ffffff'])
    )
  })

  const [vecValues, setVecValues] = useState<Record<string, number[]>>(() => {
    if (!controls) return {}
    return Object.fromEntries(
      Object.entries(controls)
        .filter(([, def]) => def.type === 'vec2' || def.type === 'vec3')
        .map(([name, def]) => {
          const count = def.type === 'vec2' ? 2 : 3
          const mid = ((def.min ?? 0) + (def.max ?? 1)) / 2
          return [name, def.defaultVec ?? Array.from({ length: count }, () => mid)]
        })
    )
  })

  const controlValuesRef = useRef(controlValues)
  controlValuesRef.current = controlValues
  const colorValuesRef = useRef(colorValues)
  colorValuesRef.current = colorValues
  const vecValuesRef = useRef(vecValues)
  vecValuesRef.current = vecValues
  const controlsRef = useRef(controls)
  controlsRef.current = controls

  function updateVecValue(vecName: string, index: number, value: number) {
    setVecValues(prev => {
      const next = [...(prev[vecName] ?? [])]
      next[index] = value
      return { ...prev, [vecName]: next }
    })
  }

  const hasControls = controls && Object.keys(controls).length > 0

  const displayCode = children ?? fullShader

  const [highlightedCode, setHighlightedCode] = useState<string>(
    `<pre><code>${displayCode.replaceAll('<', '&lt;')}</code></pre>`
  )

  useEffect(() => {
    if (!showCode) return
    const escaped = `<pre><code>${displayCode.replaceAll('<', '&lt;')}</code></pre>`
    setHighlightedCode(escaped)
    codeToHtml(displayCode, { lang: 'glsl', theme: 'everforest-light' })
      .then(html => setHighlightedCode(html))
      .catch(() => { /* keep plain fallback */ })
  }, [displayCode, showCode])

  const canvasEl = (
    <ShaderCanvas
      fullShader={fullShader}
      sprite={sprite}
      size={size}
      border={border}
      controlsRef={controlsRef}
      controlValuesRef={controlValuesRef}
      colorValuesRef={colorValuesRef}
      vecValuesRef={vecValuesRef}
    />
  )

  const controlsEl = hasControls ? (
    <ShaderControls
      controls={controls!}
      controlValues={controlValues}
      colorValues={colorValues}
      vecValues={vecValues}
      setControlValues={setControlValues}
      setColorValues={setColorValues}
      updateVecValue={updateVecValue}
    />
  ) : null

  const alignMap = { left: 'flex-start', center: 'center', right: 'flex-end' } as const
  const alignSelf = alignMap[align]

  return (
    <div className="shader-preview">
      {showCode && (
        <div
          className="shader-preview-code"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      )}
      <div className="shader-preview-canvas-group" style={{ alignSelf }}>
        {canvasEl}
        {controlsEl}
      </div>
    </div>
  )
}
