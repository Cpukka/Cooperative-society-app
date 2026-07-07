import { LucideIcon } from 'lucide-react'
import { cn } from '../../../lib/classNames'
import { Card } from '../../components/ui/Card'

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: LucideIcon
  description: string
}

export function StatsCard({ title, value, change, trend, icon: Icon, description }: StatsCardProps) {
  const trendConfig = {
    up: {
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      iconColor: 'text-green-600'
    },
    down: {
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      iconColor: 'text-red-600'
    },
    neutral: {
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600'
    }
  }

  const config = trendConfig[trend]

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{description}</p>
        </div>
        <div className={cn("p-3 rounded-lg", config.bgColor, config.iconColor)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className={cn("text-sm font-medium", config.color)}>
          {change}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">from last month</span>
      </div>
    </Card>
  )
}