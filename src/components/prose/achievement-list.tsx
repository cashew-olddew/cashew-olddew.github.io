import type { ReactNode } from 'react'
import './achievement-list.css'

interface AchievementListProps {
  children: ReactNode
  title?: string
}

export function AchievementList({ children, title = '🏆 Achievements Unlocked' }: Readonly<AchievementListProps>) {
  return (
    <div className="achievement-list">
      <span className="achievement-list-title">{title}</span>
      <div className="achievement-flourish" aria-hidden="true" />
      {children}
      <div className="achievement-flourish achievement-flourish--bottom" aria-hidden="true" />
    </div>
  )
}
