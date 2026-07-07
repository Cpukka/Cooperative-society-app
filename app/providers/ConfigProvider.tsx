// app/providers/ConfigProvider.tsx
'use client'

import { createContext, useContext } from 'react'
import { config } from '../../lib/config'

const ConfigContext = createContext(config)

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  return useContext(ConfigContext)
}