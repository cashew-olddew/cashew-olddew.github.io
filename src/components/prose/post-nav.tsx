import ArrowLeft from '../../assets/ui/arrow-left.svg?react'
import { items, type PostItem } from '../../posts'
import { usePostNav } from './post-nav-context'
import './post-nav.css'

interface PostNavProps {
  postId: string
}

export function PostNav({ postId }: Readonly<PostNavProps>) {
  const navigate = usePostNav()

  const current = items.find(i => i.id === postId)
  if (current?.type !== 'post') return null

  const siblings = items.filter((i): i is PostItem => i.type === 'post' && i.parent === current.parent)
  const idx = siblings.findIndex(i => i.id === postId)
  const prev = siblings[idx - 1] ?? null
  const next = siblings[idx + 1] ?? null

  if (!prev && !next) return null

  return (
    <nav className="post-nav">
      {prev ? (
        <button className="post-nav-btn" onClick={() => navigate(postId, prev.id)}>
          <ArrowLeft className="post-nav-icon" />
          <span>{prev.title}</span>
        </button>
      ) : <span />}
      {next && (
        <button className="post-nav-btn post-nav-btn--next" onClick={() => navigate(postId, next.id)}>
          <span>{next.title}</span>
          <ArrowLeft className="post-nav-icon post-nav-icon--flipped" />
        </button>
      )}
    </nav>
  )
}
