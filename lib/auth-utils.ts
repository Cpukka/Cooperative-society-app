export function checkAuth() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      return null
    }

    return JSON.parse(storedUser)
  } catch {
    return null
  }
}
