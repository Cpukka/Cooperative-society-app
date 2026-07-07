// app/(dashboard)/loans/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  HandCoins, DollarSign, TrendingUp, Clock, CheckCircle, XCircle,
  Search, Filter, Download, Plus, Calendar, User, Eye,
  MoreVertical, Edit, Printer, AlertCircle, Building2,
  Phone, Mail, MapPin, Briefcase, CreditCard
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'

// Enhanced loan data
const loans = [
  { 
    id: 1, 
    member: 'John Doe', 
    amount: 5000, 
    date: '2024-01-15', 
    status: 'Active', 
    type: 'Emergency',
    interestRate: '8.5%',
    duration: '12 months',
    remaining: '$4,250',
    memberDetails: {
      email: 'john@cooperative.org',
      phone: '+1 234 567 8900',
      memberId: 'MEM001',
      occupation: 'Business Owner'
    }
  },
  { 
    id: 2, 
    member: 'Jane Smith', 
    amount: 10000, 
    date: '2024-02-01', 
    status: 'Active', 
    type: 'Business',
    interestRate: '7.0%',
    duration: '24 months',
    remaining: '$8,500',
    memberDetails: {
      email: 'jane@cooperative.org',
      phone: '+1 234 567 8901',
      memberId: 'MEM002',
      occupation: 'Nurse'
    }
  },
  { 
    id: 3, 
    member: 'Robert Johnson', 
    amount: 8000, 
    date: '2023-11-20', 
    status: 'Paid', 
    type: 'Education',
    interestRate: '6.0%',
    duration: '18 months',
    remaining: '$0',
    memberDetails: {
      email: 'robert@cooperative.org',
      phone: '+1 234 567 8902',
      memberId: 'MEM003',
      occupation: 'Engineer'
    }
  },
  { 
    id: 4, 
    member: 'Sarah Williams', 
    amount: 15000, 
    date: '2024-01-10', 
    status: 'Active', 
    type: 'Housing',
    interestRate: '5.5%',
    duration: '36 months',
    remaining: '$12,750',
    memberDetails: {
      email: 'sarah@cooperative.org',
      phone: '+1 234 567 8903',
      memberId: 'MEM004',
      occupation: 'Teacher'
    }
  },
  { 
    id: 5, 
    member: 'Michael Brown', 
    amount: 3000, 
    date: '2024-02-15', 
    status: 'Pending', 
    type: 'Emergency',
    interestRate: '9.0%',
    duration: '6 months',
    remaining: '$3,000',
    memberDetails: {
      email: 'michael@cooperative.org',
      phone: '+1 234 567 8904',
      memberId: 'MEM005',
      occupation: 'Student'
    }
  },
  { 
    id: 6, 
    member: 'Emily Davis', 
    amount: 12000, 
    date: '2024-03-01', 
    status: 'Defaulted', 
    type: 'Business',
    interestRate: '7.5%',
    duration: '20 months',
    remaining: '$9,800',
    memberDetails: {
      email: 'emily@cooperative.org',
      phone: '+1 234 567 8905',
      memberId: 'MEM006',
      occupation: 'Entrepreneur'
    }
  },
]

const stats = [
  { 
    label: 'Total Loans', 
    value: '$489,450', 
    icon: HandCoins,
    change: '+12.5%',
    trend: 'up',
    color: 'blue'
  },
  { 
    label: 'Active Loans', 
    value: '$89,450', 
    icon: TrendingUp,
    change: '+8.2%',
    trend: 'up',
    color: 'green'
  },
  { 
    label: 'Pending Approval', 
    value: '$23,500', 
    icon: Clock,
    change: '-3.1%',
    trend: 'down',
    color: 'yellow'
  },
  { 
    label: 'Defaulted', 
    value: '$5,200', 
    icon: XCircle,
    change: '+2.4%',
    trend: 'up',
    color: 'red'
  }
]

