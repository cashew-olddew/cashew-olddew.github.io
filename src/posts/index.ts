export interface PostMeta {
  id: string
  title: string
  emoji: string
  date: string
  load: () => Promise<{ default: React.ComponentType }>    
}

export const posts: PostMeta[] = [
  {
    id: 'hello-world',
    title: 'Hello, World',
    emoji: '🥜',
    date: '2026-05-03',
    load: () => import('./hello-world.mdx'),
  },
]