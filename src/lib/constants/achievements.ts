export const MASTERY_LEVELS = {
  UNRANKED: {
    name: 'Unranked',
    color: 'gray',
    requirements: {
      accuracy: 0,
      timePerQuestion: Infinity
    }
  },
  BRONZE: {
    name: 'Bronze',
    color: '#CD7F32',
    requirements: {
      accuracy: 70,
      timePerQuestion: Infinity
    }
  },
  SILVER: {
    name: 'Silver',
    color: '#C0C0C0',
    requirements: {
      accuracy: 80,
      timePerQuestion: 20
    }
  },
  GOLD: {
    name: 'Gold',
    color: '#FFD700',
    requirements: {
      accuracy: 90,
      timePerQuestion: 12
    }
  }
}

export const SCHOOL_LEVELS = {
  ELEMENTARY: 'Elementary School',
  MIDDLE: 'Middle School',
  HIGH: 'High School'
}

export type MasteryLevel = keyof typeof MASTERY_LEVELS
export type SchoolLevel = keyof typeof SCHOOL_LEVELS

export const calculateMasteryLevel = (accuracy: number, timePerQuestion: number): MasteryLevel => {
  if (accuracy >= 90 && timePerQuestion <= 12) return 'GOLD'
  if (accuracy >= 80 && timePerQuestion <= 20) return 'SILVER'
  if (accuracy >= 70) return 'BRONZE'
  return 'UNRANKED'
}

export const getMasteryLevelColor = (level: MasteryLevel) => {
  return MASTERY_LEVELS[level].color
}

export const getMasteryLevelName = (level: MasteryLevel) => {
  return MASTERY_LEVELS[level].name
} 