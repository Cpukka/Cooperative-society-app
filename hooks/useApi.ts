// hooks/useApi.ts
'use client'

import { useSession } from 'next-auth/react'
import { useCallback } from 'react'
import { API_BASE } from '@/lib/api'

export function useApi() {
  const { data: session } = useSession()

  const apiFetch = useCallback(
    async <T>(
      endpoint: string,
      options: RequestInit = {}
    ): Promise<T> => {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || `API request failed: ${response.statusText}`)
      }

      return response.json()
    },
    []
  )

  const apiFetchWithAuth = useCallback(
    async <T>(
      endpoint: string,
      options: RequestInit = {}
    ): Promise<T> => {
      // The session cookie is automatically sent with fetch
      // No need to add token manually
      return apiFetch<T>(endpoint, options)
    },
    [apiFetch]
  )

  return { 
    apiFetch, 
    apiFetchWithAuth, 
    session,
    isAuthenticated: !!session 
  }
}