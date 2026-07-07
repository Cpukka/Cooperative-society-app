// app/error/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/app/components/ui/Button'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password. Please try again.'
      case 'Callback':
        return 'Error during authentication callback.'
      case 'OAuthSignin':
        return 'Error signing in with OAuth provider.'
      case 'OAuthCallback':
        return 'Error processing OAuth callback.'
      case 'OAuthCreateAccount':
        return 'Could not create account with OAuth provider.'
      case 'EmailCreateAccount':
        return 'Could not create account with email.'
      case 'OAuthAccountNotLinked':
        return 'This email is already associated with another account.'
      case 'EmailSignin':
        return 'Error sending email sign in link.'
      case 'Credentials':
        return 'Invalid credentials provided.'
      case 'SessionRequired':
        return 'You must be signed in to access this page.'
      case 'Default':
      default:
        return 'An unexpected error occurred during authentication.'
    }
  }

  const errorMessage = getErrorMessage(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
              <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Authentication Error
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {errorMessage}
          </p>

          {/* Error Code */}
          {error && (
            <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Error Code: <span className="font-mono font-medium">{error}</span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/signin">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
            
            <Link href="/">
              <Button className="w-full" variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Need help?{' '}
            <a 
              href="mailto:support@cooperative.org" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}