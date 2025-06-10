import { QuestionGenerator, MultiplicationQuestion, QuestionDifficulty } from '../types'
import { v4 as uuidv4 } from 'uuid'

class MultiplicationGenerator implements QuestionGenerator {
  private readonly topicId = 'e2' // Basic Multiplication topic ID

  private generateFactors(difficulty: QuestionDifficulty): number[] {
    switch (difficulty) {
      case 'easy':
        // Single digit multiplication (2-9)
        return [
          Math.floor(Math.random() * 8) + 2,
          Math.floor(Math.random() * 8) + 2
        ]
      case 'medium':
        // One double digit (10-99) and one single digit (2-9)
        return [
          Math.floor(Math.random() * 90) + 10,
          Math.floor(Math.random() * 8) + 2
        ]
      case 'hard':
        // Both double digits (10-99)
        return [
          Math.floor(Math.random() * 90) + 10,
          Math.floor(Math.random() * 90) + 10
        ]
    }
  }

  generateQuestion(difficulty: QuestionDifficulty): MultiplicationQuestion {
    const factors = this.generateFactors(difficulty)
    const correctAnswer = factors[0] * factors[1]

    return {
      id: uuidv4(),
      text: `${factors[0]} × ${factors[1]} = ?`,
      correctAnswer,
      explanation: `${factors[0]} × ${factors[1]} = ${correctAnswer}`,
      difficulty,
      topicId: this.topicId,
      factors,
      timeLimit: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15
    }
  }

  validateAnswer(question: MultiplicationQuestion, answer: number): boolean {
    return answer === question.correctAnswer
  }

  getExplanation(question: MultiplicationQuestion): string {
    const { factors, correctAnswer } = question
    return `${factors[0]} × ${factors[1]} = ${correctAnswer}\n\nYou can solve this by:\n1. Breaking down the multiplication if needed\n2. Using multiplication tables for smaller numbers\n3. Using the standard algorithm for larger numbers`
  }
}

export const multiplicationGenerator = new MultiplicationGenerator() 