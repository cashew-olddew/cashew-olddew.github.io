import React from 'react'
import type { UniformControlDef } from './shader-preview'
import './shader-controls.css'

interface ShaderControlsProps {
  controls: Record<string, UniformControlDef>
  controlValues: Record<string, number>
  colorValues: Record<string, string>
  vecValues: Record<string, number[]>
  setControlValues: React.Dispatch<React.SetStateAction<Record<string, number>>>
  setColorValues: React.Dispatch<React.SetStateAction<Record<string, string>>>
  updateVecValue: (vecName: string, index: number, value: number) => void
}

export function ShaderControls({ controls, controlValues, colorValues, vecValues, setControlValues, setColorValues, updateVecValue }: Readonly<ShaderControlsProps>) {
  return (
    <div className="shader-preview-controls">
      {Object.entries(controls).flatMap(([name, def]): React.ReactElement[] => {
        const label = def.label ?? name
        const min = def.min ?? 0
        const max = def.max ?? 1
        const step = def.step ?? 0.01
        const decimals = step >= 1 ? 0 : 2
        const maxValLen = Math.max(min.toFixed(decimals).length, max.toFixed(decimals).length)

        if (def.type === 'color') {
          const value = colorValues[name] ?? def.defaultColor ?? '#ffffff'
          return [
            <label key={name} className="shader-preview-control">
              <span className="shader-preview-control-label">{label}</span>
              <input
                type="color"
                value={value}
                className="shader-preview-control-color"
                onChange={e => setColorValues(prev => ({ ...prev, [name]: e.target.value }))}
              />
            </label>
          ]
        }

        if (def.type === 'vec2' || def.type === 'vec3') {
          const comps = def.type === 'vec2' ? ['x', 'y'] : ['x', 'y', 'z']
          const mid = (min + max) / 2
          const vals = vecValues[name] ?? def.defaultVec ?? Array.from({ length: comps.length }, () => mid)
          return comps.map((comp, i) => (
            <label key={`${name}.${comp}`} className="shader-preview-control">
              <span className="shader-preview-control-label">{i === 0 ? label : ''}</span>
              <span className="shader-preview-control-comp">{comp}</span>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={vals[i] ?? mid}
                onChange={e => updateVecValue(name, i, Number.parseFloat(e.target.value))}
              />
              <span className="shader-preview-control-value" style={{ width: `${maxValLen}ch` }}>{(vals[i] ?? mid).toFixed(decimals)}</span>
            </label>
          ))
        }

        const value = controlValues[name] ?? def.default ?? (min + max) / 2
        return [
          <label key={name} className="shader-preview-control">
            <span className="shader-preview-control-label">{label}</span>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={e => setControlValues(prev => ({ ...prev, [name]: Number.parseFloat(e.target.value) }))}
            />
            <span className="shader-preview-control-value" style={{ width: `${maxValLen}ch` }}>{value.toFixed(decimals)}</span>
          </label>
        ]
      })}
    </div>
  )
}
