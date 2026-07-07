// app/api/members/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET /api/members - Fetch all members
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Only admins can view all members
    if (!['SUPER_ADMIN', 'ADMIN', 'FINANCE_OFFICER', 'LOAN_OFFICER'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Get query parameters for filtering
    const searchParams = req.nextUrl.searchParams
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Build where clause
    const where: any = {}
    if (status) where.status = status
    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { memberId: { contains: search, mode: 'insensitive' } },
      ]
    }

    const members = await prisma.member.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            status: true,
            role: true,
            avatar: true,
          }
        },
        savings: {
          select: {
            id: true,
            amount: true,
            type: true,
            date: true,
          },
          orderBy: { date: 'desc' },
          take: 5,
        },
        loans: {
          select: {
            id: true,
            amount: true,
            status: true,
            appliedDate: true,
          },
          orderBy: { appliedDate: 'desc' },
          take: 5,
        },
      },
      orderBy: { joinDate: 'desc' },
    })

    return NextResponse.json(members)
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/members - Create a new member
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Only admins can create members
    if (!['SUPER_ADMIN', 'ADMIN', 'FINANCE_OFFICER'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { 
      name, 
      email, 
      phone, 
      password,
      dateOfBirth,
      address,
      city,
      state,
      occupation,
      monthlyIncome,
      emergencyContact,
      relationship,
      memberId 
    } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password if provided
    let hashedPassword = undefined
    if (password) {
      const bcrypt = await import('bcryptjs')
      hashedPassword = await bcrypt.default.hash(password, 12)
    }

    // Create member
    const member = await prisma.member.create({
      data: {
        memberId: memberId || `MEM${Date.now().toString().slice(-6)}`,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        address,
        city,
        state,
        occupation,
        monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : undefined,
        emergencyContact,
        relationship,
        user: {
          create: {
            name,
            email,
            phone,
            password: hashedPassword,
            role: 'MEMBER',
            status: 'ACTIVE',
          }
        }
      },
      include: {
        user: true
      }
    })

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error('Error creating member:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}