import { useState } from 'react'
import './desktop-corner-buttons.css'

interface DesktopCornerButtonsProps {
  readonly webMode: boolean
  readonly onToggleWebMode: () => void
}

export function DesktopCornerButtons({ webMode, onToggleWebMode }: DesktopCornerButtonsProps) {
  const [accessibleFonts, setAccessibleFonts] = useState(false)

  return (
    <div className={`desktop-corner-buttons${webMode ? ' desktop-corner-buttons--web' : ''}`}>
      <button
        className={`desktop-accessibility-toggle${accessibleFonts ? ' desktop-accessibility-toggle--active' : ''}`}
        onClick={() => {
          const next = !accessibleFonts
          setAccessibleFonts(next)
          document.documentElement.classList.toggle('accessible-fonts', next)
        }}
        title={accessibleFonts ? 'Switch to decorative fonts' : 'Switch to readable fonts'}
      >
        {accessibleFonts ? '🔤' : '🔡'}
      </button>
      <button
        className="desktop-mode-toggle"
        onClick={onToggleWebMode}
        title={webMode ? 'Switch to desktop mode' : 'Switch to website mode'}
      >
        {webMode ? '🖥️' : '🌐'}
      </button>
    </div>
  )
}
