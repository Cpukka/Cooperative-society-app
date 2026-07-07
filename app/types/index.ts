export interface Member {
  id: string
  memberId: string
  name: string
  email: string
  phone: string
  role: 'Admin' | 'Member' | 'Treasurer'
  status: 'Active' | 'Inactive' | 'Pending'
  joinDate: string
  totalContributions: number
  outstandingLoan?: number
}

export interface Contribution {
  id: string
  memberId: string
  memberName: string
  amount: number
  date: string
  type: 'Monthly' | 'Special' | 'Loan Repayment'
  status: 'Completed' | 'Pending' | 'Overdue'
}

export interface Loan {
  id: string
  memberId: string
  memberName: string
  amount: number
  interestRate: number
  duration: number // in months
  startDate: string
  endDate: string
  status: 'Active' | 'Paid' | 'Defaulted' | 'Pending'
  monthlyPayment: number
  totalRepaid: number
  remainingBalance: number
  purpose: string
}

export interface Meeting {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: 'General' | 'Board' | 'Committee'
  status: 'Upcoming' | 'Ongoing' | 'Completed'
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}