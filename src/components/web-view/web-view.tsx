import { useState, useEffect } from 'react'
import { getChildren, items, type DesktopItem } from '../../posts'
import { IconsGrid } from '../icons-grid/icons-grid'
import { pushURL, replaceURL } from '../../utils/desktopURL'
import ArrowLeft from '../../assets/ui/arrow-left.svg?react'
import '../../styles/prose.css'
import './web-view.css'

interface MobilePage {
  item: DesktopItem
  /** Loaded component for posts; undefined for folders (rendered dynamically) */
  PostContent?: React.ComponentType
}

interface MobileViewProps {
  rootItems: DesktopItem[]
  initialStackIds?: string[]
}

async function loadPage(item: DesktopItem): Promise<MobilePage> {
  if (item.type !== 'post') return { item }
  const { default: PostContent } = await item.load()
  return { item, PostContent }
}

export function MobileView({ rootItems, initialStackIds }: Readonly<MobileViewProps>) {
  const [stack, setStack] = useState<MobilePage[]>([])

  useEffect(() => {
    if (!initialStackIds?.length) { setStack([]); return }
    // Guard
    let cancelled = false
    void (async () => {
      const pages: MobilePage[] = []
      for (const id of initialStackIds) {
        const item = items.find(i => i.id === id)
        if (!item) continue
        pages.push(await loadPage(item))
      }
      if (!cancelled) setStack(pages)
    })()
    return () => { cancelled = true }
  }, [initialStackIds])

  const openItem = async (item: DesktopItem) => {
    if (item.type === 'link') {
      window.open(item.url, '_blank', 'noopener,noreferrer')
      return
    }
    const page = await loadPage(item)
    setStack(prev => {
      const next = [...prev, page]
      pushURL(next.map(p => p.item.id), null, null, 'web')
      return next
    })
  }

  const goToIndex = (index: number) => setStack(prev => {
    const next = prev.slice(0, index)
    replaceURL(next.map(p => p.item.id), null, null, 'web')
    return next
  })

  const goBack = () => goToIndex(stack.length - 1)

  const current = stack.at(-1)

  function renderContent() {
    if (!current) return <IconsGrid items={rootItems} onOpen={openItem} />
    if (current.item.type === 'folder') {
      return <IconsGrid items={getChildren(current.item.id)} onOpen={openItem} />
    }
    const Post = current.PostContent!
    return <div className="prose"><Post /></div>
  }

  return (
    <div className="web-view">
      <div className="web-view-header">
        {stack.length > 0 && (
          <button className="web-view-back" onClick={goBack} aria-label="Back">
            <ArrowLeft />
          </button>
        )}
        <nav className="web-view-breadcrumbs">
          <button className="web-view-breadcrumb" onClick={() => goToIndex(0)}>
            🏠 Home
          </button>
          {stack.map((page, i) => {
            const isCurrent = i === stack.length - 1
            return (
              <span key={page.item.id} className="web-view-breadcrumb-segment">
                <span className="web-view-breadcrumb-sep">/</span>
                {isCurrent
                  ? <span className="web-view-breadcrumb web-view-breadcrumb--current">
                      {page.item.emoji} {page.item.title}
                    </span>
                  : <button className="web-view-breadcrumb" onClick={() => goToIndex(i + 1)}>
                      {page.item.emoji} {page.item.title}
                    </button>
                }
              </span>
            )
          })}
        </nav>
      </div>
      <div className="web-view-content content-body">
        {renderContent()}
      </div>
    </div>
  )
}
