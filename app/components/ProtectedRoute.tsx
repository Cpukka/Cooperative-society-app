'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { checkAuth } from '@/lib/auth-utils'

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const user = checkAuth()
    
    if (!user) {
      router.push('/auth/login')
      return
    }
    
    if (adminOnly && user.role !== 'admin') {
      router.push('/dashboard')
      return
    }
    
    setAuthorized(true)
    setLoading(false)
  }, [router, adminOnly])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  return <>{children}</>
}