import { QuestionGenerator, QuestionDifficulty, Question } from '../../types'

interface MultiplyBy25Question extends Question {
  number: number
  operation: 'multiply' | 'divide' | 'decimal' | 'compare' | 'combined'
  operand: number | string // Can be a number or fraction like "6/25"
}

class MultiplyBy25Generator implements QuestionGenerator {
  private readonly topicId = 'multiply-by-25'

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15)
  }

  private generateNumber(difficulty: QuestionDifficulty): [number | string, 'multiply' | 'divide' | 'decimal' | 'compare' | 'combined'] {
    let num: number | string
    let operation: 'multiply' | 'divide' | 'decimal' | 'compare' | 'combined'

    switch (difficulty) {
      case 'easy':
        // Easy: Multiplication with numbers divisible by 4
        if (Math.random() < 0.8) { // 80% simple multiplication
          num = Math.floor(Math.random() * 40) * 4 // 0-160, divisible by 4
          operation = 'multiply'
        } else { // 20% simple division
          const quotient = Math.floor(Math.random() * 20) + 1 // 1-20
          num = quotient * 25 // Makes division clean
          operation = 'divide'
        }
        break

      case 'medium':
        const mediumType = Math.random()
        if (mediumType < 0.4) { // 40% larger multiplication
          num = Math.floor(Math.random() * 200) + 100 // 100-300
          operation = 'multiply'
        } else if (mediumType < 0.7) { // 30% division
          num = Math.floor(Math.random() * 400) + 100 // 100-500
          operation = 'divide'
        } else if (mediumType < 0.9) { // 20% decimals
          num = (Math.floor(Math.random() * 400) / 10).toFixed(1) // 0.0-40.0
          operation = 'decimal'
        } else { // 10% comparisons
          num = `${Math.floor(Math.random() * 15) + 1}/25` // Fractions to compare
          operation = 'compare'
        }
        break

      case 'hard':
        const hardType = Math.random()
        if (hardType < 0.3) { // 30% large multiplication
          num = Math.floor(Math.random() * 3000) + 1000 // 1000-4000
          operation = 'multiply'
        } else if (hardType < 0.5) { // 20% complex division
          num = Math.floor(Math.random() * 2000) + 500 // 500-2500
          operation = 'divide'
        } else if (hardType < 0.7) { // 20% decimals
          num = (Math.floor(Math.random() * 1000) / 100).toFixed(2) // 0.00-10.00
          operation = 'decimal'
        } else if (hardType < 0.85) { // 15% comparisons
          num = `${Math.floor(Math.random() * 25) + 1}/25` // Harder fractions
          operation = 'compare'
        } else { // 15% combined operations
          num = Math.floor(Math.random() * 30) + 10 // 10-40 for combining with other numbers
          operation = 'combined'
        }
        break
    }

    return [num, operation]
  }

  generateQuestion(difficulty: QuestionDifficulty): MultiplyBy25Question {
    const [number, operation] = this.generateNumber(difficulty)
    let text: string
    let correctAnswer: number
    const num = typeof number === 'string' ? parseFloat(number) : number

    switch (operation) {
      case 'multiply':
        text = `${num} × 25 = ?`
        correctAnswer = num * 25
        break
      case 'divide':
        text = `${num} ÷ 25 = ?`
        correctAnswer = num / 25
        break
      case 'decimal':
        if (Math.random() < 0.5) {
          text = `${num} × 2.5 = ?`
          correctAnswer = num * 2.5
        } else {
          text = `${num} ÷ 2.5 = ?`
          correctAnswer = num / 2.5
        }
        break
      case 'compare':
        const fraction = number as string
        const decimal = 0.25
        text = `Which is larger: ${fraction} or .25?`
        const fracValue = eval(fraction)
        correctAnswer = fracValue > decimal ? fracValue : decimal
        break
      case 'combined':
        const multiplier = Math.random() < 0.5 ? 11 : 18
        text = `${num} × 25 × ${multiplier} = ?`
        correctAnswer = num * 25 * multiplier
        break
    }

    return {
      id: this.generateId(),
      text,
      correctAnswer,
      explanation: this.getStepByStepSolution(num, operation),
      difficulty,
      topicId: this.topicId,
      timeLimit: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20,
      number: num,
      operation,
      operand: operation === 'compare' ? number : 25
    }
  }

  private getStepByStepSolution(num: number, operation: string): string {
    switch (operation) {
      case 'multiply':
        return `🔢 Let's multiply ${num} × 25!

STEP 1️⃣ Think of 25 as 100 ÷ 4
    • Instead of × 25, we'll do ÷ 4 × 100
    • This is easier because dividing by 4 is simple!

STEP 2️⃣ Divide by 4
    • ${num} ÷ 4 = ${num/4}

STEP 3️⃣ Multiply by 100
    • ${num/4} × 100 = ${num * 25}
    • (Just add two zeros!)

✓ VERIFY YOUR ANSWER:
    • Original number: ${num}
    • Divided by 4: ${num/4}
    • Times 100: ${num * 25}

💡 Quick Tip: When multiplying by 25,
    divide by 4 and add two zeros!`

      case 'divide':
        return `🔢 Let's divide ${num} by 25!

STEP 1️⃣ Think of 25 as 100 ÷ 4
    • Instead of ÷ 25, we'll do × 4 ÷ 100
    • This is easier because multiplying by 4 is simple!

STEP 2️⃣ Multiply by 4
    • ${num} × 4 = ${num * 4}

STEP 3️⃣ Divide by 100
    • ${num * 4} ÷ 100 = ${num / 25}
    • (Move decimal point left two places!)

✓ VERIFY YOUR ANSWER:
    • Original number: ${num}
    • Times 4: ${num * 4}
    • Divided by 100: ${num / 25}

💡 Quick Tip: When dividing by 25,
    multiply by 4 and move decimal left two places!`

      case 'decimal':
        const isMultiply = num * 2.5 === correctAnswer
        return `🔢 Let's ${isMultiply ? 'multiply' : 'divide'} ${num} ${isMultiply ? '×' : '÷'} 2.5!

STEP 1️⃣ Convert 2.5 to a fraction
    • 2.5 = 25/10 = 1/4 × 10

STEP 2️⃣ ${isMultiply ? 'Multiply' : 'Divide'}
    • First ${isMultiply ? 'multiply' : 'divide'} by 10: ${num} ${isMultiply ? '×' : '÷'} 10 = ${isMultiply ? num * 10 : num / 10}
    • Then ${isMultiply ? 'divide' : 'multiply'} by 4: ${isMultiply ? num * 10 : num / 10} ${isMultiply ? '÷' : '×'} 4 = ${isMultiply ? num * 2.5 : num / 2.5}

✓ VERIFY YOUR ANSWER:
    • Original number: ${num}
    • Final answer: ${isMultiply ? num * 2.5 : num / 2.5}

💡 Quick Tip: Think of 2.5 as 10 ÷ 4!`

      case 'compare':
        const fracParts = (number as string).split('/')
        const fracValue = parseInt(fracParts[0]) / parseInt(fracParts[1])
        return `🔢 Let's compare ${number} and .25!

STEP 1️⃣ Convert fraction to decimal
    • ${number} = ${fracValue}

STEP 2️⃣ Compare with .25
    • ${fracValue} ${fracValue > 0.25 ? '>' : '<'} 0.25

✓ VERIFY YOUR ANSWER:
    • ${number} = ${fracValue}
    • .25 = 0.25
    • ${fracValue} is ${fracValue > 0.25 ? 'larger' : 'smaller'}

💡 Quick Tip: Convert fractions to decimals
    for easy comparison!`

      case 'combined':
        const mult = text.includes('11') ? 11 : 18
        return `🔢 Let's solve ${num} × 25 × ${mult}!

STEP 1️⃣ First multiply by 25
    • ${num} ÷ 4 = ${num/4}
    • ${num/4} × 100 = ${num * 25}

STEP 2️⃣ Then multiply by ${mult}
    • ${num * 25} × ${mult} = ${num * 25 * mult}

✓ VERIFY YOUR ANSWER:
    • First result: ${num * 25}
    • Final answer: ${num * 25 * mult}

💡 Quick Tip: Break it down into steps -
    first multiply by 25, then by ${mult}!`
    }
  }

  validateAnswer(question: Question, answer: number): boolean {
    const q = question as MultiplyBy25Question
    if (q.operation === 'compare') {
      // For comparisons, we just need to know if they picked the larger number
      const fracValue = eval(q.operand as string)
      return (answer === fracValue && fracValue > 0.25) || (answer === 0.25 && fracValue < 0.25)
    }
    return Math.abs(answer - q.correctAnswer) < 0.01 // Allow small decimal differences
  }

  getExplanation(question: Question): string {
    const q = question as MultiplyBy25Question
    return q.explanation
  }
}

export const multiplyBy25Generator = new MultiplyBy25Generator() 