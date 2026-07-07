'use client'

import { DollarSign, Calendar, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Loan } from '../../types'

interface LoanCardProps {
  loan: Loan
}

export function LoanCard({ loan }: LoanCardProps) {
  const getStatusColor = (status: Loan['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'Paid':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'Defaulted':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status: Loan['status']) => {
    switch (status) {
      case 'Active':
        return TrendingUp
      case 'Paid':
        return CheckCircle
      case 'Defaulted':
        return AlertCircle
      case 'Pending':
        return Clock
      default:
        return Clock
    }
  }

  const StatusIcon = getStatusIcon(loan.status)

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {loan.memberName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {loan.purpose} • ID: {loan.id}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
          <StatusIcon className="w-3 h-3 inline mr-1" />
          {loan.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4 mr-2" />
            Loan Amount
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            ${loan.amount.toLocaleString()}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <TrendingUp className="w-4 h-4 mr-2" />
            Interest Rate
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {loan.interestRate}%
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            Monthly Payment
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            ${loan.monthlyPayment.toLocaleString()}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            Remaining
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            ${loan.remainingBalance.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Start Date:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {new Date(loan.startDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-600 dark:text-gray-400">End Date:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {new Date(loan.endDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}