const statusColors = {
  Active: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
  Paid: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  Pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
  Defaulted: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
}

const statusIcons = {
  Active: <CheckCircle className="w-3 h-3" />,
  Paid: <CheckCircle className="w-3 h-3" />,
  Pending: <Clock className="w-3 h-3" />,
  Defaulted: <XCircle className="w-3 h-3" />,
}

const typeColors = {
  Emergency: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
  Business: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400',
  Education: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  Housing: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400',
}

export default function LoansPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedLoan, setSelectedLoan] = useState<typeof loans[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)

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

  // Filter loans
  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loan.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         loan.id.toString().includes(searchQuery)
    const matchesStatus = filterStatus === 'all' || loan.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Loan Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track all cooperative loans
          </p>
        </div>
        <Button className="flex items-center gap-2 whitespace-nowrap">
          <Plus className="w-4 h-4" />
          New Loan Application
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                    {stat.label}
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-xs font-medium ${
                      stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">from last month</span>
                  </div>
                </div>
                <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ml-2 ${
                  stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                  stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                  stat.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' :
                  'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                }`}>
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search loans by member, type, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Defaulted">Defaulted</option>
          </select>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Loans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredLoans.map((loan) => {
          const statusColor = statusColors[loan.status as keyof typeof statusColors] || statusColors.Pending
          const statusIcon = statusIcons[loan.status as keyof typeof statusIcons] || <Clock className="w-3 h-3" />
          const typeColor = typeColors[loan.type as keyof typeof typeColors] || 'bg-gray-100 dark:bg-gray-700'
          
          return (
            <Card key={loan.id} hover className="p-4 sm:p-6 transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {loan.member}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColor}`}>
                      {loan.type}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ID: LOAN-{loan.id.toString().padStart(3, '0')}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap ${statusColor}`}>
                  {statusIcon}
                  {loan.status}
                </span>
              </div>

              {/* Amount and Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <DollarSign className="w-3 h-3 mr-1" />
                    Amount
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    ${loan.amount.toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    Date Issued
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {loan.date}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Interest</p>
                  <p className="font-medium text-gray-900 dark:text-white">{loan.interestRate}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white">{loan.duration}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Remaining</p>
                  <p className="font-medium text-gray-900 dark:text-white">{loan.remaining}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 min-w-[80px]"
                  onClick={() => {
                    setSelectedLoan(loan)
                    setShowDetails(true)
                  }}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 min-w-[80px]"
                  disabled={loan.status === 'Paid' || loan.status === 'Defaulted'}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Manage
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 min-w-[80px]"
                >
                  <Printer className="w-3 h-3 mr-1" />
                  Print
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredLoans.length === 0 && (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center">
            <HandCoins className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No loans found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('')
                setFilterStatus('all')
              }}
            >
              Clear filters
            </Button>
          </div>
        </Card>
      )}

      {/* Loan Details Modal */}
      {showDetails && selectedLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HandCoins className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Loan Details
                </h2>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Loan Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Loan ID</p>
                  <p className="font-medium text-gray-900 dark:text-white font-mono">
                    LOAN-{selectedLoan.id.toString().padStart(3, '0')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${statusColors[selectedLoan.status as keyof typeof statusColors]}`}>
                    {statusIcons[selectedLoan.status as keyof typeof statusIcons]}
                    {selectedLoan.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ${selectedLoan.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Interest Rate</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedLoan.interestRate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedLoan.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Remaining Balance</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedLoan.remaining}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date Issued</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedLoan.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[selectedLoan.type as keyof typeof typeColors]}`}>
                    {selectedLoan.type}
                  </span>
                </div>
              </div>

              {/* Member Info */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Member Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedLoan.member}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Member ID</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedLoan.memberDetails.memberId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedLoan.memberDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedLoan.memberDetails.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Occupation</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedLoan.memberDetails.occupation}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-wrap gap-3">
                <Button>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Loan
                </Button>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
                <Button variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="destructive">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}