import { Users, UserPlus, TrendingUp, CheckCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { MemberTable } from '../../components/members/MemberTable'

// Mock data
const members = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@cooperative.org',
    phone: '+1 234 567 8900',
    joinDate: '2024-01-15',
    status: 'Active' as const,
    contributions: 5000,
    role: 'Member'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@cooperative.org',
    phone: '+1 234 567 8901',
    joinDate: '2024-02-20',
    status: 'Active' as const,
    contributions: 3500,
    role: 'Treasurer'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert@cooperative.org',
    phone: '+1 234 567 8902',
    joinDate: '2024-03-10',
    status: 'Active' as const,
    contributions: 4200,
    role: 'Member'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@cooperative.org',
    phone: '+1 234 567 8903',
    joinDate: '2024-01-28',
    status: 'Inactive' as const,
    contributions: 2800,
    role: 'Member'
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael@cooperative.org',
    phone: '+1 234 567 8904',
    joinDate: '2024-02-15',
    status: 'Pending' as const,
    contributions: 6100,
    role: 'Secretary'
  }
]

const stats = [
  { label: 'Total Members', value: '1,254', change: '+12.5%', icon: Users },
  { label: 'Active Members', value: '1,024', change: '+8.2%', icon: UserPlus },
  { label: 'New This Month', value: '42', change: '+15.3%', icon: TrendingUp },
  { label: 'Pending Approval', value: '18', change: '-3.1%', icon: CheckCircle }
]

export default function MembersPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Member Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all cooperative members and their information</p>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add New Member
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">from last month</span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Member Table */}
        <MemberTable members={members} />
      </div>
    </div>
  )
}