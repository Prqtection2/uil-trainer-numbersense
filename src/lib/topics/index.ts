import { Topic } from '../types'
import { foilMultiplicationGenerator } from './generators/foil'
import { multiplyBy11Generator } from './generators/multiply-by-11'
import { multiplyBy101Generator } from './generators/multiply-by-101'
import { multiplyBy25Generator } from './generators/multiply-by-25'

export interface Unit {
  id: string
  name: string
  description: string
  topics: Topic[]
}

export interface TopicContent {
  title: string
  content: string
  examples: string[]
}

// Initial content for Unit 1: Numerical Tricks
export const numericalTricksContent: Record<string, TopicContent> = {
  // FOIL Multiplication - Elementary
  'foil-multiplication-elementary': {
    title: 'Basic Two-Digit Multiplication',
    content: `Learn to multiply numbers when one of them ends in 0 or 5!

When multiplying by numbers ending in 0 or 5, you can use simple patterns to make the calculation easier.

For numbers ending in 0:
• Just multiply the other digits and add the zeros at the end
• Example: 23 × 20 = (23 × 2) + '0' = 46 + '0' = 460

For numbers ending in 5:
• Multiply the other number by the first digit of the number ending in 5, then add half of the other number
• Example: 24 × 15 = (24 × 1) + (24 ÷ 2) = 24 + 12 = 360`,
    examples: [
      '20 × 34 = 680',
      '15 × 26 = 390',
      '30 × 42 = 1,260'
    ]
  },

  // FOIL Multiplication - Middle School
  'foil-multiplication-middle': {
    title: 'FOIL Method Multiplication',
    content: `The FOIL method helps you multiply any two two-digit numbers!

FOIL stands for First, Outer, Inner, Last. Here's how it works:
1. Break down each number into tens + ones
   23 = 20 + 3
   45 = 40 + 5

2. Multiply using FOIL:
   F - First:  (20 × 40)
   O - Outer:  (20 × 5)
   I - Inner:  (3 × 40)
   L - Last:   (3 × 5)

3. Add all parts together!`,
    examples: [
      '23 × 45 = 1,035',
      '67 × 89 = 5,963',
      '34 × 56 = 1,904'
    ]
  },

  // FOIL Multiplication - High School
  'foil-multiplication-high': {
    title: 'Advanced FOIL Applications',
    content: `Master FOIL for complex calculations and algebraic expressions!

For Two-Digit Numbers:
• Use FOIL with strategic rounding
• Example: 98 × 97
  Think: (100 - 2)(100 - 3)
  = 10000 - 300 - 200 + 6
  = 9,506

For Algebra:
• Same pattern works for variables
• (x + 2)(x + 3) = x² + 5x + 6
• Great preparation for algebra!`,
    examples: [
      '98 × 97 = 9,506',
      '(x + 5)(x + 2)',
      '85 × 95 = 8,075'
    ]
  },

  // Multiply by 11 - Elementary
  'multiply-by-11-elementary': {
    title: 'Multiply by 11 (Basic)',
    content: `Learn the magic pattern for multiplying by 11!

For two-digit numbers:
1. Look at your number (e.g., 45)
2. Add the digits (4 + 5 = 9)
3. Put that sum between the original digits
   4 [4+5] 5 = 495

It's like magic! The answer will always follow this pattern.`,
    examples: [
      '45 × 11 = 495',
      '23 × 11 = 253',
      '54 × 11 = 594'
    ]
  },

  // Multiply by 11 - Middle School
  'multiply-by-11-middle': {
    title: 'Multiply by 11 and 111',
    content: `Take your 11 multiplication skills to the next level!

MULTIPLICATION:
• For three-digit numbers × 11:
  • Use the same pattern but watch for carrying
  • Example: 235 × 11
    2 [2+3] [3+5] 5
    = 2,585

• For 111:
  • The number appears three times!
  • 45 × 111 = 4,995
  • Look for the pattern: 4,995 has 45 hidden inside

DIVISION BY 11:
• Introduction to division patterns
• Look for numbers that are clearly divisible by 11
  Example: 583 ÷ 11 = 53
  (because 53 × 11 = 583)
• Start with friendly numbers and work your way up!`,
    examples: [
      '235 × 11 = 2,585',
      '45 × 111 = 4,995',
      '583 ÷ 11 = 53'
    ]
  },

  // Multiply by 11 - High School
  'multiply-by-11-high': {
    title: 'Advanced 11 Patterns',
    content: `Master advanced patterns with 11 and related numbers!

MULTIPLICATION BY 11:
• Four-digit numbers:
  2345 × 11 = 25,795
  Add adjacent digits, carrying when needed

• Multiplication by 111:
  456 × 111 = 50,616
  The number appears three times!

DIVISION BY 11:
• Key Pattern: If sum of alternating digits are equal,
  the number is divisible by 11
  Example: 143,143
  (1+3+4) = (4+1+3) = 8, so it's divisible by 11

• Quick Division:
  1. Check if divisible by 11
  2. Use the reverse of multiplication pattern
  Example: 9,999 ÷ 11 = 909
  (because 909 × 11 = 9,999)

DECIMAL VARIATIONS:
• Multiplying by 1.1:
  This is like dividing by 10 and adding
  Example: 450 × 1.1
  = 450 + 45 = 495

• Pattern with repeating decimals:
  1 ÷ 11 = 0.090909...
  2 ÷ 11 = 0.181818...
  5 ÷ 11 = 0.454545...

ADVANCED TRICKS:
• For numbers like 1111, 11111:
  Break into 1001 × 11 or similar
• Connect to algebraic patterns:
  11 is like (x + 1) where x = 10
• Look for cyclic patterns in divisions`,
    examples: [
      '2345 × 11 = 25,795',
      '9,999 ÷ 11 = 909',
      '450 × 1.1 = 495',
      '5 ÷ 11 = 0.454545...'
    ]
  },

  // Multiply by 101 - Elementary
  'multiply-by-101-elementary': {
    title: 'Multiply by 101 (Basic)',
    content: `Discover the fun pattern when multiplying by 101!

The Secret Pattern:
• The number appears twice in the answer
• Once in its normal spot
• Once shifted two places left

For two-digit numbers:
• Example: 25 × 101
• Answer: 2,525
• See how 25 appears twice?`,
    examples: [
      '25 × 101 = 2,525',
      '12 × 101 = 1,212',
      '45 × 101 = 4,545'
    ]
  },

  // Multiply by 101 - Middle School
  'multiply-by-101-middle': {
    title: 'Multiply by 101 (Intermediate)',
    content: `Master the 101 multiplication pattern!

Understanding Why It Works:
• 101 = 100 + 1
• So 45 × 101 is really:
  45 × 100 = 4,500
  45 × 1   = 45
  Total    = 4,545

Practice with larger numbers:
• The pattern still works
• Just be careful with place values!`,
    examples: [
      '75 × 101 = 7,575',
      '82 × 101 = 8,282',
      '95 × 101 = 9,595'
    ]
  },

  // Multiply by 101 - High School
  'multiply-by-101-high': {
    title: 'Advanced 101 Multiplication',
    content: `Challenge yourself with larger numbers!

For three-digit numbers:
• Same pattern applies
• Example: 234 × 101
  = 23,634
• Notice: 234 appears in 23,634!

Advanced Patterns:
• Try finding patterns with 1001, 1111
• Connect to algebraic concepts
• (x + 1)(x² + 1) patterns`,
    examples: [
      '234 × 101 = 23,634',
      '567 × 101 = 57,267',
      '789 × 101 = 79,689'
    ]
  },

  // Multiply by 25 - Elementary
  'multiply-by-25-elementary': {
    title: 'Multiply by 25 (Basic)',
    content: `Learn the magic of multiplying by 25!

The Secret Trick:
• 25 is the same as 100 ÷ 4
• So instead of multiplying by 25...
  1. Divide by 4
  2. Add two zeros (multiply by 100)

Example:
• 84 × 25
  1. 84 ÷ 4 = 21
  2. 21 × 100 = 2,100
• That's it! Much easier than multiplying by 25 directly!`,
    examples: [
      '84 × 25 = 2,100',
      '40 × 25 = 1,000',
      '32 × 25 = 800'
    ]
  },

  // Multiply by 25 - Middle School
  'multiply-by-25-middle': {
    title: 'Multiply and Divide by 25',
    content: `Master multiplication AND division by 25!

MULTIPLICATION:
• Remember: 25 = 100 ÷ 4
• To multiply by 25:
  1. Divide by 4
  2. Add two zeros

DIVISION:
• For division, we do the opposite:
  1. Multiply by 4
  2. Move decimal point left two places
• Example: 400 ÷ 25
  1. 400 × 4 = 1,600
  2. 1,600 ÷ 100 = 16

DECIMALS:
• Same trick works with 2.5!
• 2.5 is just 25 ÷ 10
• Example: 40 × 2.5 = 100`,
    examples: [
      '148 × 25 = 3,700',
      '400 ÷ 25 = 16',
      '40 × 2.5 = 100'
    ]
  },

  // Multiply by 25 - High School
  'multiply-by-25-high': {
    title: 'Advanced 25 Operations',
    content: `Master complex calculations with 25!

ADVANCED OPERATIONS:
• Fractions vs Decimals
  6/25 vs 0.25 - convert to decimals to compare
  7/25 = 0.28 > 0.25

• Combined Operations
  15 × 25 × 11
  1. First multiply by 25 (15 ÷ 4 × 100)
  2. Then multiply by 11

• Decimal Operations
  2.6 × 2.5 = (26 × 25) ÷ 10
  1.1 ÷ 2.5 = (11 ÷ 25) × 10

PATTERNS:
• Look for patterns in results
• Use the relationship between 25 and 100
• Break down complex problems into simpler steps`,
    examples: [
      '2.6 × 2.5 = 6.5',
      '15 × 25 × 11 = 4,125',
      '7/25 vs 0.25'
    ]
  }
}

