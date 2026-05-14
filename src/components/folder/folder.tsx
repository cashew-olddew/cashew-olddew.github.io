import { useState, useMemo } from 'react'
import { getChildren, type DesktopItem } from '../../posts'
import { IconsGrid } from '../icons-grid/icons-grid'
import './folder.css'

interface FolderProps {
  folderId: string
  onOpen: (item: DesktopItem) => void
}

type SortOrder = 'default' | 'date-asc' | 'date-desc'

const SORT_LABELS: Record<SortOrder, string> = {
  'default': 'Sort ↕',
  'date-asc': 'Date ↑',
  'date-desc': 'Date ↓',
}

const NEXT_SORT: Record<SortOrder, SortOrder> = {
  'default': 'date-asc',
  'date-asc': 'date-desc',
  'date-desc': 'default',
}

export function Folder({ folderId, onOpen }: Readonly<FolderProps>) {
  const [sortBy, setSortBy] = useState<SortOrder>('default')

  const sorted = useMemo<DesktopItem[]>(() => {
    const allChildren = getChildren(folderId)
    if (sortBy === 'default') return allChildren
    return allChildren.sort((a, b) => {
      const da = a.type === 'post' ? (a.date ?? '') : ''
      const db = b.type === 'post' ? (b.date ?? '') : ''
      if (!da && !db) return 0
      if (!da) return 1
      if (!db) return -1
      return sortBy === 'date-asc' ? da.localeCompare(db) : db.localeCompare(da)
    })
  }, [folderId, sortBy])

  return (
    <div className="folder">
      <div className="folder-toolbar">
        <button className="folder-sort-btn" onClick={() => setSortBy(NEXT_SORT[sortBy])}>
          {SORT_LABELS[sortBy]}
        </button>
      </div>
      <IconsGrid items={sorted} onOpen={onOpen} />
    </div>
  )
}
