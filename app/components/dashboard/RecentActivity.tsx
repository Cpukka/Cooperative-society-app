'use client'

import { Clock, UserPlus, DollarSign, Calendar, TrendingUp } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'new_member',
    title: 'New member joined',
    description: 'Sarah Johnson joined the cooperative',
    time: '2 hours ago',
    icon: UserPlus,
    color: 'text-green-500 bg-green-100 dark:bg-green-900/20'
  },
  {
    id: 2,
    type: 'contribution',
    title: 'Monthly contribution',
    description: 'Michael Brown made a contribution of $500',
    time: '4 hours ago',
    icon: DollarSign,
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
  },
  {
    id: 3,
    type: 'loan_approval',
    title: 'Loan approved',
    description: 'Education loan approved for Jane Smith',
    time: '1 day ago',
    icon: TrendingUp,
    color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/20'
  },
  {
    id: 4,
    type: 'meeting',
    title: 'Upcoming meeting',
    description: 'Monthly general meeting scheduled',
    time: '2 days ago',
    icon: Calendar,
    color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/20'
  },
  {
    id: 5,
    type: 'contribution',
    title: 'Special contribution',
    description: 'Special project contribution from 15 members',
    time: '3 days ago',
    icon: DollarSign,
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
  }
]

export function RecentActivity() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <button className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {activity.description}
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}