export const units: Unit[] = [
  {
    id: 'numerical-tricks',
    name: 'Numerical Tricks',
    description: 'Learn essential tricks for fast mental math calculations',
    topics: [
      // FOIL Multiplication for Elementary
      {
        id: 'foil-multiplication-elementary',
        name: 'Basic Two-Digit Multiplication',
        description: 'Learn to multiply numbers ending in 0 or 5 using simple patterns',
        level: 'elementary',
        generator: foilMultiplicationGenerator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      // FOIL Multiplication for Middle School
      {
        id: 'foil-multiplication-middle',
        name: 'FOIL Method Multiplication',
        description: 'Master multiplying any two-digit numbers using the FOIL method',
        level: 'middle',
        generator: foilMultiplicationGenerator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      // FOIL Multiplication for High School
      {
        id: 'foil-multiplication-high',
        name: 'Advanced FOIL Applications',
        description: 'Apply FOIL to challenging two-digit multiplication and algebraic expressions',
        level: 'high',
        generator: foilMultiplicationGenerator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      
      // Multiply by 11 for Elementary
      {
        id: 'multiply-by-11-elementary',
        name: 'Multiply by 11 (Basic)',
        description: 'Learn the simple pattern for multiplying two-digit numbers by 11',
        level: 'elementary',
        generator: multiplyBy11Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      // Multiply by 11 for Middle School
      {
        id: 'multiply-by-11-middle',
        name: 'Multiply by 11 and 111',
        description: 'Master multiplying larger numbers by 11 and introduction to 111 patterns',
        level: 'middle',
        generator: multiplyBy11Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      // Multiply by 11 for High School
      {
        id: 'multiply-by-11-high',
        name: 'Advanced 11 Patterns',
        description: 'Master multiplication and division by 11, decimals like 1.1, and recognize advanced number patterns',
        level: 'high',
        generator: multiplyBy11Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },

      // Multiply by 101 for Elementary
      {
        id: 'multiply-by-101-elementary',
        name: 'Multiply by 101 (Basic)',
        description: 'Discover the simple pattern when multiplying small numbers by 101',
        level: 'elementary',
        generator: multiplyBy101Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      // Multiply by 101 for Middle School
      {
        id: 'multiply-by-101-middle',
        name: 'Multiply by 101 (Intermediate)',
        description: 'Practice multiplying larger two-digit numbers by 101 quickly',
        level: 'middle',
        generator: multiplyBy101Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      // Multiply by 101 for High School
      {
        id: 'multiply-by-101-high',
        name: 'Advanced 101 Multiplication',
        description: 'Master multiplying two and three-digit numbers by 101 mentally',
        level: 'high',
        generator: multiplyBy101Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },

      // Multiply by 25 - Elementary
      {
        id: 'multiply-by-25-elementary',
        name: 'Multiply by 25 (Basic)',
        description: 'Learn the simple pattern for multiplying numbers by 25',
        level: 'elementary',
        generator: multiplyBy25Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      // Multiply by 25 - Middle School
      {
        id: 'multiply-by-25-middle',
        name: 'Multiply and Divide by 25',
        description: 'Master multiplication and division by 25, including decimals',
        level: 'middle',
        generator: multiplyBy25Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      // Multiply by 25 - High School
      {
        id: 'multiply-by-25-high',
        name: 'Advanced 25 Operations',
        description: 'Challenge yourself with complex calculations involving 25, fractions, and combined operations',
        level: 'high',
        generator: multiplyBy25Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      }
    ]
  }
] 