import './support-me.css'

import kofiIcon from '../../assets/link-icons/kofi.png'
import patreonIcon from '../../assets/link-icons/patreon.png'
import ytIcon from '../../assets/link-icons/yt.png'
import fangsIcon from '../../assets/link-icons/fangs_and_faith.ico'

interface SupportLink {
  label: string
  href: string
  icon: string
  description?: string
}

interface SocialLink {
  label: string
  href: string
  emoji: string
}

const SUPPORT_LINKS: SupportLink[] = [
  {
    label: 'Ko-Fi',
    href: 'https://ko-fi.com/cashewolddew',
    icon: kofiIcon,
  },
  {
    label: 'Patreon',
    href: 'https://www.patreon.com/c/CashewOldDew',
    icon: patreonIcon,
  },
  {
    label: 'YouTube Membership',
    href: 'https://www.youtube.com/channel/UC4Tv4nxn8yZjyZKMvs_NvAg/join',
    icon: ytIcon,
  },
  {
    label: 'Fangs & Faith Solitaire',
    href: 'https://store.steampowered.com/app/3032430/Fangs__Faith_Solitaire/',
    icon: fangsIcon,
  },
]

const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/cashew-olddew/', emoji: '🐙' },
  { label: 'Discord', href: 'https://discord.gg/3jkTF9FgWJ', emoji: '💬' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/cashewolddew.bsky.social', emoji: '🦋' },
  { label: 'X / Twitter', href: 'https://x.com/CashewOldDew', emoji: '✖️' },
]

export function SupportMe() {
  return (
    <div className="support-me">
      <p className="support-me-heading">Support</p>
      <div className="support-me-grid">
        {SUPPORT_LINKS.map(({ label, href, icon, description }) => (
          <a
            key={href}
            className="support-me-card"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="support-me-icon" src={icon} alt={label} />
            <span className="support-me-label">{label}</span>
            {description && (
              <span className="support-me-description">{description}</span>
            )}
          </a>
        ))}
      </div>
      <p className="support-me-heading">Follow me</p>
      <div className="support-me-grid">
        {SOCIAL_LINKS.map(({ label, href, emoji }) => (
          <a
            key={href}
            className="support-me-card"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="support-me-emoji" role="img" aria-label={label}>{emoji}</span>
            <span className="support-me-label">{label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
