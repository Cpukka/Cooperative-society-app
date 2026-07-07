// app/api/members/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET /api/members/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    const member = await prisma.member.findUnique({
      where: { id },
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
          orderBy: { date: 'desc' },
        },
        loans: {
          include: {
            repayments: true,
          },
          orderBy: { appliedDate: 'desc' },
        },
        transactions: {
          orderBy: { date: 'desc' },
          take: 10,
        },
        attendances: {
          include: {
            meeting: true,
          },
          orderBy: { meeting: { date: 'desc' } },
        },
      }
    })

    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(member)
  } catch (error) {
    console.error('Error fetching member:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/members/[id] - Update member
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
      name, 
      phone, 
      address,
      city,
      state,
      occupation,
      monthlyIncome,
      emergencyContact,
      relationship,
      status 
    } = body

    // Update member
    const { id } = await params

    const member = await prisma.member.update({
      where: { id },
      data: {
        address,
        city,
        state,
        occupation,
        monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : undefined,
        emergencyContact,
        relationship,
        status: status || undefined,
        user: {
          update: {
            name,
            phone,
            status: status || undefined,
          }
        }
      },
      include: {
        user: true,
      }
    })

    return NextResponse.json(member)
  } catch (error) {
    console.error('Error updating member:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/members/[id] - Delete member
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Only SUPER_ADMIN can delete members
    if (session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const { id } = await params

    await prisma.member.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Member deleted successfully' })
  } catch (error) {
    console.error('Error deleting member:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}