import { Topic } from '../types'
import { foilMultiplicationGenerator } from './generators/foil'
import { multiplyBy11Generator } from './generators/multiply-by-11'
import { multiplyBy101Generator } from './generators/multiply-by-101'
import { multiplyBy25Generator } from './generators/multiply-by-25'
import { multiplyBy75Generator } from './generators/multiply-by-75'
import { fractionOfPowerGenerator } from './generators/fraction-of-power'
import { numericalTricksContent } from './content'

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

export { numericalTricksContent }

// Initial content for Unit 1: Numerical Tricks
export const units: Unit[] = [
  {
    id: 'numerical-tricks',
    name: 'Unit 1: Numerical Tricks',
    description: 'Learn essential numerical tricks for fast calculations',
    topics: [
      // Topic 1.1: FOIL Multiplication
      {
        id: 'foil-multiplication-elementary',
        name: 'Topic 1.1 - FOIL Multiplication (Basic)',
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
      {
        id: 'foil-multiplication-middle',
        name: 'Topic 1.1 - FOIL Method Multiplication',
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
      {
        id: 'foil-multiplication-high',
        name: 'Topic 1.1 - Advanced FOIL Applications',
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

      // Topic 1.2.1: Multiply by 11
      {
        id: 'multiply-by-11-elementary',
        name: 'Topic 1.2.1 - Multiply by 11 (Basic)',
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
      {
        id: 'multiply-by-11-middle',
        name: 'Topic 1.2.1 - Multiply by 11 and 111',
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
      {
        id: 'multiply-by-11-high',
        name: 'Topic 1.2.1 - Advanced 11 Patterns',
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

      // Topic 1.2.2: Multiply by 101
      {
        id: 'multiply-by-101-elementary',
        name: 'Topic 1.2.2 - Multiply by 101 (Basic)',
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
      {
        id: 'multiply-by-101-middle',
        name: 'Topic 1.2.2 - Multiply by 101 (Intermediate)',
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
      {
        id: 'multiply-by-101-high',
        name: 'Topic 1.2.2 - Advanced 101 Multiplication',
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

      // Topic 1.2.3: Multiply by 25
      {
        id: 'multiply-by-25-elementary',
        name: 'Topic 1.2.3 - Multiply by 25 (Basic)',
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
      {
        id: 'multiply-by-25-middle',
        name: 'Topic 1.2.3 - Multiply and Divide by 25',
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
      {
        id: 'multiply-by-25-high',
        name: 'Topic 1.2.3 - Advanced 25 Operations',
        description: 'Challenge yourself with complex calculations involving 25, fractions, and combined operations',
        level: 'high',
        generator: multiplyBy25Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },

      // Topic 1.2.4: Multiply by 75
      {
        id: 'multiply-by-75-elementary',
        name: 'Topic 1.2.4 - Multiply by 75 (Basic)',
        description: 'Master multiplying and dividing by 75 using the ¾ × 100 trick',
        level: 'elementary',
        generator: multiplyBy75Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      {
        id: 'multiply-by-75-middle',
        name: 'Topic 1.2.4 - Multiply and Divide by 75',
        description: 'Master multiplication and division by 75, including decimals like 7.5',
        level: 'middle',
        generator: multiplyBy75Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      {
        id: 'multiply-by-75-high',
        name: 'Topic 1.2.4 - Advanced 75 Operations',
        description: 'Challenge yourself with complex calculations involving 75, fractions, and combined operations',
        level: 'high',
        generator: multiplyBy75Generator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },

      // Topic 1.2.5: Fractions of Powers
      {
        id: 'fraction-power-elementary',
        name: 'Topic 1.2.5 - Common Fractions of 100',
        description: 'Learn to multiply using common fractions like ¼, ½, and ¾ of 100',
        level: 'elementary',
        generator: fractionOfPowerGenerator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      {
        id: 'fraction-power-middle',
        name: 'Topic 1.2.5 - Eighths of Powers of 10',
        description: 'Master multiplication using eighths of powers of 10 like 125 (⅛ × 1000)',
        level: 'middle',
        generator: fractionOfPowerGenerator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      },
      {
        id: 'fraction-power-high',
        name: 'Topic 1.2.5 - Advanced Fraction Powers',
        description: 'Challenge yourself with complex calculations involving fractions of powers of 10',
        level: 'high',
        generator: fractionOfPowerGenerator,
        stats: {
          attempts: 0,
          avgTime: 0,
          bestTime: 0,
          accuracy: 0
        }
      }
    ]
  },
  {
    id: 'algebraic-tricks',
    name: 'Unit 2: Algebraic Tricks',
    description: 'Learn essential algebraic tricks for fast calculations',
    topics: [
      {
        id: 'foil',
        name: 'FOIL Multiplication',
        description: 'Learn to multiply two-digit numbers using the FOIL method',
        level: 'middle',
        generator: foilMultiplicationGenerator,
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