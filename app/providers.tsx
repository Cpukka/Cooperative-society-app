// app/providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'
import { Navigation } from './components/layout/Navigation'
import { ThemeScript } from './components/ThemeScript'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeScript />
      <SessionProvider>
        <Navigation />
        <main className="lg:pl-64 pt-16 lg:pt-0">
          {children}
        </main>
      </SessionProvider>
    </>
  )
}