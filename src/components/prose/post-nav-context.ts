import { createContext, useContext } from 'react'

export const PostNavContext = createContext<(fromId: string, toId: string) => void>(() => {})

export function usePostNav() {
  return useContext(PostNavContext)
}
