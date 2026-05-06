import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Window, type WindowPosition } from '../window/window'
import { Taskbar } from '../taskbar/taskbar'
import { posts } from '../../posts'
import { useSound } from '../../hooks/useSound'
import './desktop.css'

interface OpenWindow {
  id: string
  title: string
  content: React.ReactNode
  windowPosition: WindowPosition
  maximized?: boolean
  minimized?: boolean
}

let topZ = 10

export function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([])
  const { play } = useSound()
  const workspaceRef = useRef<HTMLDivElement>(null)

  const openPost = async (postId: string) => {
    const alreadyOpen = windows.find(w => w.id === postId)
    if (alreadyOpen) {
      play('click')
      topZ++
      setWindows(prev => prev.map(w => w.id === postId ? { ...w, windowPosition: { ...w.windowPosition, zIndex: topZ } } : w))
      return
    }

    play('open')
    const post = posts.find(p => p.id === postId)!
    const { default: MDXContent } = await post.load()
    topZ++

    setWindows(prev => [...prev, {
      id: postId,
      title: `${post.emoji} ${post.title}`,
      content: <div className="prose"><MDXContent /></div>,
      windowPosition: {
        zIndex: topZ,
        defaultPosition: {
          x: 80 + prev.length * 28,
          y: 60 + prev.length * 28,
        },
        constraintsRef: workspaceRef
      }
    }])
  }

  const maximizeWindow = (id: string) => {
    play('maximize')
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, maximized: !w.maximized, minimized: false } : w)
    )
  }

  const minimizeWindow = (id: string) => {
    play('close')
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, minimized: !w.minimized, maximized: false } : w)
    )
  }

  const closeWindow = (id: string) => {
    play('close')
    setWindows(prev => prev.filter(w => w.id !== id))
  }

  const focusWindow = (id: string) => {
    topZ++
    setWindows(prev => prev.map(w => w.id === id ? { ...w, windowPosition: { ...w.windowPosition, zIndex: topZ } } : w))
  }

  return (
    <div className="desktop">
      <div className="desktop-workspace" ref={workspaceRef}>
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
          {windows.map(w => {
            const windowPosition: WindowPosition = {
              zIndex: w.windowPosition.zIndex,
              defaultPosition: w.windowPosition.defaultPosition,
              constraintsRef: workspaceRef
            }
            return (
              <Window
                key={w.id}
                title={w.title}
                onMaximize={() => maximizeWindow(w.id)}
                onMinimize={() => minimizeWindow(w.id)}
                onClose={() => closeWindow(w.id)}
                onFocus={() => focusWindow(w.id)}
                windowPosition={windowPosition}
                maximized={w.maximized}
                minimized={w.minimized}
              >
                {w.content}
              </Window>
            )
          })}
        </AnimatePresence>
      </div>

      <Taskbar
        windows={windows.map(w => ({ id: w.id, title: w.title, minimized: w.minimized }))}
        onItemClick={minimizeWindow}
      />
    </div>
  )
}
