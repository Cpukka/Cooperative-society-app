// app/contributions/page.tsx (updated)
import { DollarSign, Calendar, TrendingUp, Download, Plus, Search, Filter } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { 
  Table, 
  TableHeader, 
  TableHead, 
  TableRow, 
  TableCell 
} from '../../components/ui/Table'

const contributions = [
  { id: 1, member: 'John Doe', amount: 500, date: '2024-03-15', type: 'Monthly', status: 'Completed' },
  { id: 2, member: 'Jane Smith', amount: 750, date: '2024-03-14', type: 'Special', status: 'Completed' },
  { id: 3, member: 'Robert Johnson', amount: 500, date: '2024-03-14', type: 'Monthly', status: 'Pending' },
  { id: 4, member: 'Sarah Williams', amount: 1000, date: '2024-03-13', type: 'Loan Repayment', status: 'Completed' },
  { id: 5, member: 'Michael Brown', amount: 500, date: '2024-03-12', type: 'Monthly', status: 'Failed' }
]

const stats = [
  { label: 'Total Collected', value: '$245,890', change: '+8.2%' },
  { label: 'This Month', value: '$45,200', change: '+12.5%' },
  { label: 'Pending', value: '$8,500', change: '-3.1%' }
]

export default function ContributionsPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contributions</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Track and manage all member contributions</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Record Contribution
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 mr-1 ${
                      stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">from last month</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Contributions Table */}
        <Card padding="none" className="overflow-hidden">
          {/* Table Header with Search */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Input
                  placeholder="Search contributions..."
                  icon={<Search className="w-5 h-5" />}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  This Month
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableHead>Receipt No</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead align="right">Actions</TableHead>
              </TableHeader>
              
              <tbody>
                {contributions.map((contribution) => (
                  <TableRow key={contribution.id} hover>
                    <TableCell>
                      <p className="font-medium text-blue-600 dark:text-blue-400">
                        RC-{contribution.id.toString().padStart(3, '0')}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {contribution.member}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-gray-900 dark:text-white">
                        ${contribution.amount.toLocaleString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {contribution.date}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contribution.type === 'Monthly'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : contribution.type === 'Special'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {contribution.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contribution.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : contribution.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {contribution.status}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Table Footer (Optional) */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {contributions.length} contributions
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </Card>

        {/* Monthly Summary (Optional Additional Section) */}
        <div className="mt-8">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Summary</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Contribution trends over time</p>
              </div>
              <Button variant="outline">View Full Report</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Jan', 'Feb', 'Mar', 'Apr'].map((month) => (
                <div key={month} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{month} 2024</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                    ${(Math.random() * 10000 + 30000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400">
                      +{Math.floor(Math.random() * 20)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}