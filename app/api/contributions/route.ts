// app/api/contributions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET /api/contributions
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
    const type = searchParams.get('type')
    const fromDate = searchParams.get('from')
    const toDate = searchParams.get('to')

    const where: any = {}
    if (memberId) where.memberId = memberId
    if (type) where.type = type
    if (fromDate) where.date = { ...where.date, gte: new Date(fromDate) }
    if (toDate) where.date = { ...where.date, lte: new Date(toDate) }

    const contributions = await prisma.savings.findMany({
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
        }
      },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json(contributions)
  } catch (error) {
    console.error('Error fetching contributions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/contributions - Record a new contribution
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
    const { memberId, amount, type, description, reference } = body

    if (!memberId || !amount || !type) {
      return NextResponse.json(
        { error: 'Member ID, amount, and type are required' },
        { status: 400 }
      )
    }

    const contribution = await prisma.savings.create({
      data: {
        memberId,
        amount: parseFloat(amount),
        type,
        description,
        reference,
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
        }
      }
    })

    return NextResponse.json(contribution, { status: 201 })
  } catch (error) {
    console.error('Error creating contribution:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}