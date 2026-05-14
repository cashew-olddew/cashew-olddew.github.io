import { useState, useCallback } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  const onScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    const el = e.currentTarget
    const max = el.scrollHeight - el.clientHeight
    setProgress(max > 0 ? el.scrollTop / max : 0)
  }, [])

  const reset = useCallback(() => setProgress(0), [])

  return { progress, onScroll, reset }
}
