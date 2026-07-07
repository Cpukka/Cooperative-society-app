// app/lib/db.ts
import prisma from '../lib/prisma'

// Export a service object with common queries
export const db = {
  // Users
  user: prisma.user,
  // Members
  member: prisma.member,
  // Accounts
  account: prisma.account,
  // Sessions
  session: prisma.session,
  // And other models...
}
