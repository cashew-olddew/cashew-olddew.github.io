export interface DesktopItem {
  id: string
  title: string
  emoji: string
  type: 'post' | 'folder'
  parent: string | null
  date?: string
  gridSlot?: { x: number; y: number }
  load?: () => Promise<{ default: React.ComponentType }>
}

export const items: DesktopItem[] = [
  {
    id: 'blog',
    title: 'Blog',
    emoji: '📁',
    type: 'folder',
    parent: null,
    gridSlot: { x: 1, y: 1 },
  },
  {
    id: 'make-it-exist-first',
    title: 'Make it exist',
    emoji: '🥜',
    type: 'post',
    parent: 'blog',
    date: '2026-05-03',
    load: () => import('./make-it-exist-first/make-it-exist-first.mdx'),
  },
]

export const getChildren = (parentId: string | null) =>
  items.filter(i => i.parent === parentId)

export const posts = items.filter(i => i.type === 'post')
export const folders = items.filter(i => i.type === 'folder')