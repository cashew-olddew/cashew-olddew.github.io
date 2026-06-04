import { useState, useEffect, useId } from 'react'
import './hint.css'

interface HintProps {
  message: string,
  children: React.ReactNode
}

// Module-level registry: when a hint opens, it broadcasts its id so all others close
type Listener = (activeId: string) => void
const listeners = new Set<Listener>()
function broadcastOpen(id: string) { listeners.forEach(fn => fn(id)) }

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
  const id = useId()
  const [tooltipOpen, setTooltipOpen] = useState(false)

  useEffect(() => {
    const listener: Listener = (activeId) => {
      if (activeId !== id) setTooltipOpen(false)
    }
    listeners.add(listener)
    return () => { listeners.delete(listener) }
  }, [id])

  const open = () => { broadcastOpen(id); setTooltipOpen(true) }
  const close = () => setTooltipOpen(false)

  return (
    <span
      className={`hint${tooltipOpen ? ' hint--active' : ''}`}
      onPointerEnter={e => { if (e.pointerType === 'mouse') open() }}
      onPointerLeave={e => { if (e.pointerType === 'mouse') close() }}
      onPointerUp={e => { if (e.pointerType !== 'mouse') { tooltipOpen ? close() : open() } }}
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
