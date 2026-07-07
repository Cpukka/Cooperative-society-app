/**
 * Utility function to conditionally join class names
 * Replaces the need for @apply in Tailwind v4
 */
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Helper for creating theme-aware classes
 */
export function themeClass(lightClass: string, darkClass: string) {
  return `${lightClass} dark:${darkClass}`
}