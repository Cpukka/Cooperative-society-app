// app/page.tsx (cleaned up)
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Building2, ArrowRight, Users, DollarSign, HandCoins, Calendar } from 'lucide-react'
import { Button } from './components/ui/Button'
import { PublicNav } from './components/layout/PublicNav'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <PublicNav />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl shadow-lg">
                <Building2 className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                CooperativePro
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              The modern platform for managing your cooperative society. 
              Track members, contributions, loans, and meetings all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="text-lg px-8">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Member Management</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Manage all cooperative members and their information</p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contributions</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Track member contributions and savings</p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HandCoins className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Loan Management</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Manage loan applications and repayments</p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Meetings</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Schedule and manage cooperative meetings</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,254+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active Members</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">$2.8M</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Assets</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">94.2%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Performance Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">98.7%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Loan Recovery</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of cooperative societies managing their operations efficiently with CooperativePro.
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-gray-900 dark:text-white">CooperativePro</span>
              </div>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Terms of Service
                </Link>
                <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} CooperativePro. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}