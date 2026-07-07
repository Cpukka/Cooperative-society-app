export interface User {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
  role: 'admin' | 'member'
  avatar?: string
}

export interface Member {
  id: string
  name: string
  email: string
  phone: string
  savings: number
  loans: number
  status: 'active' | 'inactive'
  joinDate: string
  lastActivity: string
}

export interface Loan {
  id: string
  memberId: string
  memberName: string
  amount: number
  purpose: string
  interestRate: number
  duration: number // in months
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'completed'
  appliedDate: string
  approvedDate?: string
  disbursedDate?: string
  monthlyPayment: number
  remainingBalance: number
}

export interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'loan_disbursement' | 'loan_repayment'
  memberId: string
  memberName: string
  amount: number
  date: string
  status: 'pending' | 'completed' | 'failed'
  reference: string
}

export interface Statement {
  id: string
  type: 'savings' | 'loan' | 'transaction'
  period: string
  memberId: string
  memberName: string
  generatedDate: string
  fileUrl: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'super_admin' | 'finance_admin' | 'loan_admin' | 'support_admin'
  status: 'active' | 'inactive'
  lastActive: string
  permissions: string[]
}

export interface ApprovalRequest {
  id: string
  type: 'loan' | 'withdrawal' | 'member_registration'
  memberId: string
  memberName: string
  amount?: number
  purpose?: string
  submittedDate: string
  status: 'pending' | 'approved' | 'rejected'
  documents: string[]
  notes?: string
}

export interface DashboardStats {
  totalMembers: number
  activeMembers: number
  totalSavings: number
  activeLoans: number
  pendingApprovals: number
  monthlyGrowth: number
}

export interface SavingsData {
  month: string
  savings: number
  deposits: number
  withdrawals: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}