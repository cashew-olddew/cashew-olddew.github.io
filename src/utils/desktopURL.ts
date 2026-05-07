function buildSearch(openIds: string[], focusId: string | null): string {
  if (openIds.length === 0) return location.pathname

  const params = new URLSearchParams()
  params.set('open', openIds.join(','))
  if (focusId) params.set('focus', focusId)
  return location.pathname + '?' + params.toString()
}

export function readFromURL(): { openIds: string[]; focusId: string | null } {
  const params = new URLSearchParams(location.search)
  const openIds = params.get('open')?.split(',').filter(Boolean) ?? []
  const focusId = params.get('focus') ?? null
  return { openIds, focusId }
}

export function updateURL(openIds: string[], focusId: string | null): void {
  history.pushState({ openIds, focusId }, '', buildSearch(openIds, focusId))
}
