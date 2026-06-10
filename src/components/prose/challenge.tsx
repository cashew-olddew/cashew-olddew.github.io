import { useState, type ReactNode } from 'react'
import './challenge.css'
import ChevronsDown from '../../assets/ui/chevrons-down.svg?react'
import Hide from '../../assets/ui/hide.svg?react'
import Unhide from '../../assets/ui/unhide.svg?react'

interface ChallengeStepProps {
  question: ReactNode
  children?: ReactNode
}

export function ChallengeStep({ question, children }: Readonly<ChallengeStepProps>) {
  const [open, setOpen] = useState(false)

  return (
    <div className="challenge-step">
      <div className="challenge-step-header">
        <p className="challenge-step-question">{question}</p>
      </div>
      {children && (
        <div className="challenge-step-answer">
          <button
            className="challenge-answer-toggle"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
          >
            <ChevronsDown className={`challenge-answer-chevron${open ? ' challenge-answer-chevron--open' : ''}`} aria-hidden="true" />
            {open ? 'hide answer' : 'show answer'}
          </button>
          {open && (
            <div className="challenge-answer-content">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface ChallengeBlockProps {
  children: ReactNode
  title?: string
}

export function ChallengeBlock({ children, title = 'Challenge' }: Readonly<ChallengeBlockProps>) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`challenge-block${collapsed ? ' challenge-block--collapsed' : ''}`}>
      <div className="challenge-block-header">
        <span className="challenge-block-title">⚔ {title}</span>
        <button
          className="challenge-block-toggle"
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? 'Show challenge' : 'Hide challenge'}
          aria-expanded={!collapsed}
        >
          {collapsed ? <Unhide aria-hidden="true" /> : <Hide aria-hidden="true" />}
        </button>
      </div>
      {!collapsed && (
        <>
          <div className="challenge-flourish" aria-hidden="true" />
          <div className="challenge-block-content">
            {children}
          </div>
        </>
      )}
    </div>
  )
}
