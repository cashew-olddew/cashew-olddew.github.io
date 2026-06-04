export const SITE_URL = 'https://cashew-olddew.github.io'

export interface PostMeta {
  id: string
  title: string
  emoji: string
  date: string
  description: string
}

/**
 * Static post metadata used for RSS feed generation.
 * Add an entry here whenever you publish a new post.
 */
export const postsMeta: PostMeta[] = [
  {
    id: 'make-it-exist-first',
    title: 'Make it exist',
    emoji: '🥜',
    date: '2026-05-03',
    description: 'A personal take on just starting. Make things exist before making them perfect.',
  },
  {
    id: 'shaders-1',
    title: '1. Shaders Introduction',
    emoji: '🎨',
    date: '2026-05-16',
    description: 'What are shaders, and why should you care? Exploring Godot shaders without any Math knowledge!',
  },
  {
    id: 'shaders-2',
    title: '2. Shader Basics',
    emoji: '🖼️',
    date: '2026-05-25',
    description: 'How to dance with the GPU',
  },
  {
    id: 'shaders-3',
    title: '3. The UV Canvas',
    emoji: '🎨',
    date: '2026-06-04',
    description: "UVs are your Canvas",
  },
]
