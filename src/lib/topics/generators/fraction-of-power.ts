import { Question, QuestionDifficulty } from '@/lib/types'

interface FractionPower {
  fraction: number
  power: number
  decimal: number
  display: string
  isApproximate?: boolean
}

const ELEMENTARY_FRACTIONS: FractionPower[] = [
  { fraction: 1/4, power: 100, decimal: 25, display: '¼ × 100' },
  { fraction: 1/2, power: 100, decimal: 50, display: '½ × 100' },
  { fraction: 3/4, power: 100, decimal: 75, display: '¾ × 100' },
  { fraction: 1/3, power: 100, decimal: 33.33, display: '⅓ × 100', isApproximate: true },
  { fraction: 2/3, power: 100, decimal: 66.67, display: '⅔ × 100', isApproximate: true }
]

const MIDDLE_FRACTIONS: FractionPower[] = [
  { fraction: 1/8, power: 1000, decimal: 125, display: '⅛ × 1000' },
  { fraction: 3/8, power: 1000, decimal: 375, display: '⅜ × 1000' },
  { fraction: 5/8, power: 1000, decimal: 625, display: '⅝ × 1000' },
  { fraction: 7/8, power: 1000, decimal: 875, display: '⅞ × 1000' },
  { fraction: 1/8, power: 100, decimal: 12.5, display: '⅛ × 100' },
  { fraction: 5/8, power: 10, decimal: 6.25, display: '⅝ × 10' },
  { fraction: 1/3, power: 1000, decimal: 333.33, display: '⅓ × 1000', isApproximate: true },
  { fraction: 2/3, power: 1000, decimal: 666.67, display: '⅔ × 1000', isApproximate: true },
  { fraction: 1/6, power: 1000, decimal: 166.67, display: '⅙ × 1000', isApproximate: true },
  { fraction: 1/9, power: 1000, decimal: 111.11, display: '⅑ × 1000', isApproximate: true },
  { fraction: 1/12, power: 1000, decimal: 83.33, display: '1/12 × 1000', isApproximate: true }
]

const HIGH_FRACTIONS: FractionPower[] = [
  { fraction: 1/8, power: 1, decimal: 0.125, display: '⅛' },
  { fraction: 1/16, power: 1, decimal: 0.0625, display: '1/16' },
  { fraction: 3/8, power: 1, decimal: 0.375, display: '⅜' },
  { fraction: 5/8, power: 1, decimal: 0.625, display: '⅝' },
  { fraction: 7/8, power: 1, decimal: 0.875, display: '⅞' },
  { fraction: 1/3, power: 1, decimal: 0.333, display: '⅓', isApproximate: true },
  { fraction: 2/3, power: 1, decimal: 0.667, display: '⅔', isApproximate: true },
  { fraction: 1/6, power: 10000, decimal: 1666.67, display: '⅙ × 10000', isApproximate: true },
  { fraction: 5/6, power: 10000, decimal: 8333.33, display: '⅚ × 10000', isApproximate: true },
  { fraction: 2/9, power: 1000, decimal: 222.22, display: '2/9 × 1000', isApproximate: true },
  { fraction: 4/9, power: 1000, decimal: 444.44, display: '4/9 × 1000', isApproximate: true },
  { fraction: 5/9, power: 1000, decimal: 555.56, display: '5/9 × 1000', isApproximate: true },
  { fraction: 7/9, power: 1000, decimal: 777.78, display: '7/9 × 1000', isApproximate: true },
  { fraction: 5/12, power: 10000, decimal: 4166.67, display: '5/12 × 10000', isApproximate: true },
  { fraction: 7/12, power: 10000, decimal: 5833.33, display: '7/12 × 10000', isApproximate: true }
]

