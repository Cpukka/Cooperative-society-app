'use client'

import { Download, Filter, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function TransactionHistory() {
  const [filter, setFilter] = useState('all')

  const transactions = [
    { id: 'TXN001', type: 'Deposit', member: 'John Doe', amount: '₦25,000', date: '2024-01-15', status: 'Completed' },
    { id: 'TXN002', type: 'Loan Disbursement', member: 'Jane Smith', amount: '₦150,000', date: '2024-01-14', status: 'Completed' },
    { id: 'TXN003', type: 'Withdrawal', member: 'Robert Johnson', amount: '₦50,000', date: '2024-01-14', status: 'Pending' },
    { id: 'TXN004', type: 'Deposit', member: 'Sarah Williams', amount: '₦15,000', date: '2024-01-13', status: 'Completed' },
    { id: 'TXN005', type: 'Loan Repayment', member: 'Michael Brown', amount: '₦45,000', date: '2024-01-12', status: 'Completed' },
  ]

  const transactionTypes = [
    { label: 'All Transactions', value: 'all' },
    { label: 'Deposits', value: 'deposit' },
    { label: 'Withdrawals', value: 'withdrawal' },
    { label: 'Loans', value: 'loan' },
    { label: 'Repayments', value: 'repayment' },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return <ArrowDownRight className="h-4 w-4 text-green-500" />
      case 'withdrawal':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      case 'loan disbursement':
        return <ArrowUpRight className="h-4 w-4 text-purple-500" />
      case 'loan repayment':
        return <ArrowDownRight className="h-4 w-4 text-blue-500" />
      default:
        return <RefreshCw className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          <p className="text-gray-600">Latest financial activities</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {transactionTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilter(type.value)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  filter === type.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions
              .filter(txn => filter === 'all' || txn.type.toLowerCase().includes(filter))
              .map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getTransactionIcon(transaction.type)}
                      <span>{transaction.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.member}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${
                      transaction.type === 'Deposit' || transaction.type === 'Loan Repayment'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'Deposit' || transaction.type === 'Loan Repayment' ? '+' : '-'}
                      {transaction.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 5 of 1,245 transactions</p>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View All Transactions →
          </button>
        </div>
      </div>
    </div>
  )
}