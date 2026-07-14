// prisma/seed.ts
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../app/generated/prisma/client" // Fixed path
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL!

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables")
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting database seed...')

  try {
    // Test connection
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connected successfully')

    // Create admin user
    const adminPassword = await bcrypt.hash('Admin@123', 12)
    
    await prisma.user.upsert({
      where: { email: 'admin@cooperative.org' },
      update: {},
      create: {
        email: 'admin@cooperative.org',
        name: 'System Administrator',
        password: adminPassword,
        role: 'SUPER_ADMIN',
        emailVerified: new Date(),
        status: 'ACTIVE',
        memberDetails: {
          create: {
            memberId: 'ADM001',
            occupation: 'Administrator',
            monthlyIncome: 100000,
            joinDate: new Date(),
            status: 'ACTIVE'
          }
        }
      }
    })
    console.log('✅ Admin user created')

    // Create finance officer
    const financePassword = await bcrypt.hash('Finance@123', 12)
    
    await prisma.user.upsert({
      where: { email: 'finance@cooperative.org' },
      update: {},
      create: {
        email: 'finance@cooperative.org',
        name: 'Finance Officer',
        password: financePassword,
        role: 'FINANCE_OFFICER',
        emailVerified: new Date(),
        status: 'ACTIVE',
        memberDetails: {
          create: {
            memberId: 'FIN001',
            occupation: 'Finance Officer',
            monthlyIncome: 80000,
            joinDate: new Date(),
            status: 'ACTIVE'
          }
        }
      }
    })
    console.log('✅ Finance officer created')

    // Create sample members
    const memberPassword = await bcrypt.hash('Member@123', 12)
    
    const members = [
      {
        email: 'john.doe@cooperative.org',
        name: 'John Doe',
        password: memberPassword,
        role: 'MEMBER' as const,
        memberDetails: {
          memberId: 'MEM001',
          phone: '+1234567892',
          occupation: 'Teacher',
          monthlyIncome: 50000,
          dateOfBirth: new Date('1985-06-15'),
          address: '123 Main St',
          city: 'Nairobi',
          state: 'Nairobi',
          emergencyContact: '+1234567899',
          relationship: 'Spouse'
        }
      },
      {
        email: 'jane.smith@cooperative.org',
        name: 'Jane Smith',
        password: memberPassword,
        role: 'MEMBER' as const,
        memberDetails: {
          memberId: 'MEM002',
          phone: '+1234567893',
          occupation: 'Nurse',
          monthlyIncome: 45000,
          dateOfBirth: new Date('1990-03-22'),
          address: '456 Oak Ave',
          city: 'Mombasa',
          state: 'Mombasa',
          emergencyContact: '+1234567898',
          relationship: 'Sister'
        }
      }
    ]

    for (const member of members) {
      await prisma.user.upsert({
        where: { email: member.email },
        update: {},
        create: {
          email: member.email,
          name: member.name,
          password: member.password,
          role: member.role,
          emailVerified: new Date(),
          status: 'ACTIVE',
          memberDetails: {
            create: {
              ...member.memberDetails,
              joinDate: new Date(),
              status: 'ACTIVE'
            }
          }
        }
      })
    }
    console.log('✅ Member users created')

    console.log('\n🎉 Database seeded successfully!')
    console.log('\n🔑 Login Credentials:')
    console.log('  Admin: admin@cooperative.org / Admin@123')
    console.log('  Finance: finance@cooperative.org / Finance@123')
    console.log('  Members: Use Member@123 for all member accounts')

  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  }
}

main()

.catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })