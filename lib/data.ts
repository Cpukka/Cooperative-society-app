// Mock data for development and demonstration
// In production, this would be replaced with actual database queries

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
  duration: number
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'completed'
  appliedDate: string
  approvedDate?: string
  disbursedDate?: string
  monthlyPayment: number
  remainingBalance: number
}

export interface Savings {
  id: string
  memberId: string
  memberName: string
  amount: number
  type: 'deposit' | 'withdrawal'
  description: string
  date: string
  reference: string
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

// Mock data
export const members: Member[] = [
  {
    id: 'MEM001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+2348012345678',
    savings: 450000,
    loans: 200000,
    status: 'active',
    joinDate: '2022-03-15',
    lastActivity: '2024-01-15',
  },
  {
    id: 'MEM002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+2348023456789',
    savings: 320000,
    loans: 150000,
    status: 'active',
    joinDate: '2022-05-20',
    lastActivity: '2024-01-14',
  },
  {
    id: 'MEM003',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '+2348034567890',
    savings: 780000,
    loans: 500000,
    status: 'active',
    joinDate: '2021-11-10',
    lastActivity: '2024-01-12',
  },
  {
    id: 'MEM004',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+2348045678901',
    savings: 230000,
    loans: 0,
    status: 'inactive',
    joinDate: '2023-01-05',
    lastActivity: '2024-01-10',
  },
  {
    id: 'MEM005',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+2348056789012',
    savings: 650000,
    loans: 300000,
    status: 'active',
    joinDate: '2022-08-30',
    lastActivity: '2024-01-08',
  },
  {
    id: 'MEM006',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+2348067890123',
    savings: 890000,
    loans: 600000,
    status: 'active',
    joinDate: '2022-02-14',
    lastActivity: '2024-01-07',
  },
  {
    id: 'MEM007',
    name: 'David Wilson',
    email: 'david@example.com',
    phone: '+2348078901234',
    savings: 150000,
    loans: 0,
    status: 'active',
    joinDate: '2023-03-22',
    lastActivity: '2024-01-06',
  },
  {
    id: 'MEM008',
    name: 'Lisa Taylor',
    email: 'lisa@example.com',
    phone: '+2348089012345',
    savings: 420000,
    loans: 250000,
    status: 'active',
    joinDate: '2022-07-18',
    lastActivity: '2024-01-05',
  },
  {
    id: 'MEM009',
    name: 'James Anderson',
    email: 'james@example.com',
    phone: '+2348090123456',
    savings: 560000,
    loans: 400000,
    status: 'inactive',
    joinDate: '2022-09-25',
    lastActivity: '2024-01-04',
  },
  {
    id: 'MEM010',
    name: 'Maria Thomas',
    email: 'maria@example.com',
    phone: '+2348101234567',
    savings: 310000,
    loans: 100000,
    status: 'active',
    joinDate: '2023-04-30',
    lastActivity: '2024-01-03',
  },
]

export const loans: Loan[] = [
  {
    id: 'LOAN001',
    memberId: 'MEM001',
    memberName: 'John Doe',
    amount: 500000,
    purpose: 'Business Expansion',
    interestRate: 12,
    duration: 12,
    status: 'approved',
    appliedDate: '2024-01-15',
    approvedDate: '2024-01-16',
    monthlyPayment: 44424,
    remainingBalance: 500000,
  },
  {
    id: 'LOAN002',
    memberId: 'MEM002',
    memberName: 'Jane Smith',
    amount: 250000,
    purpose: 'Education',
    interestRate: 10,
    duration: 6,
    status: 'pending',
    appliedDate: '2024-01-14',
    monthlyPayment: 43107,
    remainingBalance: 250000,
  },
  {
    id: 'LOAN003',
    memberId: 'MEM003',
    memberName: 'Robert Johnson',
    amount: 1200000,
    purpose: 'Home Renovation',
    interestRate: 15,
    duration: 24,
    status: 'approved',
    appliedDate: '2024-01-12',
    approvedDate: '2024-01-13',
    disbursedDate: '2024-01-14',
    monthlyPayment: 58218,
    remainingBalance: 1150000,
  },
  {
    id: 'LOAN004',
    memberId: 'MEM004',
    memberName: 'Sarah Williams',
    amount: 750000,
    purpose: 'Medical Expenses',
    interestRate: 12,
    duration: 18,
    status: 'rejected',
    appliedDate: '2024-01-10',
    monthlyPayment: 0,
    remainingBalance: 0,
  },
  {
    id: 'LOAN005',
    memberId: 'MEM005',
    memberName: 'Michael Brown',
    amount: 300000,
    purpose: 'Vehicle Purchase',
    interestRate: 10,
    duration: 6,
    status: 'pending',
    appliedDate: '2024-01-08',
    monthlyPayment: 51728,
    remainingBalance: 300000,
  },
  {
    id: 'LOAN006',
    memberId: 'MEM006',
    memberName: 'Emily Davis',
    amount: 600000,
    purpose: 'Agriculture',
    interestRate: 8,
    duration: 12,
    status: 'disbursed',
    appliedDate: '2023-12-15',
    approvedDate: '2023-12-16',
    disbursedDate: '2023-12-18',
    monthlyPayment: 52196,
    remainingBalance: 450000,
  },
  {
    id: 'LOAN007',
    memberId: 'MEM007',
    memberName: 'David Wilson',
    amount: 400000,
    purpose: 'Small Business',
    interestRate: 12,
    duration: 12,
    status: 'completed',
    appliedDate: '2023-06-01',
    approvedDate: '2023-06-02',
    disbursedDate: '2023-06-03',
    monthlyPayment: 35539,
    remainingBalance: 0,
  },
]

export const savings: Savings[] = [
  {
    id: 'SAV001',
    memberId: 'MEM001',
    memberName: 'John Doe',
    amount: 25000,
    type: 'deposit',
    description: 'Monthly savings contribution',
    date: '2024-01-15',
    reference: 'DEP20240115001',
  },
  {
    id: 'SAV002',
    memberId: 'MEM002',
    memberName: 'Jane Smith',
    amount: 20000,
    type: 'deposit',
    description: 'Regular savings',
    date: '2024-01-14',
    reference: 'DEP20240114001',
  },
  {
    id: 'SAV003',
    memberId: 'MEM001',
    memberName: 'John Doe',
    amount: 50000,
    type: 'withdrawal',
    description: 'Emergency withdrawal',
    date: '2024-01-10',
    reference: 'WDL20240110001',
  },
  {
    id: 'SAV004',
    memberId: 'MEM003',
    memberName: 'Robert Johnson',
    amount: 40000,
    type: 'deposit',
    description: 'Monthly contribution',
    date: '2024-01-12',
    reference: 'DEP20240112001',
  },
  {
    id: 'SAV005',
    memberId: 'MEM004',
    memberName: 'Sarah Williams',
    amount: 15000,
    type: 'deposit',
    description: 'Monthly savings',
    date: '2024-01-10',
    reference: 'DEP20240110002',
  },
  {
    id: 'SAV006',
    memberId: 'MEM005',
    memberName: 'Michael Brown',
    amount: 35000,
    type: 'deposit',
    description: 'Additional savings',
    date: '2024-01-08',
    reference: 'DEP20240108001',
  },
  {
    id: 'SAV007',
    memberId: 'MEM006',
    memberName: 'Emily Davis',
    amount: 45000,
    type: 'deposit',
    description: 'Monthly contribution',
    date: '2024-01-07',
    reference: 'DEP20240107001',
  },
  {
    id: 'SAV008',
    memberId: 'MEM007',
    memberName: 'David Wilson',
    amount: 10000,
    type: 'deposit',
    description: 'Regular savings',
    date: '2024-01-06',
    reference: 'DEP20240106001',
  },
]

export const transactions: Transaction[] = [
  {
    id: 'TXN001',
    type: 'deposit',
    memberId: 'MEM001',
    memberName: 'John Doe',
    amount: 25000,
    date: '2024-01-15',
    status: 'completed',
    reference: 'DEP20240115001',
  },
  {
    id: 'TXN002',
    type: 'loan_disbursement',
    memberId: 'MEM002',
    memberName: 'Jane Smith',
    amount: 150000,
    date: '2024-01-14',
    status: 'completed',
    reference: 'LND20240114001',
  },
  {
    id: 'TXN003',
    type: 'withdrawal',
    memberId: 'MEM001',
    memberName: 'John Doe',
    amount: 50000,
    date: '2024-01-14',
    status: 'completed',
    reference: 'WDL20240114001',
  },
  {
    id: 'TXN004',
    type: 'deposit',
    memberId: 'MEM004',
    memberName: 'Sarah Williams',
    amount: 15000,
    date: '2024-01-13',
    status: 'completed',
    reference: 'DEP20240113001',
  },
  {
    id: 'TXN005',
    type: 'loan_repayment',
    memberId: 'MEM003',
    memberName: 'Robert Johnson',
    amount: 45000,
    date: '2024-01-12',
    status: 'completed',
    reference: 'REP20240112001',
  },
  {
    id: 'TXN006',
    type: 'deposit',
    memberId: 'MEM005',
    memberName: 'Michael Brown',
    amount: 35000,
    date: '2024-01-12',
    status: 'completed',
    reference: 'DEP20240112002',
  },
  {
    id: 'TXN007',
    type: 'loan_disbursement',
    memberId: 'MEM006',
    memberName: 'Emily Davis',
    amount: 600000,
    date: '2023-12-18',
    status: 'completed',
    reference: 'LND20231218001',
  },
  {
    id: 'TXN008',
    type: 'withdrawal',
    memberId: 'MEM007',
    memberName: 'David Wilson',
    amount: 20000,
    date: '2024-01-10',
    status: 'pending',
    reference: 'WDL20240110001',
  },
  {
    id: 'TXN009',
    type: 'deposit',
    memberId: 'MEM008',
    memberName: 'Lisa Taylor',
    amount: 25000,
    date: '2024-01-09',
    status: 'completed',
    reference: 'DEP20240109001',
  },
  {
    id: 'TXN010',
    type: 'loan_repayment',
    memberId: 'MEM009',
    memberName: 'James Anderson',
    amount: 38000,
    date: '2024-01-08',
    status: 'completed',
    reference: 'REP20240108001',
  },
]

// Helper functions
export function getMemberById(id: string): Member | undefined {
  return members.find(member => member.id === id)
}

export function getLoansByMemberId(memberId: string): Loan[] {
  return loans.filter(loan => loan.memberId === memberId)
}

export function getSavingsByMemberId(memberId: string): Savings[] {
  return savings.filter(saving => saving.memberId === memberId)
}

export function getTransactionsByMemberId(memberId: string): Transaction[] {
  return transactions.filter(transaction => transaction.memberId === memberId)
}

export function getTotalSavings(): number {
  return members.reduce((total, member) => total + member.savings, 0)
}

export function getTotalLoans(): number {
  return members.reduce((total, member) => total + member.loans, 0)
}

export function getActiveMembers(): Member[] {
  return members.filter(member => member.status === 'active')
}

export function getPendingLoans(): Loan[] {
  return loans.filter(loan => loan.status === 'pending')
}

// Dashboard statistics
export function getDashboardStats() {
  return {
    totalMembers: members.length,
    activeMembers: getActiveMembers().length,
    totalSavings: getTotalSavings(),
    totalLoans: getTotalLoans(),
    pendingApprovals: getPendingLoans().length,
    monthlyGrowth: 15.2, // This would be calculated from actual data
  }
}

// Monthly savings data for charts
export function getMonthlySavingsData() {
  return [
    { month: 'Jul', savings: 4000000, deposits: 4500000, withdrawals: 500000 },
    { month: 'Aug', savings: 4200000, deposits: 4800000, withdrawals: 600000 },
    { month: 'Sep', savings: 4500000, deposits: 5200000, withdrawals: 700000 },
    { month: 'Oct', savings: 4300000, deposits: 5000000, withdrawals: 700000 },
    { month: 'Nov', savings: 4800000, deposits: 5500000, withdrawals: 700000 },
    { month: 'Dec', savings: 5000000, deposits: 5800000, withdrawals: 800000 },
    { month: 'Jan', savings: 5200000, deposits: 6000000, withdrawals: 800000 },
  ]
}