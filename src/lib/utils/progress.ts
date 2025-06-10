import { units } from '@/lib/topics'
import { MasteryLevel } from '@/lib/constants/achievements'

const MASTERY_WEIGHTS = {
  UNRANKED: 0,
  BRONZE: 0.33,
  SILVER: 0.66,
  GOLD: 1
} as const

export interface TopicProgress {
  topicId: string
  level: MasteryLevel
}

export function calculateSchoolLevelProgress(schoolLevel: string, topicProgress: TopicProgress[]) {
  // Get all topics for this school level
  const levelTopics = units.flatMap(unit => 
    unit.topics.filter(topic => topic.level === schoolLevel.toLowerCase())
  )
  
  if (levelTopics.length === 0) return 0

  // Each topic contributes equally to the total progress
  const topicWeight = 100 / levelTopics.length

  // Calculate total progress
  const totalProgress = levelTopics.reduce((acc, topic) => {
    const progress = topicProgress.find(p => p.topicId === topic.id)
    if (!progress) return acc

    // Multiply topic weight by mastery level completion percentage
    return acc + (topicWeight * MASTERY_WEIGHTS[progress.level])
  }, 0)

  return Math.round(totalProgress)
}

export function calculateOverallProgress(topicProgress: TopicProgress[]) {
  const schoolLevels = ['elementary', 'middle', 'high']
  
  return {
    elementary: calculateSchoolLevelProgress('elementary', topicProgress),
    middle: calculateSchoolLevelProgress('middle', topicProgress),
    high: calculateSchoolLevelProgress('high', topicProgress)
  }
} 