function buildSearch(openIds: string[], focusId: string | null, maximizedId: string | null): string {
  if (openIds.length === 0) return location.pathname

  const params = new URLSearchParams()
  params.set('open', openIds.join(','))
  if (focusId) params.set('focus', focusId)
  if (maximizedId) params.set('maximized', maximizedId)
  return location.pathname + '?' + params.toString()
}

export function readFromURL(): { openIds: string[]; focusId: string | null; maximizedId: string | null } {
  const params = new URLSearchParams(location.search)
  const openIds = params.get('open')?.split(',').filter(Boolean) ?? []
  const focusId = params.get('focus') ?? null
  const maximizedId = params.get('maximized') ?? null
  return { openIds, focusId, maximizedId }
}

export function pushURL(openIds: string[], focusId: string | null, maximizedId: string | null = null): void {
  history.pushState({ openIds, focusId, maximizedId }, '', buildSearch(openIds, focusId, maximizedId))
}

export function replaceURL(openIds: string[], focusId: string | null, maximizedId: string | null = null): void {
  history.replaceState({ openIds, focusId, maximizedId }, '', buildSearch(openIds, focusId, maximizedId))
}