'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jul', savings: 4000000 },
  { month: 'Aug', savings: 4200000 },
  { month: 'Sep', savings: 4500000 },
  { month: 'Oct', savings: 4300000 },
  { month: 'Nov', savings: 4800000 },
  { month: 'Dec', savings: 5000000 },
  { month: 'Jan', savings: 5200000 },
]

export default function SavingsChart() {
  const formatCurrency = (value: number) => {
    return `₦${(value / 1000000).toFixed(1)}M`
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666' }}
            tickFormatter={formatCurrency}
          />
          <Tooltip 
            formatter={(value) => [`₦${Number(value).toLocaleString()}`, 'Savings']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="savings" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}