// components/FeatureFlag.tsx
'use client'

import { config } from '@/lib/config'

interface FeatureFlagProps {
  name: keyof typeof config.features
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function FeatureFlag({ name, children, fallback = null }: FeatureFlagProps) {
  const isEnabled = config.features[name]
  
  if (!isEnabled) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}

// Usage:
// <FeatureFlag name="enableChat">
//   <ChatComponent />
// </FeatureFlag>