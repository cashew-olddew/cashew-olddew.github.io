import { useState, useCallback, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Window } from './components/window/window'
import { posts } from './posts'
import { useSound } from './hooks/useSound'
import './styles/desktop.css'

interface OpenWindow {
  id: string
  title: string
  content: React.ReactNode
  zIndex: number
  defaultPosition: { x: number; y: number }
}

let topZ = 10

export default function App() {
  const [windows, setWindows] = useState<OpenWindow[]>([])
  const { play } = useSound()
  const desktopRef = useRef<HTMLDivElement>(null)

  const openPost = useCallback(async (postId: string) => {
    const alreadyOpen = windows.find(w => w.id === postId)
    if (alreadyOpen) {
      play('click')
      topZ++
      setWindows(prev => prev.map(w => w.id === postId ? { ...w, zIndex: topZ } : w))
      return
    }

    play('open')
    const post = posts.find(p => p.id === postId)!
    const { default: MDXContent } = await post.load()
    topZ++

    setWindows(prev => [...prev, {
      id: postId,
      title: `${post.emoji} ${post.title}`,
      content: <MDXContent />,
      zIndex: topZ,
      defaultPosition: {
        x: 80 + prev.length * 28,
        y: 60 + prev.length * 28,
      },
    }])
  }, [windows, play])

  const closeWindow = useCallback((id: string) => {
    play('close')
    setWindows(prev => prev.filter(w => w.id !== id))
  }, [play])

  const focusWindow = useCallback((id: string) => {
    topZ++
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: topZ } : w))
  }, [])

  return (
    <div className="desktop" ref={desktopRef}>
      <div className="desktop-icons-grid">
        {posts.map(post => (
          <div
            key={post.id}
            className="desktop-icon"
            onDoubleClick={() => openPost(post.id)}
          >
            <span className="icon-emoji">{post.emoji}</span>
            <span>{post.title}</span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {windows.map(w => (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            onClose={closeWindow}
            onFocus={focusWindow}
            zIndex={w.zIndex}
            defaultPosition={w.defaultPosition}
            constraintsRef={desktopRef}
          >
            {w.content}
          </Window>
        ))}
      </AnimatePresence>
    </div>
  )
}