// app/(dashboard)/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { 
  Users, DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight,
  Clock, UserPlus, CheckCircle, AlertCircle, Eye, Download, TrendingDown,
  BarChart3, Target, ArrowRight, MoreVertical, Filter, Search
} from 'lucide-react'
import { useState, useEffect as useReactEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend
} from 'recharts'

// Stats data
const stats = [
  {
    title: 'Total Members',
    value: '1,254',
    change: '+12.5%',
    trend: 'up' as const,
    icon: Users,
    description: 'Active cooperative members',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-900/20 dark:to-cyan-900/20',
    trendColor: 'text-green-600 dark:text-green-400',
    trendBg: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    title: 'Total Assets',
    value: '$2.8M',
    change: '+8.2%',
    trend: 'up' as const,
    icon: DollarSign,
    description: 'Total cooperative assets',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-900/20 dark:to-teal-900/20',
    trendColor: 'text-green-600 dark:text-green-400',
    trendBg: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    title: 'Active Loans',
    value: '$489K',
    change: '-3.1%',
    trend: 'down' as const,
    icon: TrendingUp,
    description: 'Currently active loans',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-gradient-to-br from-violet-500/10 to-purple-500/10 dark:from-violet-900/20 dark:to-purple-900/20',
    trendColor: 'text-red-600 dark:text-red-400',
    trendBg: 'bg-red-100 dark:bg-red-900/20'
  },
  {
    title: 'Performance',
    value: '94.2%',
    change: '+2.4%',
    trend: 'up' as const,
    icon: TrendingUp,
    description: 'Monthly target achievement',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-900/20 dark:to-orange-900/20',
    trendColor: 'text-green-600 dark:text-green-400',
    trendBg: 'bg-green-100 dark:bg-green-900/20'
  }
]

// Contribution data
const contributionData = [
  { month: 'Jan', amount: 4200, target: 4500, growth: 8.2 },
  { month: 'Feb', amount: 3800, target: 4500, growth: -3.1 },
  { month: 'Mar', amount: 5100, target: 4500, growth: 15.3 },
  { month: 'Apr', amount: 4800, target: 4500, growth: 12.5 },
  { month: 'May', amount: 5300, target: 4500, growth: 18.9 },
  { month: 'Jun', amount: 4900, target: 4500, growth: 14.7 },
]

// Loan distribution data
const loanTypeData = [
  { name: 'Emergency', value: 35, amount: '$171,307', color: '#ef4444', fill: 'url(#colorEmergency)' },
  { name: 'Education', value: 25, amount: '$122,363', color: '#3b82f6', fill: 'url(#colorEducation)' },
  { name: 'Business', value: 20, amount: '$97,890', color: '#8b5cf6', fill: 'url(#colorBusiness)' },
  { name: 'Housing', value: 20, amount: '$97,890', color: '#10b981', fill: 'url(#colorHousing)' },
]

// Recent activities
const recentActivities = [
  {
    id: 1,
    title: 'New member joined',
    description: 'Sarah Johnson joined with initial contribution of $500',
    time: '2 hours ago',
    icon: UserPlus,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    status: 'success'
  },
  {
    id: 2,
    title: 'Monthly contributions collected',
    description: 'Total $45,200 collected from 254 members',
    time: 'Today',
    icon: DollarSign,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    status: 'success'
  },
  {
    id: 3,
    title: 'Loan application approved',
    description: 'Education loan of $10,000 approved for Michael Brown',
    time: 'Yesterday',
    icon: CheckCircle,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    status: 'success'
  },
  {
    id: 4,
    title: 'Meeting reminder',
    description: 'General meeting scheduled for tomorrow at 3 PM',
    time: '2 days ago',
    icon: AlertCircle,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/20',
    status: 'warning'
  },
  {
    id: 5,
    title: 'Loan repayment overdue',
    description: '3 members have overdue loan payments',
    time: '3 days ago',
    icon: AlertCircle,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/20',
    status: 'error'
  }
]

