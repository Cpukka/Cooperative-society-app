// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      status: string
      phone?: string
      avatar?: string
      memberDetails?: {
        id: string
        memberId: string
        dateOfBirth?: Date
        address?: string
        city?: string
        state?: string
        occupation?: string
        monthlyIncome?: number
        emergencyContact?: string
        relationship?: string
        joinDate: Date
        status: string
      }
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
    status: string
    phone?: string
    avatar?: string
    memberDetails?: any
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    status: string
    phone?: string
    avatar?: string
    memberDetails?: any
  }
}