import { z } from 'zod'

export const memberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  occupation: z.string().optional(),
  monthlyIncome: z.number().min(0, 'Income cannot be negative').optional(),
  emergencyContact: z.string().optional(),
  relationship: z.string().optional(),
})

export const loanSchema = z.object({
  memberId: z.string().min(1, 'Member ID is required'),
  amount: z.number().min(1000, 'Minimum loan amount is ₦1,000'),
  purpose: z.string().min(5, 'Please describe the loan purpose'),
  interestRate: z.number().min(1).max(30, 'Interest rate must be between 1% and 30%'),
  duration: z.number().min(1).max(36, 'Maximum loan duration is 36 months'),
  collateral: z.string().optional(),
  notes: z.string().optional(),
})

export const savingsTransactionSchema = z.object({
  memberId: z.string().min(1, 'Member ID is required'),
  amount: z.number().min(100, 'Minimum transaction amount is ₦100'),
  type: z.enum(['DEPOSIT', 'WITHDRAWAL']),
  description: z.string().optional(),
  reference: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

export const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  address: z.string().optional(),
  occupation: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const approvalSchema = z.object({
  action: z.enum(['approve', 'reject']),
  notes: z.string().optional(),
})

export const reportSchema = z.object({
  type: z.enum(['savings', 'loan', 'member', 'society']),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  memberId: z.string().optional(),
  format: z.enum(['pdf', 'csv', 'excel']).default('pdf'),
})