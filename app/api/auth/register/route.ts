// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    let body: any

    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      )
    }

    const {
      email,
      password,
      name,
      phone,
      dateOfBirth,
      occupation,
      monthlyIncome,
      address,
      city,
      state,
      emergencyContact,
      relationship,
    } = body

    // Validate required fields
    const requiredFields = ['email', 'password', 'name', 'phone', 'dateOfBirth', 'occupation']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate member ID
    const year = new Date().getFullYear().toString().slice(-2)
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const memberId = `MEM${year}${randomNum}`

    // Create user with member details
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone,
        role: 'MEMBER',
        status: 'ACTIVE',
        memberDetails: {
          create: {
            memberId,
            dateOfBirth: new Date(dateOfBirth),
            occupation,
            monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : null,
            address,
            city,
            state,
            emergencyContact,
            relationship,
            joinDate: new Date(),
            status: 'ACTIVE'
          }
        }
      },
      include: {
        memberDetails: true
      }
    })

    const { password: _password, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Registration successful. Your application is pending review.',
      user: userWithoutPassword
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}