import { useState } from 'react'
import './hint.css'

interface HintProps {
  message: string,
  children: React.ReactNode
}

function clampTooltip(el: HTMLSpanElement | null) {
  if (!el) return
  const margin = 8
  el.style.removeProperty('--offset-x')
  const rect = el.getBoundingClientRect()
  if (rect.right > globalThis.innerWidth - margin) {
    el.style.setProperty('--offset-x', `${-(rect.right - (globalThis.innerWidth - margin))}px`)
  } else if (rect.left < margin) {
    el.style.setProperty('--offset-x', `${margin - rect.left}px`)
  }
}

const Hint = ({message, children} : HintProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)

  return (
    <span
      className={`hint${tooltipOpen ? ' hint--active' : ''}`}
      onPointerEnter={e => { if (e.pointerType === 'mouse') setTooltipOpen(true) }}
      onPointerLeave={e => { if (e.pointerType === 'mouse') setTooltipOpen(false) }}
      onPointerUp={e => { if (e.pointerType !== 'mouse') setTooltipOpen(v => !v) }}
    >
      {children}
      {tooltipOpen && (
        <span className="hint-tooltip" role="tooltip" ref={clampTooltip}>
          {message}
        </span>
      )}
    </span>
  )
}

export default Hint