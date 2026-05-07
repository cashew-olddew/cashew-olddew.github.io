import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Window, type WindowPosition } from '../window/window'
import { Taskbar } from '../taskbar/taskbar'
import { IconsGrid } from '../icons-grid/icons-grid'
import { Folder } from '../folder/folder'
import { getChildren, items, type DesktopItem } from '../../posts'
import { useSound } from '../../hooks/useSound'
import { readFromURL, updateURL } from '../../utils/desktopURL'
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
    play('open')
    topZ++

    let content: React.ReactNode
    if (item.type === 'folder') {
      content = <Folder folderId={item.id} onOpen={openItem} />
    } else {
      const { default: MDXContent } = await item.load!()
      content = <div className="prose"><MDXContent /></div>
    }

    setWindows(prev => {
      const alreadyOpen = prev.find(w => w.id === item.id)
      if (alreadyOpen) {
        updateURL(prev.map(w => w.id), item.id)
        return prev.map(w => w.id === item.id ? {
           ...w, windowPosition: { ...w.windowPosition, zIndex: topZ } 
          } : w)
      }

      const newWindow: OpenWindow = {
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
      }
      const next = [...prev, newWindow]
      updateURL(next.map(w => w.id), item.id)
      return next
    })
  }

  useEffect(() => {
    restoreFromURL()
  }, [])

  async function restoreFromURL() {
    const { openIds, focusId } = readFromURL()
    if (openIds.length === 0) return

    const toOpen = openIds
      .map(id => items.find(i => i.id === id))
      .filter((i): i is DesktopItem => i !== undefined)

    for (const item of toOpen) {
      await openItem(item)
    }

    if (focusId) focusWindow(focusId)
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
    setWindows(prev => {
      const next = prev.filter(w => w.id !== id)
      const focusId = next.at(-1)?.id ?? null
      updateURL(next.map(w => w.id), focusId)
      return next
    })
  }

  const focusWindow = (id: string) => {
    topZ++
    setWindows(prev => {
      updateURL(prev.map(w => w.id), id)
      return prev.map(w => w.id === id ? { ...w, windowPosition: { ...w.windowPosition, zIndex: topZ } } : w)
    })
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
                id={w.id}
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
