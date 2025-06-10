import { QuestionGenerator, QuestionDifficulty } from '../../types'

interface FoilQuestion {
  id: string
  text: string
  correctAnswer: number
  explanation: string
  difficulty: QuestionDifficulty
  topicId: string
  timeLimit?: number
  num1: number
  num2: number
}

class FoilMultiplicationGenerator implements QuestionGenerator {
  private readonly topicId = 'foil-multiplication'

  private generateNumbers(difficulty: QuestionDifficulty): [number, number] {
    let min: number, max: number

    switch (difficulty) {
      case 'easy':
        // One number ends in 0 or 5
        const easyNum1 = Math.floor(Math.random() * 90) + 10
        const easyNum2 = Math.floor(Math.random() * 18) * 5 + 10 // Generates 10, 15, 20, ..., 95
        return [easyNum1, easyNum2]

      case 'medium':
        // Both numbers between 10-99, but avoiding numbers ending in 0 or 5
        min = 11
        max = 99
        const medNum1 = this.generateNonSpecialNumber(min, max)
        const medNum2 = this.generateNonSpecialNumber(min, max)
        return [medNum1, medNum2]

      case 'hard':
        // Both numbers between 50-99
        min = 50
        max = 99
        const hardNum1 = this.generateNonSpecialNumber(min, max)
        const hardNum2 = this.generateNonSpecialNumber(min, max)
        return [hardNum1, hardNum2]
    }
  }

  private generateNonSpecialNumber(min: number, max: number): number {
    let num
    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min
    } while (num % 5 === 0) // Avoid numbers ending in 0 or 5
    return num
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15)
  }

  generateQuestion(difficulty: QuestionDifficulty): FoilQuestion {
    const [num1, num2] = this.generateNumbers(difficulty)
    const correctAnswer = num1 * num2

    const explanation = this.getStepByStepSolution(num1, num2)

    return {
      id: this.generateId(),
      text: `${num1} × ${num2} = ?`,
      correctAnswer,
      explanation,
      difficulty,
      topicId: this.topicId,
      timeLimit: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20,
      num1,
      num2
    }
  }

  validateAnswer(question: FoilQuestion, answer: number): boolean {
    return answer === question.correctAnswer
  }

  getExplanation(question: FoilQuestion): string {
    return question.explanation
  }

  private getStepByStepSolution(num1: number, num2: number): string {
    // Break down numbers for explanation
    const a = Math.floor(num1 / 10)
    const b = num1 % 10
    const c = Math.floor(num2 / 10)
    const d = num2 % 10

    // Calculate steps
    const step1 = a * c     // First
    const step2 = a * d     // Outer
    const step3 = b * c     // Inner
    const step4 = b * d     // Last
    const result = num1 * num2

    return `🔢 Let's multiply ${num1} × ${num2} using FOIL!

STEP 1️⃣ Break down the numbers into tens + ones
    ${num1} = ${a}0 + ${b}
    ${num2} = ${c}0 + ${d}

STEP 2️⃣ Use FOIL to multiply:
    F - First:   (${a}0) × (${c}0)  = ${step1}00
    O - Outer:   (${a}0) × ${d}     = ${step2}0
    I - Inner:   ${b} × (${c}0)     = ${step3}0
    L - Last:    ${b} × ${d}        = ${step4}

STEP 3️⃣ Add all parts:
    ${step1}00    (First)
    ${step2}0     (Outer)
    ${step3}0     (Inner)
    ${step4}      (Last)
    ═══════
    ${result}

✓ VERIFY YOUR ANSWER:
    • Original numbers: ${num1} × ${num2}
    • FOIL parts added up correctly
    • Final answer: ${result}

💡 Quick Tip: FOIL stands for First, Outer, Inner, Last
    This method works because we're multiplying:
    (${a}0 + ${b}) × (${c}0 + ${d})
    Just like distributing in algebra!`
  }
}

export const foilMultiplicationGenerator = new FoilMultiplicationGenerator() 