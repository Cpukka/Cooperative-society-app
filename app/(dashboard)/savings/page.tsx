'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { checkAuth } from '@/lib/auth-utils'

export default function SavingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = checkAuth()
    if (!user) {
      router.push('/auth/login')
    } else {
      setUser(user)
      setLoading(false)
    }
  }, [router])

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Savings</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">Savings page content will go here</p>
      </div>
    </div>
  )
}