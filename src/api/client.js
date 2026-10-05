const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Request failed')
  }
  return data
}

export async function getHeroContent() {
  const result = await request('/hero?isActive=true')
  return result.data || []
}

export async function getServices(params = {}) {
  const search = new URLSearchParams()
  if (params.isActive !== undefined) search.set('isActive', String(params.isActive))
  if (params.sortBy) search.set('sortBy', params.sortBy)
  if (params.sortOrder) search.set('sortOrder', params.sortOrder)
  const qs = search.toString()
  const result = await request(`/services${qs ? `?${qs}` : ''}`)
  return result.data || []
}

export async function getProjects(params = {}) {
  const search = new URLSearchParams()
  if (params.status) search.set('status', params.status)
  if (params.limit) search.set('limit', String(params.limit))
  if (params.sortBy) search.set('sortBy', params.sortBy)
  if (params.sortOrder) search.set('sortOrder', params.sortOrder)
  const qs = search.toString()
  const result = await request(`/projects${qs ? `?${qs}` : ''}`)
  return result.data || []
}

export async function getTeamMembers(params = {}) {
  const search = new URLSearchParams()
  if (params.status) search.set('status', params.status)
  if (params.sortBy) search.set('sortBy', params.sortBy)
  if (params.sortOrder) search.set('sortOrder', params.sortOrder)
  const qs = search.toString()
  const result = await request(`/team${qs ? `?${qs}` : ''}`)
  return result.data || []
}

export async function createContact(payload) {
  const result = await request('/contacts', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return result.data
}
