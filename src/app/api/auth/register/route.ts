import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    const exist = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (exist) {
      return new NextResponse('User already exists', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[REGISTER_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
} 