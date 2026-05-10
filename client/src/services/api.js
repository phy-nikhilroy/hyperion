export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('hyperion-token')
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (res.status === 401) {
    localStorage.removeItem('hyperion-user')
    localStorage.removeItem('hyperion-token')
    window.location.href = '/login'
    return null
  }
  return res
}
