export type QuestionDifficulty = 'easy' | 'medium' | 'hard'

export type TopicId = string

export interface Question {
  id: string
  text: string
  correctAnswer: number
  explanation: string
  difficulty: QuestionDifficulty
  topicId: TopicId
  timeLimit?: number // in seconds, optional
}

export interface QuestionGenerator {
  generateQuestion: (difficulty: QuestionDifficulty) => Question
  validateAnswer: (question: Question, answer: number) => boolean
  getExplanation: (question: Question) => string
}

// Example question types
export interface MultiplicationQuestion extends Question {
  factors: number[]
}

export interface AdditionQuestion extends Question {
  addends: number[]
}

export interface FractionQuestion extends Question {
  numerator1: number
  denominator1: number
  numerator2: number
  denominator2: number
  operation: 'add' | 'subtract' | 'multiply' | 'divide'
}

export interface PercentageQuestion extends Question {
  value: number
  percentage: number
  operation: 'find_percentage' | 'find_value' | 'find_total'
}

// Topic structure
export interface Topic {
  id: TopicId
  name: string
  description: string
  level: 'elementary' | 'middle' | 'high'
  generator: QuestionGenerator
  stats: {
    attempts: number
    avgTime: number
    bestTime: number
    accuracy: number
  }
}

// Practice session
export interface PracticeSession {
  id: string
  userId: string
  topicId: TopicId
  questions: Question[]
  answers: (number | null)[]
  startTime: Date
  endTime?: Date
  stats: {
    totalTime: number
    avgTimePerQuestion: number
    correctAnswers: number
    accuracy: number
  }
} 