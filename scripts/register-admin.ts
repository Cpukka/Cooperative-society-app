// scripts/register-admin.ts
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function registerAdmin() {
  const email = 'admin@cooperative.org'
  const password = 'Admin@123'
  const name = 'System Administrator'
  const memberId = 'ADM001'

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    console.log('Admin user already exists')
    return
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
      status: 'ACTIVE',
      memberDetails: {
        create: {
          memberId,
          phone: '+1234567890',
          occupation: 'Administrator',
          monthlyIncome: 0,
          joinDate: new Date(),
          status: 'ACTIVE'
        }
      }
    }
  })

  console.log('Super Admin user created successfully!')
  console.log('Email:', email)
  console.log('Password:', password)
  console.log('Member ID:', memberId)
  console.log('Role: SUPER_ADMIN')
}

registerAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect())