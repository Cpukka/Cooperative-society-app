// Helper for theme-based classes
export const themeClass = (lightClass: string, darkClass: string) => {
  return `${lightClass} @dark:${darkClass}`
}

// Usage in components:
// className={themeClass('bg-white', 'bg-gray-800')}