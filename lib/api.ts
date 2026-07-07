// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api'

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `API request failed: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchMembers() {
  return apiFetch('/members')
}

export async function createLoan(loanData: any) {
  return apiFetch('/loans', {
    method: 'POST',
    body: JSON.stringify(loanData),
  })
}

export async function fetchContributions() {
  return apiFetch('/contributions')
}

export async function fetchMeetings() {
  return apiFetch('/meetings')
}

export async function fetchReports() {
  return apiFetch('/reports')
}

// Export the base URL for other uses
export { API_BASE }