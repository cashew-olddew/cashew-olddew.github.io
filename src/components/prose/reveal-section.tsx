import { useState, useRef, useEffect, type ReactNode } from 'react'
import './reveal-section.css'

interface RevealSectionProps {
  children: ReactNode
  label?: string
}

export function RevealSection({ children, label }: Readonly<RevealSectionProps>) {
  const [revealed, setRevealed] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (label) return
    const el = triggerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true) },
      { rootMargin: '0px 0px -15% 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [label])

  if (revealed) {
    return <div className="reveal-section">{children}</div>
  }

  if (label) {
    return (
      <div className="reveal-section--hidden">
        <button className="reveal-section-btn" onClick={() => setRevealed(true)}>
          {label}
        </button>
      </div>
    )
  }

  return (
    <div ref={triggerRef} className="reveal-section--hidden" />
  )
}
