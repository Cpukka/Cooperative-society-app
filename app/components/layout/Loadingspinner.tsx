// app/components/layout/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-500"></div>
    </div>
  )
}