function generateFractionOfPower(difficulty: QuestionDifficulty): Question {
  let inputNum: number
  let fractionPower: FractionPower
  const isMultiplication = Math.random() < 0.7 // 70% chance of multiplication
  
  switch (difficulty) {
    case 'easy':
      // Use simple fractions with friendly numbers
      fractionPower = ELEMENTARY_FRACTIONS[Math.floor(Math.random() * ELEMENTARY_FRACTIONS.length)]
      inputNum = Math.floor(Math.random() * 76) + 24 // 24-99
      break
      
    case 'medium':
      // Use eighths and basic complex fractions
      fractionPower = MIDDLE_FRACTIONS[Math.floor(Math.random() * MIDDLE_FRACTIONS.length)]
      inputNum = Math.floor(Math.random() * 480) + 120 // 120-599
      break
      
    case 'hard':
      // Complex combinations and higher powers
      fractionPower = HIGH_FRACTIONS[Math.floor(Math.random() * HIGH_FRACTIONS.length)]
      // Only use decimals with exact fractions
      if (!fractionPower.isApproximate && Math.random() < 0.3) { // 30% chance of decimal for exact fractions only
        inputNum = Math.round((Math.random() * 89 + 10) * 10) / 10 // 10.0-99.9, one decimal place
      } else {
        inputNum = Math.floor(Math.random() * 480) + 120 // 120-599
      }
      
      // Only add second operation for whole numbers
      if (Number.isInteger(inputNum) && Math.random() < 0.2) {
        const secondNum = Math.floor((Math.random() * 89) + 11) / 100 // 0.11-0.99
        inputNum = Math.round(inputNum * secondNum * 10) / 10 // Round to 1 decimal place
      }
      break
  }

  const correctAnswer = isMultiplication ? 
    inputNum * fractionPower.decimal :
    inputNum / fractionPower.decimal

  const approximateText = fractionPower.isApproximate ? ' ≈' : ' ='
  
  // Format numbers to avoid excessive decimals
  const formatNumber = (n: number) => {
    if (Number.isInteger(n)) return n.toString()
    return n.toFixed(1)
  }

  // Get denominator and numerator for the explanation
  const getDenomAndNum = (fraction: number): [number, number] => {
    if (fraction === 1/3) return [3, 1]
    if (fraction === 2/3) return [3, 2]
    if (fraction === 1/4) return [4, 1]
    if (fraction === 3/4) return [4, 3]
    if (fraction === 1/8) return [8, 1]
    if (fraction === 3/8) return [8, 3]
    if (fraction === 5/8) return [8, 5]
    if (fraction === 7/8) return [8, 7]
    if (fraction === 1/16) return [16, 1]
    if (fraction === 1/6) return [6, 1]
    if (fraction === 5/6) return [6, 5]
    if (fraction === 1/9) return [9, 1]
    if (fraction === 2/9) return [9, 2]
    if (fraction === 4/9) return [9, 4]
    if (fraction === 5/9) return [9, 5]
    if (fraction === 7/9) return [9, 7]
    if (fraction === 1/12) return [12, 1]
    if (fraction === 5/12) return [12, 5]
    if (fraction === 7/12) return [12, 7]
    return [1, 1] // fallback
  }

  const [denom, numerator] = getDenomAndNum(fractionPower.fraction)
  const divideStep = formatNumber(numerator / denom * fractionPower.power)
  
  const question: Question = {
    id: Math.random().toString(36).substring(2),
    text: isMultiplication ?
      `${formatNumber(inputNum)} × ${fractionPower.decimal}${approximateText}` :
      `${formatNumber(inputNum)} ÷ ${fractionPower.decimal}${approximateText}`,
    correctAnswer,
    explanation: isMultiplication ?
      `To multiply by ${fractionPower.decimal} (${fractionPower.display}):\n` +
      `1. Divide ${formatNumber(inputNum)} by ${denom} = ${formatNumber(inputNum/denom)}\n` +
      `2. Multiply by ${numerator} = ${formatNumber((inputNum/denom) * numerator)}\n` +
      (fractionPower.power !== 1 ? `3. Multiply by ${fractionPower.power} = ${formatNumber(correctAnswer)}\n` : '') +
      `${fractionPower.isApproximate ? (fractionPower.power !== 1 ? '4' : '3') + '. This is an approximation because the decimal repeats\n' : ''}` +
      `${approximateText} ${formatNumber(correctAnswer)}` :
      `To divide by ${fractionPower.decimal} (${fractionPower.display}):\n` +
      (fractionPower.power !== 1 ? `1. Divide by ${fractionPower.power} = ${formatNumber(inputNum/fractionPower.power)}\n` : '') +
      `${fractionPower.power !== 1 ? '2' : '1'}. Multiply by ${denom} = ${formatNumber((inputNum/fractionPower.power) * denom)}\n` +
      `${fractionPower.power !== 1 ? '3' : '2'}. Divide by ${numerator} = ${formatNumber(correctAnswer)}\n` +
      `${fractionPower.isApproximate ? (fractionPower.power !== 1 ? '4' : '3') + '. This is an approximation because the decimal repeats\n' : ''}` +
      `${approximateText} ${formatNumber(correctAnswer)}`,
    difficulty,
    topicId: `fraction-power-${difficulty === 'easy' ? 'elementary' : difficulty === 'medium' ? 'middle' : 'high'}`,
    timeLimit: difficulty === 'easy' ? 20 : difficulty === 'medium' ? 15 : 12
  }

  return question
}

export const fractionOfPowerGenerator = {
  generateQuestion: generateFractionOfPower,
  validateAnswer: (question: Question, answer: number) => {
    const isApproximate = question.text.includes('≈')
    
    // For division by approximate values, calculate expected answer
    if (question.text.includes('÷') && isApproximate) {
      const [num] = question.text.split(' ÷ ').map(parseFloat)
      const fraction = question.explanation.includes('× 3') ? 3 : // ⅓
                      question.explanation.includes('× 6') ? 6 : // ⅙
                      question.explanation.includes('× 9') ? 9 : // ⅑
                      question.explanation.includes('× 12') ? 12 : // 1/12
                      1
      const expectedAnswer = num * fraction
      // Allow for 1% difference for approximate values
      const percentDiff = Math.abs((answer - expectedAnswer) / expectedAnswer) * 100
      return percentDiff <= 1
    }
    
    if (isApproximate) {
      // Allow for 1% difference for approximate values
      const percentDiff = Math.abs((answer - question.correctAnswer) / question.correctAnswer) * 100
      return percentDiff <= 1
    }
    
    // For exact values, still use small fixed tolerance due to floating point precision
    return Math.abs(answer - question.correctAnswer) < 0.01
  },
  getExplanation: (question: Question) => question.explanation || ''
} 