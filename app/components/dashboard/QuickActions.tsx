'use client'

import { PlusCircle, FileText, Users, DollarSign, Calendar, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

const actions = [
  {
    title: 'Add Member',
    description: 'Register new member',
    icon: Users,
    href: '/members/new',
    color: 'bg-blue-500'
  },
  {
    title: 'Record Contribution',
    description: 'Add member contribution',
    icon: DollarSign,
    href: '/contributions/new',
    color: 'bg-green-500'
  },
  {
    title: 'Process Loan',
    description: 'Approve new loan application',
    icon: FileText,
    href: '/loans/new',
    color: 'bg-purple-500'
  },
  {
    title: 'Schedule Meeting',
    description: 'Create new meeting',
    icon: Calendar,
    href: '/meetings/new',
    color: 'bg-orange-500'
  },
  {
    title: 'Generate Report',
    description: 'Create financial report',
    icon: FileText,
    href: '/reports/new',
    color: 'bg-indigo-500'
  },
  {
    title: 'Settings',
    description: 'Update platform settings',
    icon: Settings,
    href: '/settings',
    color: 'bg-gray-500'
  }
]

export function QuickActions() {
  const router = useRouter()

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h3>
        <PlusCircle className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={index}
              onClick={() => router.push(action.href)}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
            >
              <div className={`p-2 rounded-lg ${action.color} mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                {action.title}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                {action.description}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}