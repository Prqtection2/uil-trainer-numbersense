import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const stats = await prisma.stats.findMany({
      where: {
        userId: session.user.id
      }
    })

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
} 