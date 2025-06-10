import { QuestionGenerator, QuestionDifficulty, Question } from '../../types'

interface MultiplyBy11Question extends Question {
  number: number
  multiplier: number | string // Can be 11, 111, 1.1, or "÷11" for division
}

class MultiplyBy11Generator implements QuestionGenerator {
  private readonly topicId = 'multiply-by-11'

  private generateNumber(difficulty: QuestionDifficulty): [number, number | string] {
    let num: number
    let multiplier: number | string

    switch (difficulty) {
      case 'easy':
        num = Math.floor(Math.random() * 90) + 10
        multiplier = 11
        break
      case 'medium':
        const mediumType = Math.random()
        if (mediumType < 0.4) { // 40% chance - three digit × 11
          num = Math.floor(Math.random() * 900) + 100
          multiplier = 11
        } else if (mediumType < 0.8) { // 40% chance - two digit × 111
          num = Math.floor(Math.random() * 90) + 10
          multiplier = 111
        } else { // 20% chance - simple division by 11
          // Generate "friendly" numbers divisible by 11 for middle school
          const quotient = Math.floor(Math.random() * 45) + 10 // Results between 10-54
          num = quotient * 11
          multiplier = "÷11"
        }
        break
      case 'hard':
        // For hard difficulty, we now have 4 types of questions
        const questionType = Math.random()
        if (questionType < 0.3) { // 30% chance - large number × 11
          num = Math.floor(Math.random() * 9000) + 1000
          multiplier = 11
        } else if (questionType < 0.6) { // 30% chance - medium number × 111
          num = Math.floor(Math.random() * 900) + 100
          multiplier = 111
        } else if (questionType < 0.8) { // 20% chance - division by 11
          // Generate numbers that are divisible by 11
          const quotient = Math.floor(Math.random() * 900) + 100
          num = quotient * 11
          multiplier = "÷11"
        } else { // 20% chance - multiplication by 1.1
          num = Math.floor(Math.random() * 900) + 100
          multiplier = 1.1
        }
        break
    }

    return [num, multiplier]
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15)
  }

  private getStepByStepSolution(num: number, multiplier: number | string): string {
    if (multiplier === "÷11") {
      return this.getDivisionExplanation(num)
    } else if (multiplier === 1.1) {
      return this.getDecimalExplanation(num)
    } else {
      return this.getMultiplicationExplanation(num, multiplier as number)
    }
  }

  private getDivisionExplanation(num: number): string {
    const result = num / 11
    const digits = num.toString().split('').map(Number)
    const oddSum = digits.filter((_, i) => i % 2 === 0).reduce((a, b) => a + b, 0)
    const evenSum = digits.filter((_, i) => i % 2 === 1).reduce((a, b) => a + b, 0)

    return `🔢 Let's divide ${num} by 11!

STEP 1️⃣ Check if it's divisible by 11
    • Sum of digits in odd positions: ${oddSum}
    • Sum of digits in even positions: ${evenSum}
    • Difference: ${Math.abs(oddSum - evenSum)}
    • ${oddSum === evenSum ? 'The sums are equal, so it is divisible by 11!' : 'The difference is divisible by 11!'}

STEP 2️⃣ Find the quotient
    • We can work backwards from our 11 multiplication pattern
    • ${result} × 11 = ${num}
    • So ${num} ÷ 11 = ${result}

✓ VERIFY YOUR ANSWER:
    • Original number: ${num}
    • Divided by: 11
    • Final answer: ${result}

💡 Quick Tip: When dividing by 11, look for the
    reverse of the multiplication pattern!`
  }

  private getDecimalExplanation(num: number): string {
    const tenth = num / 10
    const result = num * 1.1

    return `🔢 Let's multiply ${num} by 1.1!

STEP 1️⃣ Understand what 1.1 means
    • 1.1 = 1 + 0.1
    • So we add the number plus its tenth

STEP 2️⃣ Calculate
    • Original number: ${num}
    • One tenth: ${tenth}
    • ${num} + ${tenth} = ${result}

✓ VERIFY YOUR ANSWER:
    • Original number: ${num}
    • Multiplied by: 1.1
    • Final answer: ${result}

💡 Quick Tip: To multiply by 1.1, just add 10%
    of the number to itself!`
  }

  private getMultiplicationExplanation(num: number, multiplier: number): string {
    const digits = num.toString().split('').map(Number)
    const steps: string[] = []
    const result = num * multiplier

    if (multiplier === 11) {
      steps.push(
        `🔢 To multiply ${num} by 11 in your head:\n\n` +
        `STEP 1️⃣\n` +
        `Your answer will have ${digits.length + 1} digits\n\n` +
        `STEP 2️⃣\n` +
        `Remember these digits:\n` +
        `    ▸ First digit:  ${digits[0]}\n` +
        `    ▸ Last digit:   ${digits[digits.length - 1]}\n\n` +
        `STEP 3️⃣\n` +
        `For the middle digits:\n` +
        `    ▸ Add each pair of adjacent digits\n` +
        `    ▸ If sum is over 9, carry the 1 to next pair\n\n` +
        `⚡ MENTAL PROCESS ⚡\n\n` +
        `START:\n` +
        `    ▸ Write down: ${digits[digits.length - 1]}\n` +
        `    ▸ Current number: ${digits[digits.length - 1]}\n`
      )

      let carry = 0
      let currentResult = digits[digits.length - 1].toString()

      for (let i = digits.length - 2; i >= 0; i--) {
        const sum = digits[i] + digits[i + 1] + carry
        carry = Math.floor(sum / 10)
        const digit = sum % 10
        currentResult = digit.toString() + currentResult

        steps.push(
          `\nNEXT:\n` +
          `    ▸ Add: ${digits[i]} + ${digits[i + 1]}${carry > 0 ? ' + ' + carry + ' (carried)' : ''}\n` +
          `    ▸ Sum = ${sum}\n` +
          `    ▸ ${carry > 0 ? `Write ${digit}, carry ${carry}` : `Write ${digit}`}\n` +
          `    ▸ Current number: ${currentResult}\n`
        )
      }

      if (carry > 0) {
        currentResult = carry.toString() + currentResult
        steps.push(
          `\nFINAL:\n` +
          `    ▸ Place carry ${carry} at the start\n` +
          `    ▸ Final number: ${currentResult}\n`
        )
      }

      steps.push(
        `\n✓ VERIFY YOUR ANSWER:\n` +
        `    ▸ Original number:  ${num}\n` +
        `    ▸ Multiplied by:   11\n` +
        `    ▸ Your answer:     ${result}\n\n` +
        `    ▸ Quick check: Each middle digit should be\n` +
        `      the sum of the two digits above it\n\n` +
        `═══════════════════════════════\n` +
        `Final answer: ${result}\n` +
        `═══════════════════════════════\n`
      )
    } else {
      steps.push(
        `🔢 To multiply ${num} by 111 in your head:\n\n` +
        `STEP 1️⃣\n` +
        `Think of this as adding the number to itself shifted:\n` +
        `    ${num}\n` +
        `    ${num}0\n` +
        `    ${num}00\n\n` +
        `STEP 2️⃣\n` +
        `Add these numbers vertically:\n` +
        `    ${num}00\n` +
        `    ${num}0\n` +
        `    ${num}\n` +
        `    ═════\n` +
        `    ${result}\n\n` +
        `STEP 3️⃣\n` +
        `Quick check: Answer should be about 111 times ${num}\n\n` +
        `═══════════════════════════════\n` +
        `Final answer: ${result}\n` +
        `═══════════════════════════════\n`
      )
    }

    return steps.join('')
  }

  generateQuestion(difficulty: QuestionDifficulty): MultiplyBy11Question {
    const [number, multiplier] = this.generateNumber(difficulty)
    let correctAnswer: number
    let text: string

    if (multiplier === "÷11") {
      correctAnswer = number / 11
      text = `${number} ÷ 11 = ?`
    } else {
      correctAnswer = number * (multiplier as number)
      text = `${number} × ${multiplier} = ?`
    }

    return {
      id: this.generateId(),
      text,
      correctAnswer,
      explanation: this.getStepByStepSolution(number, multiplier),
      difficulty,
      topicId: this.topicId,
      timeLimit: difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : 20,
      number,
      multiplier
    }
  }

  validateAnswer(question: Question, answer: number): boolean {
    const q = question as MultiplyBy11Question
    return Math.abs(answer - q.correctAnswer) < 0.01 // Allow small decimal differences
  }

  getExplanation(question: Question): string {
    const q = question as MultiplyBy11Question
    return q.explanation
  }
}

export const multiplyBy11Generator = new MultiplyBy11Generator()
