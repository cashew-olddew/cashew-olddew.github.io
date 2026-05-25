import { useState } from 'react'
import './desktop-corner-buttons.css'
import rssIcon from '../../assets/ui/rss.png'

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
      <a
        className="desktop-rss-link"
        href="/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
        title="RSS feed"
      >
        <img src={rssIcon} alt="RSS" width="20" height="20" />
      </a>
    </div>
  )
}
