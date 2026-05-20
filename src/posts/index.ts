import Youtube from '../assets/link-icons/yt.png'
import Kofi from '../assets/link-icons/kofi.png'
import Patreon from '../assets/link-icons/patreon.png'
import FangsAndFaith from '../assets/link-icons/fangs_and_faith.ico'

type BaseItem = {
  id: string
  title: string
  icon?: string
  parent: string | null
  gridSlot?: { x: number; y: number }
}

export type PostItem = BaseItem & {
  type: 'post'
  emoji: string
  date?: string
  load: () => Promise<{ default: React.ComponentType }>
}

export type FolderItem = BaseItem & {
  type: 'folder'
  emoji: string
}

export type GroupItem = BaseItem & {
  type: 'group'
  gridSpan: { cols: number; rows: number }
}

export type LinkItem = BaseItem & {
  type: 'link'
  emoji: string
  url: string
}

export type DesktopItem = PostItem | FolderItem | GroupItem | LinkItem

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
    id: 'shaders',
    title: 'Shaders',
    emoji: '🎨',
    type: 'folder',
    parent: null,
    gridSlot: { x: 2, y: 1 },
  },
  {
    id: 'shaders-1',
    title: "1. Shaders Introduction",
    emoji: '🎨',
    type: 'post',
    parent: 'shaders',
    date: '2026-05-16',
    load: () => import('./shaders/1-shaders-introduction/1-shaders-introduction.mdx')
  },
  {
    id: 'shaders-2',
    title: '2. Shader Basics',
    emoji: '🖼️',
    type: 'post',
    parent: 'shaders',
    date: '2026-05-19',
    load: () => import('./shaders/2-shader-basics/2-shader-basics.mdx'),
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
  {
    id: 'support-group',
    title: 'Support my work',
    type: 'group',
    parent: null,
    gridSlot: { x: 1, y: 3 },
    gridSpan: { cols: 2, rows: 2 },
  },
  {
    id: 'support-kofi',
    title: 'Ko-Fi',
    emoji: '☕',
    icon: Kofi,
    type: 'link',
    parent: 'support-group',
    gridSlot: { x: 1, y: 1 },
    url: 'https://ko-fi.com/cashewolddew',
  },
  {
    id: 'support-patreon',
    title: 'Patreon',
    emoji: '🪙',
    type: 'link',
    icon: Patreon,
    parent: 'support-group',
    gridSlot: { x: 2, y: 1 },
    url: 'https://patreon.com/CashewOldDew',
  },
  {
    id: 'support-youtube',
    title: 'YouTube Members',
    emoji: '▶️',
    icon: Youtube,
    type: 'link',
    parent: 'support-group',
    gridSlot: { x: 2, y: 2 },
    url: 'https://www.youtube.com/@cashewolddew/join',
  },
  {
    id: 'fangs-and-faith',
    title: 'Fangs & Faith',
    emoji: '🎮',
    icon: FangsAndFaith,
    type: 'link',
    parent: 'support-group',
    gridSlot: { x: 1, y: 2 },
    url: 'https://store.steampowered.com/app/3032430/Fangs__Faith_Solitaire/',
  },
]

export const getChildren = (parentId: string | null) =>
  items.filter(i => i.parent === parentId)

/** Returns the chain from root to the item (inclusive), e.g. ['blog', 'make-it-exist-first'] */
export const getAncestorPath = (id: string): string[] => {
  const path: string[] = []
  let current = items.find(i => i.id === id)
  while (current) {
    path.unshift(current.id)
    current = current.parent ? items.find(i => i.id === current!.parent) : undefined
  }
  return path
}

export const posts = items.filter((i): i is PostItem => i.type === 'post')
export const folders = items.filter((i): i is FolderItem => i.type === 'folder')