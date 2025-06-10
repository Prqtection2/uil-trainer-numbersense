import { cn } from "@/lib/utils"
import { MasteryLevel, getMasteryLevelColor, getMasteryLevelName } from "@/lib/constants/achievements"

interface MasteryBadgeProps {
  level: MasteryLevel
  className?: string
  showName?: boolean
}

export function MasteryBadge({ level, className, showName = true }: MasteryBadgeProps) {
  const color = getMasteryLevelColor(level)
  const name = getMasteryLevelName(level)

  return (
    <div className={cn(
      "flex items-center gap-2",
      className
    )}>
      <div 
        className="w-4 h-4 rounded-full" 
        style={{ backgroundColor: color }}
      />
      {showName && (
        <span className="text-sm font-medium">{name}</span>
      )}
    </div>
  )
} 