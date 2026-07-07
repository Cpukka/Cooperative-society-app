import { LucideIcon, Clock } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

interface Activity {
  id: number
  title: string
  description: string
  time: string
  icon: LucideIcon
  color: string
}

interface ActivityListProps {
  activities: Activity[]
  title?: string
}

export function ActivityList({ activities, title = 'Recent Activities' }: ActivityListProps) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Latest updates from your cooperative</p>
        </div>
        <Button variant="outline" size="sm">View all</Button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors group">
              <div className={`p-2 rounded-lg ${activity.color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">{activity.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{activity.description}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1 shrink-0" />
                  <span className="truncate">{activity.time}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </Button>
            </div>
          )
        })}
      </div>
    </Card>
  )
}