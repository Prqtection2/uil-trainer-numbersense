import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { colors } from '@/lib/theme'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  level?: 1 | 2 | 3
  className?: string
}

export function CollapsibleSection({
  title,
  children,
  defaultExpanded = true,
  level = 1,
  className = ''
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const fontSize = {
    1: 'text-xl',
    2: 'text-lg',
    3: 'text-base'
  }[level]

  const padding = {
    1: 'p-6',
    2: 'p-4',
    3: 'p-3'
  }[level]

  const bgColor = {
    1: 'bg-white',
    2: 'bg-gray-50',
    3: 'bg-white'
  }[level]

  return (
    <div className={`rounded-lg ${bgColor} shadow-sm ${className}`}>
      <button
        className={`w-full flex items-center justify-between ${padding} text-left`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className={`${fontSize} font-semibold`} style={{ color: colors.primary[900] }}>
          {title}
        </h2>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5" style={{ color: colors.primary[500] }} />
        ) : (
          <ChevronRight className="h-5 w-5" style={{ color: colors.primary[500] }} />
        )}
      </button>
      {isExpanded && (
        <div className={`${padding} pt-0`}>
          {children}
        </div>
      )}
    </div>
  )
} 