// Top performing members
const topMembers = [
  { name: 'John Doe', contributions: 5000, loans: 2000, status: 'Active' },
  { name: 'Jane Smith', contributions: 3500, loans: 0, status: 'Active' },
  { name: 'Robert Johnson', contributions: 4200, loans: 1500, status: 'Active' },
  { name: 'Sarah Williams', contributions: 2800, loans: 0, status: 'Active' },
  { name: 'Michael Brown', contributions: 6100, loans: 3000, status: 'Active' }
]

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.name === 'growth' ? `${entry.value}%` : `$${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [timeRange, setTimeRange] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('contributions')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Simulate loading
  useReactEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [timeRange])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const timeRanges = [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ]

  const metrics = [
    { id: 'contributions', label: 'Contributions', icon: DollarSign },
    { id: 'loans', label: 'Loans', icon: TrendingUp },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'performance', label: 'Performance', icon: BarChart3 }
  ]

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome back, {session.user?.name}! Here's what's happening with your cooperative today.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="search"
                placeholder="Search analytics..."
                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index}
                className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
              >
                {/* Gradient background effect */}
                <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative p-4 sm:p-6 transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-500">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {isLoading ? (
                          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        ) : (
                          stat.value
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{stat.description}</p>
                    </div>
                    
                    <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded ${stat.trendBg}`}>
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className={`w-3 h-3 ${stat.trendColor}`} />
                      ) : (
                        <ArrowDownRight className={`w-3 h-3 ${stat.trendColor}`} />
                      )}
                      <span className={`text-xs font-medium ${stat.trendColor}`}>
                        {stat.change}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">from last period</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Metrics Selector */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedMetric === metric.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {metric.label}
              </button>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Contribution Trends Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contribution Trends</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly performance vs targets</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-emerald-300" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Target</span>
                </div>
              </div>
            </div>
            
            <div className="h-72 sm:h-80">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={contributionData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#6b7280"
                      tick={{ fill: '#6b7280' }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      tick={{ fill: '#6b7280' }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#3b82f6" 
                      fill="url(#colorAmount)" 
                      strokeWidth={2}
                      name="Contributions"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#10b981" 
                      fill="url(#colorTarget)" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Target"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Loan Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Loan Portfolio</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Distribution by loan purpose</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$489,450</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total active loans</p>
              </div>
            </div>
            
            <div className="h-72 sm:h-80">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <linearGradient id="colorEmergency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="colorEducation" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="colorBusiness" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="colorHousing" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <Pie
                      data={loanTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {loanTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [
                        props.payload.amount,
                        props.payload.name
                      ]}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            
            {/* Loan type details */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {loanTypeData.map((item, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.amount}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Latest updates from your cooperative</p>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div 
                      key={activity.id}
                      className="group flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 cursor-pointer"
                    >
                      <div className={`p-2 rounded-lg ${activity.bgColor} group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {activity.title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            activity.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            activity.status === 'warning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                        </div>
                      </div>
                      
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Top Members */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Members</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Highest contributors this month</p>
            </div>
            
            <div className="space-y-4">
              {topMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Contributions: ${member.contributions.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded">
                      {member.status}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      ${member.loans.toLocaleString()} loan
                    </p>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-3 text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                View all members
              </button>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Monthly Performance Summary</h3>
              <p className="text-blue-100">
                Your cooperative is performing exceptionally well this month with a 94.2% achievement rate.
              </p>
              <div className="flex items-center gap-6 mt-4">
                <div>
                  <p className="text-sm text-blue-200">Target Achievement</p>
                  <p className="text-2xl font-bold">94.2%</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Member Growth</p>
                  <p className="text-2xl font-bold">+12.5%</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Loan Recovery</p>
                  <p className="text-2xl font-bold">98.7%</p>
                </div>
              </div>
            </div>
            
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}