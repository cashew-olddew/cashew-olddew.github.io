import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Window, type WindowPosition } from '../window/window'
import { Taskbar } from '../taskbar/taskbar'
import { IconsGrid } from '../icons-grid/icons-grid'
import { Folder } from '../folder/folder'
import { getChildren, type DesktopItem } from '../../posts'
import { useSound } from '../../hooks/useSound'
import './desktop.css'

interface OpenWindow {
  id: string
  title: string
  content: React.ReactNode
  windowPosition: WindowPosition
  variant: 'folder' | 'post'
  maximized?: boolean
  minimized?: boolean
}

let topZ = 10

export function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([])
  const { play } = useSound()
  const workspaceRef = useRef<HTMLDivElement>(null)
  const rootItems = getChildren(null)

  const openItem = async (item: DesktopItem) => {
    const alreadyOpen = windows.find(w => w.id === item.id)
    if (alreadyOpen) {
      play('click')
      topZ++
      setWindows(prev => prev.map(w => w.id === item.id ? { ...w, windowPosition: { ...w.windowPosition, zIndex: topZ } } : w))
      return
    }

    play('open')
    topZ++

    let content: React.ReactNode
    if (item.type === 'folder') {
      content = <Folder folderId={item.id} onOpen={openItem} />
    } else {
      const { default: MDXContent } = await item.load!()
      content = <div className="prose"><MDXContent /></div>
    }

    setWindows(prev => [...prev, {
      id: item.id,
      title: `${item.emoji} ${item.title}`,
      content,
      variant: item.type === 'folder' ? 'folder' : 'post',
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
        <IconsGrid items={rootItems} onOpen={openItem} />

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
                variant={w.variant}
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
