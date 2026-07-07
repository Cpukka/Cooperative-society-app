// app/reports/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Download, Calendar, Filter, Search, FileText,
  PieChart, BarChart3, TrendingUp, Users,
  DollarSign, HandCoins, Clock, ArrowUpRight,
  ArrowDownRight, Printer, Mail, Eye,
  Loader2, AlertCircle, CheckCircle, XCircle
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'

// Report types configuration
const reportTypes = [
  { 
    id: 'members', 
    label: 'Members Report', 
    icon: Users,
    description: 'Overview of all members and their status'
  },
  { 
    id: 'contributions', 
    label: 'Contributions Report', 
    icon: DollarSign,
    description: 'Summary of member contributions'
  },
  { 
    id: 'loans', 
    label: 'Loans Report', 
    icon: HandCoins,
    description: 'Loan applications and repayments'
  },
  { 
    id: 'financial', 
    label: 'Financial Summary', 
    icon: TrendingUp,
    description: 'Financial performance overview'
  },
]

// Summary stats
const summaryStats = [
  { label: 'Total Members', value: '1,254', change: '+12.5%', trend: 'up', icon: Users },
  { label: 'Total Contributions', value: '$245,890', change: '+8.2%', trend: 'up', icon: DollarSign },
  { label: 'Active Loans', value: '$489,450', change: '-3.1%', trend: 'down', icon: HandCoins },
  { label: 'Reports Generated', value: '42', change: '+15.3%', trend: 'up', icon: FileText },
]

// Mock recent reports
const recentReports = [
  {
    id: 1,
    title: 'Monthly Member Report - June 2024',
    type: 'members',
    generatedBy: 'System Admin',
    date: '2024-06-30',
    status: 'completed',
    size: '2.4 MB',
  },
  {
    id: 2,
    title: 'Financial Summary - Q2 2024',
    type: 'financial',
    generatedBy: 'Finance Officer',
    date: '2024-06-25',
    status: 'completed',
    size: '1.8 MB',
  },
  {
    id: 3,
    title: 'Loan Performance Report - June 2024',
    type: 'loans',
    generatedBy: 'Loan Officer',
    date: '2024-06-20',
    status: 'pending',
    size: '3.1 MB',
  },
]

export default function ReportsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState('month')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!session) return null

  const generateReport = async (type: string) => {
    setIsLoading(true)
    setSelectedReport(type)
    setSuccessMessage('')

    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSuccessMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} report generated successfully!`)
    } catch {
      setSuccessMessage('')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Completed
        </span>
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full text-xs font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Generating
        </span>
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-full text-xs font-medium flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Failed
        </span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate and manage reports for your cooperative</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {dateRange === 'week' ? 'This Week' :
             dateRange === 'month' ? 'This Month' :
             dateRange === 'quarter' ? 'This Quarter' :
             dateRange === 'year' ? 'This Year' : 'Last 30 Days'}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {successMessage}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${
                  stat.trend === 'up' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`} />
                </div>
              </div>
              <div className="flex items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">from last period</span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon
          const isSelected = selectedReport === report.id
          return (
            <Card key={report.id} hover>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${
                    isSelected ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{report.label}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{report.description}</p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  variant={isSelected ? 'primary' : 'outline'}
                  onClick={() => generateReport(report.id)}
                  disabled={isLoading && selectedReport === report.id}
                >
                  {isLoading && selectedReport === report.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Reports Table */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Reports</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Previously generated reports</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Report Name</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Generated By</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Size</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900 dark:text-white">{report.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                        {report.type}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{report.generatedBy}</td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{report.date}</td>
                    <td className="p-4">{getStatusBadge(report.status)}</td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{report.size}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Printer className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <Mail className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
}