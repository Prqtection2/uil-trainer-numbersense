import { Question, QuestionDifficulty } from '@/lib/types'

function generateMultiplyBy75(difficulty: QuestionDifficulty): Question {
  let num: number
  
  switch (difficulty) {
    case 'easy':
      // Single digit or easy two-digit numbers (20, 30, 40, etc)
      num = Math.random() < 0.5 ? 
        Math.floor(Math.random() * 9) + 1 : // 1-9
        Math.floor(Math.random() * 8 + 2) * 10 // 20, 30, ..., 90
      break
    case 'medium':
      // Two digit numbers
      num = Math.floor(Math.random() * 89) + 10 // 10-99
      break
    case 'hard':
      // Two digit numbers and decimal numbers
      if (Math.random() < 0.7) {
        num = Math.floor(Math.random() * 89) + 10 // 10-99
      } else {
        // Generate decimal numbers like 8.8, 7.5, etc
        num = Math.round((Math.random() * 9 + 1) * 10) / 10
      }
      break
  }

  const isMultiplication = Math.random() < 0.7 // 70% chance of multiplication

  const question: Question = {
    text: isMultiplication ? 
      `${num} × 75 =` :
      `${num * 75} ÷ 75 =`,
    answer: isMultiplication ? num * 75 : num,
    timeLimit: difficulty === 'easy' ? 20 : difficulty === 'medium' ? 15 : 12
  }

  // Add explanation
  const explanation = isMultiplication ?
    `To multiply by 75:\n` +
    `1. Divide ${num} by 4: ${num} ÷ 4 = ${num/4}\n` +
    `2. Multiply by 3: ${num/4} × 3 = ${(num/4) * 3}\n` +
    `3. Multiply by 100: ${(num/4) * 3} × 100 = ${num * 75}` :
    `To divide by 75:\n` +
    `1. Multiply ${num * 75} by 4: ${num * 75} × 4 = ${num * 75 * 4}\n` +
    `2. Divide by 3: ${num * 75 * 4} ÷ 3 = ${(num * 75 * 4) / 3}\n` +
    `3. Divide by 100: ${(num * 75 * 4) / 3} ÷ 100 = ${num}`

  question.explanation = explanation

  return question
}

export const multiplyBy75Generator = {
  generateQuestion: generateMultiplyBy75,
  validateAnswer: (question: Question, answer: number) => {
    // Allow for small floating point errors
    return Math.abs(answer - question.answer) < 0.01
  },
  getExplanation: (question: Question) => question.explanation || ''
} 