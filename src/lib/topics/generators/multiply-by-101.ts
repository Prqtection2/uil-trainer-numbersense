import { QuestionGenerator, QuestionDifficulty } from '../../types'

interface MultiplyBy101Question {
  id: string
  text: string
  correctAnswer: number
  explanation: string
  difficulty: QuestionDifficulty
  topicId: string
  timeLimit?: number
  number: number
}

class MultiplyBy101Generator implements QuestionGenerator {
  private readonly topicId = 'multiply-by-101'

  private generateNumber(difficulty: QuestionDifficulty): number {
    switch (difficulty) {
      case 'easy':
        // Easy: 2-digit numbers from 10-30
        return Math.floor(Math.random() * 21) + 10
      case 'medium':
        // Medium: 2-digit numbers from 31-75
        return Math.floor(Math.random() * 45) + 31
      case 'hard':
        // Hard: Mix of larger 2-digit (76-99) and some 3-digit numbers (100-299)
        if (Math.random() < 0.7) { // 70% chance of 2-digit
          return Math.floor(Math.random() * 24) + 76
        } else { // 30% chance of 3-digit
          return Math.floor(Math.random() * 200) + 100
        }
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15)
  }

  private getStepByStepSolution(num: number): string {
    const result = num * 101

    return `🔢 Let's multiply ${num} × 101!

STEP 1️⃣ Understand the pattern
    101 = 100 + 1
    So ${num} × 101 is the same as:
    ${num} × 100 + ${num} × 1

STEP 2️⃣ Break it down
    ${num} × 100 = ${num}00
    ${num} × 1   = ${num}

STEP 3️⃣ Add the parts
    ${num}00
    ${num}
    ═══════
    ${result}

✓ VERIFY YOUR ANSWER:
    • Original number: ${num}
    • Multiplied by: 101
    • Final answer: ${result}

💡 Quick Tip: When you multiply by 101, the number
    appears twice - once shifted two places left,
    and once in its original position!

    For example: 
    45 × 101 = 4,545
    You can see 45 twice in 4,545!`
  }

  generateQuestion(difficulty: QuestionDifficulty): MultiplyBy101Question {
    const number = this.generateNumber(difficulty)
    const correctAnswer = number * 101

    return {
      id: this.generateId(),
      text: `${number} × 101 = ?`,
      correctAnswer,
      explanation: this.getStepByStepSolution(number),
      difficulty,
      topicId: this.topicId,
      timeLimit: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20,
      number
    }
  }

  validateAnswer(question: MultiplyBy101Question, answer: number): boolean {
    return answer === question.correctAnswer
  }

  getExplanation(question: MultiplyBy101Question): string {
    return question.explanation
  }
}

export const multiplyBy101Generator = new MultiplyBy101Generator() 