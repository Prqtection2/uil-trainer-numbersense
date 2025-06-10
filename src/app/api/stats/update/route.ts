import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { calculateMasteryLevel } from '@/lib/constants/achievements'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { topicId, accuracy, avgTime, correctAnswers, totalQuestions, schoolLevel } = body

    // Calculate mastery level
    const masteryLevel = calculateMasteryLevel(accuracy, avgTime)

    // Get or create stats
    const stats = await prisma.stats.upsert({
      where: {
        userId_topicId: {
          userId: session.user.id,
          topicId,
        },
      },
      create: {
        userId: session.user.id,
        topicId,
        attempts: 1,
        avgTime,
        bestTime: avgTime,
        accuracy,
        bestAccuracy: accuracy,
        totalQuestions,
        correctAnswers,
        schoolLevel,
        level: masteryLevel,
      },
      update: {
        attempts: { increment: 1 },
        avgTime: { set: avgTime < avgTime ? avgTime : avgTime },
        bestTime: { set: avgTime < avgTime ? avgTime : avgTime },
        accuracy: { set: accuracy > accuracy ? accuracy : accuracy },
        bestAccuracy: { set: accuracy > accuracy ? accuracy : accuracy },
        totalQuestions: { increment: totalQuestions },
        correctAnswers: { increment: correctAnswers },
        schoolLevel,
        level: masteryLevel,
      },
    })

    // Check if achievement should be unlocked
    if (masteryLevel !== 'UNRANKED') {
      await prisma.achievement.upsert({
        where: {
          userId_topicId_level: {
            userId: session.user.id,
            topicId,
            level: masteryLevel,
          },
        },
        create: {
          userId: session.user.id,
          topicId,
          level: masteryLevel,
          requirements: {
            accuracy,
            timePerQuestion: avgTime,
          },
        },
        update: {},
      })
    }

    // Get all stats to calculate overall progress
    const allStats = await prisma.stats.findMany({
      where: {
        userId: session.user.id
      }
    })

    // Return updated stats and progress
    return NextResponse.json({
      stats,
      progress: {
        elementary: calculateProgress('ELEMENTARY', allStats),
        middle: calculateProgress('MIDDLE', allStats),
        high: calculateProgress('HIGH', allStats)
      }
    })
  } catch (error) {
    console.error('Error updating stats:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

function calculateProgress(schoolLevel: string, stats: any[]) {
  const levelStats = stats.filter(s => s.schoolLevel === schoolLevel)
  if (levelStats.length === 0) return 0

  const masteryWeights = {
    UNRANKED: 0,
    BRONZE: 0.33,
    SILVER: 0.66,
    GOLD: 1
  }

  const totalProgress = levelStats.reduce((acc, stat) => {
    return acc + masteryWeights[stat.level as keyof typeof masteryWeights]
  }, 0)

  return Math.round((totalProgress / levelStats.length) * 100)
} 