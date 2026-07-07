// app/api/loans/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET /api/loans
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = req.nextUrl.searchParams
    const memberId = searchParams.get('memberId')
    const status = searchParams.get('status')

    const where: any = {}
    if (memberId) where.memberId = memberId
    if (status) where.status = status

    const loans = await prisma.loan.findMany({
      where,
      include: {
        member: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              }
            }
          }
        },
        repayments: {
          orderBy: { paymentDate: 'desc' },
        },
      },
      orderBy: { appliedDate: 'desc' },
    })

    return NextResponse.json(loans)
  } catch (error) {
    console.error('Error fetching loans:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/loans - Create a new loan application
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const {
      memberId,
      amount,
      purpose,
      interestRate,
      duration,
      notes,
    } = body

    if (!memberId || !amount || !purpose) {
      return NextResponse.json(
        { error: 'Member ID, amount, and purpose are required' },
        { status: 400 }
      )
    }

    // Calculate monthly payment
    const principal = parseFloat(amount)
    const rate = parseFloat(interestRate || '5') / 100 / 12
    const months = parseInt(duration || '12')
    
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)

    const loan = await prisma.loan.create({
      data: {
        memberId,
        amount: principal,
        purpose,
        interestRate: parseFloat(interestRate || '5'),
        duration: months,
        monthlyPayment,
        remainingBalance: principal,
        notes,
        status: 'PENDING',
      },
      include: {
        member: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              }
            }
          }
        },
        repayments: true,
      }
    })

    return NextResponse.json(loan, { status: 201 })
  } catch (error) {
    console.error('Error creating loan:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}