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
    id: 'hello-world',
    title: 'Hello, World',
    emoji: '🥜',
    type: 'post',
    parent: null,
    date: '2026-05-03',
    gridSlot: { x: 2, y: 1 },
    load: () => import('./hello-world.mdx'),
  },
  {
    id: 'hello-world2',
    title: 'Hello, World 2',
    emoji: '🥜',
    type: 'post',
    parent: 'blog',
    date: '2026-05-03',
    load: () => import('./hello-world copy.mdx'),
  },
  {
    id: 'hello-world3',
    title: 'Hello, World 3',
    emoji: '🥜',
    type: 'post',
    parent: 'blog',
    date: '2026-05-03',
    load: () => import('./hello-world copy 2.mdx'),
  },
]

export const getChildren = (parentId: string | null) =>
  items.filter(i => i.parent === parentId)

export const posts = items.filter(i => i.type === 'post')
export const folders = items.filter(i => i.type === 'folder')