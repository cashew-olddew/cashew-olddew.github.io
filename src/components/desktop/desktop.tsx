import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Window, type WindowPosition } from '../window/window'
import { Taskbar } from '../taskbar/taskbar'
import { IconsGrid } from '../icons-grid/icons-grid'
import { Folder } from '../folder/folder'
import { MobileView } from '../web-view/web-view'
import { DesktopCornerButtons } from './desktop-corner-buttons'
import { getChildren, items, getAncestorPath, type DesktopItem } from '../../posts'
import { useSound } from '../../hooks/useSound'
import { readFromURL, pushURL, replaceURL } from '../../utils/desktopURL'
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


export function Desktop() {
  const topZRef = useRef(10);
  const [windows, setWindows] = useState<OpenWindow[]>([])
  const [webMode, setWebMode] = useState(false)
  const [initialWebStackIds, setInitialWebStackIds] = useState<string[]>([])
  const { play } = useSound()
  const workspaceRef = useRef<HTMLDivElement>(null)
  const openWindowIds = useRef<Set<string>>(new Set())
  const rootItems = getChildren(null)

  const openItem = async (item: DesktopItem, options?: { maximized?: boolean }) => {
    const alreadyOpen = openWindowIds.current.has(item.id)
    if (alreadyOpen) {
      play('click')
      topZRef.current++
      setWindows(prev => {
        const next = prev.map(w => w.id === item.id
          ? { ...w, minimized: false, windowPosition: { ...w.windowPosition, zIndex: topZRef.current } }
          : w
        )
        const maximizedId = next.find(w => w.maximized)?.id ?? null
        replaceURL(next.map(w => w.id), item.id, maximizedId)
        return next
      })
      return
    }

    topZRef.current++
    let content: React.ReactNode
    if (item.type === 'folder') {
      content = <Folder folderId={item.id} onOpen={openItem} />
    } else {
      const { default: MDXContent } = await item.load!()
      content = <div className="prose"><MDXContent /></div>
    }

    openWindowIds.current.add(item.id)
    play('open')
    setWindows(prev => {
      const newWindow: OpenWindow = {
        id: item.id,
        title: `${item.emoji} ${item.title}`,
        content,
        variant: item.type === 'folder' ? 'folder' : 'post',
        maximized: options?.maximized,
        windowPosition: {
          zIndex: topZRef.current,
          defaultPosition: options?.maximized
            ? { x: 0, y: 0 }
            : { x: 80 + prev.length * 28, y: 60 + prev.length * 28 },
          constraintsRef: workspaceRef
        }
      }
      const next = [...prev, newWindow]
      pushURL(next.map(w => w.id), item.id, null)
      return next
    })
  }

  useEffect(() => {
    restoreFromURL()
  }, [])

  async function restoreFromURL() {
    const { openIds, focusId, maximizedId, view } = readFromURL()

    if (view === 'web') {
      setWebMode(true)
      setInitialWebStackIds(openIds)
      return
    }

    if (openIds.length === 0) return

    const toOpen = openIds
      .map(id => items.find(i => i.id === id))
      .filter((i): i is DesktopItem => i !== undefined)

    for (const item of toOpen) {
      await openItem(item, item.id === maximizedId ? { maximized: true } : undefined)
    }

    if (focusId && focusId !== maximizedId) focusWindow(focusId)
  }

  const maximizeWindow = (id: string, forceMaximize = false) => {
    play('maximize')
    setWindows(prev => {
      const next = prev.map(w => w.id === id
        ? { ...w, maximized: forceMaximize ? true : !w.maximized, minimized: false }
        : w
      )
      const maximizedId = next.find(w => w.maximized)?.id ?? null
      replaceURL(next.map(w => w.id), id, maximizedId)
      return next
    })
  }

  const minimizeWindow = (id: string) => {
    play('close')
    setWindows(prev => {
      const next = prev.map(w => w.id === id ? { ...w, minimized: !w.minimized, maximized: false } : w)
      const maximizedId = next.find(w => w.maximized)?.id ?? null
      replaceURL(next.map(w => w.id), id, maximizedId)
      return next
    })
  }

  const closeWindow = (id: string) => {
    play('close')
    openWindowIds.current.delete(id)
    setWindows(prev => {
      const next = prev.filter(w => w.id !== id)
      const focusId = next.at(-1)?.id ?? null
      const maximizedId = next.find(w => w.maximized)?.id ?? null
      pushURL(next.map(w => w.id), focusId, maximizedId)
      return next
    })
  }

  const focusWindow = (id: string) => {
    topZRef.current++
    setWindows(prev => {
      const maximizedId = prev.find(w => w.maximized)?.id ?? null
      replaceURL(prev.map(w => w.id), id, maximizedId)
      return prev.map(w => w.id === id ? { ...w, windowPosition: { ...w.windowPosition, zIndex: topZRef.current } } : w)
    })
  }

  return (
    <div className="desktop">
      <DesktopCornerButtons
        webMode={webMode}
        onToggleWebMode={() => {
          const next = !webMode
          setWebMode(next)
          if (next) {
            const focused = windows.reduce<OpenWindow | null>(
              (a, b) => !a || b.windowPosition.zIndex > a.windowPosition.zIndex ? b : a,
              null
            )
            const stackIds = focused ? getAncestorPath(focused.id) : []
            setInitialWebStackIds(stackIds)
            replaceURL(stackIds, null, null, 'web')
          } else {
            // Read the current web stack from the URL (MobileView keeps it in sync)
            const { openIds } = readFromURL()
            const focusId = openIds.at(-1) ?? null

            // Clear all windows and restore them from url.
            // Probably it would be better to cleanly build the window state,
            // but this seems like a decent fix for now
            setWindows([])
            openWindowIds.current.clear()
            setInitialWebStackIds([])
            replaceURL(openIds, focusId, null)
            if (openIds.length > 0) {
              void restoreFromURL()
            }
          }
        }}
      />

      {webMode
        ? <MobileView rootItems={rootItems} initialStackIds={initialWebStackIds} />
        : <>
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

            <div className="desktop-taskbar">
              <Taskbar
                windows={windows.map(w => ({ id: w.id, title: w.title, minimized: w.minimized }))}
                onItemClick={minimizeWindow}
              />
            </div>
          </>
      }
    </div>
  )
}
