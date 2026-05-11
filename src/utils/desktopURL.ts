function buildSearch(openIds: string[], focusId: string | null, maximizedId: string | null, view?: 'web' | null): string {
  const params = new URLSearchParams()
  if (view === 'web') {
    params.set('view', 'web')
    if (openIds.length > 0) params.set('open', openIds.join(','))
    return location.pathname + (params.size > 0 ? '?' + params.toString() : '')
  }
  if (openIds.length === 0) return location.pathname
  params.set('open', openIds.join(','))
  if (focusId) params.set('focus', focusId)
  if (maximizedId) params.set('maximized', maximizedId)
  return location.pathname + '?' + params.toString()
}

export function readFromURL(): { openIds: string[]; focusId: string | null; maximizedId: string | null; view: 'web' | null } {
  const params = new URLSearchParams(location.search)
  const openIds = params.get('open')?.split(',').filter(Boolean) ?? []
  const view = params.get('view') === 'web' ? 'web' : null
  const focusId = view ? null : (params.get('focus') ?? null)
  const maximizedId = view ? null : (params.get('maximized') ?? null)
  return { openIds, focusId, maximizedId, view }
}

export function pushURL(openIds: string[], focusId: string | null, maximizedId: string | null = null, view?: 'web' | null): void {
  history.pushState({ openIds, focusId, maximizedId, view }, '', buildSearch(openIds, focusId, maximizedId, view))
}

export function replaceURL(openIds: string[], focusId: string | null, maximizedId: string | null = null, view?: 'web' | null): void {
  history.replaceState({ openIds, focusId, maximizedId, view }, '', buildSearch(openIds, focusId, maximizedId, view))
}