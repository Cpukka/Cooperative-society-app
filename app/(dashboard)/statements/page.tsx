'use client'

import { Download, Calendar, FileText, Filter, Printer, Share2 } from 'lucide-react'
import { useState } from 'react'

export default function Statements() {
  const [selectedStatement, setSelectedStatement] = useState('savings')
  const [dateRange, setDateRange] = useState('monthly')

  const statements = [
    { id: 'STMT001', type: 'Savings', period: 'Jan 2024', amount: '₦45,230,500', generated: '2024-01-31', status: 'Generated' },
    { id: 'STMT002', type: 'Loan', period: 'Dec 2023', amount: '₦28,450,000', generated: '2023-12-31', status: 'Generated' },
    { id: 'STMT003', type: 'Savings', period: 'Nov 2023', amount: '₦42,150,000', generated: '2023-11-30', status: 'Generated' },
    { id: 'STMT004', type: 'Transaction', period: 'Oct 2023', amount: '₦38,750,000', generated: '2023-10-31', status: 'Pending' },
    { id: 'STMT005', type: 'Loan', period: 'Sep 2023', amount: '₦25,300,000', generated: '2023-09-30', status: 'Generated' },
  ]

  const statementTemplates = [
    { name: 'Member Savings Statement', description: 'Individual member savings overview', icon: FileText },
    { name: 'Loan Statement', description: 'Detailed loan repayment schedule', icon: FileText },
    { name: 'Transaction History', description: 'Complete transaction records', icon: FileText },
    { name: 'Society Summary', description: 'Overall society financial summary', icon: FileText },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Statements & Reports</h1>
          <p className="text-gray-600">Generate and manage financial statements</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FileText className="h-4 w-4" />
            <span>New Report</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Statements Generated</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,245</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">75% of total members</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-green-600 text-sm">
            <span>+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Generation</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">23</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-orange-600 text-sm">
            <span>Due in 3 days</span>
          </div>
        </div>
      </div>

      {/* Statement Templates */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Statement Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statementTemplates.map((template, index) => {
            const Icon = template.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Generate →
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statement Type</label>
              <select
                value={selectedStatement}
                onChange={(e) => setSelectedStatement(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="savings">Savings Statement</option>
                <option value="loan">Loan Statement</option>
                <option value="transaction">Transaction History</option>
                <option value="all">All Statements</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Member ID</label>
              <input
                type="text"
                placeholder="Enter member ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statements Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Recent Statements</h3>
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statement ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {statements.map((statement) => (
                <tr key={statement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{statement.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statement.type === 'Savings' 
                        ? 'bg-blue-100 text-blue-800' 
                        : statement.type === 'Loan'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {statement.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{statement.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">{statement.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{statement.generated}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statement.status === 'Generated' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {statement.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Printer className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Statement Preview */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Statement Preview</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Select a statement to preview</p>
              <p className="text-sm text-gray-500">Click on any statement in the table to see a preview here</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Custom Report</h3>
            <div className="space-y-4">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Select report type</option>
                <option>Member Performance</option>
                <option>Loan Portfolio</option>
                <option>Savings Growth</option>
                <option>Transaction Summary</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="From"
                />
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="To"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Generate Report
              </button>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Reports</h3>
            <p className="text-gray-600 mb-4">Automate statement generation on a schedule</p>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Monthly savings statements</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Quarterly loan statements</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Annual society report</span>
              </label>
            </div>
            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}