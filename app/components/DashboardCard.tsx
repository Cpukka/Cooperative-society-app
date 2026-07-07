import { LucideIcon } from 'lucide-react'

interface DashboardCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: string
}

export default function DashboardCard({ title, value, change, icon: Icon, color }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 ${color} rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="flex items-center mt-4 text-green-600 text-sm">
        <span>{change} from last month</span>
      </div>
    </div>
  )
}