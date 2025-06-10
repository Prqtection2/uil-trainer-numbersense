import { MASTERY_LEVELS, MasteryLevel } from "@/lib/constants/achievements"
import { MasteryBadge } from "./mastery-badge"
import { cn } from "@/lib/utils"

interface MasteryProgressProps {
  currentLevel: MasteryLevel
  accuracy: number
  timePerQuestion: number
  className?: string
}

export function MasteryProgress({ currentLevel, accuracy, timePerQuestion, className }: MasteryProgressProps) {
  const levels: MasteryLevel[] = ['BRONZE', 'SILVER', 'GOLD']
  
  return (
    <div className={cn("space-y-4", className)}>
      {levels.map((level) => {
        const requirements = MASTERY_LEVELS[level].requirements
        const accuracyProgress = Math.min(100, (accuracy / requirements.accuracy) * 100)
        const timeProgress = requirements.timePerQuestion === Infinity ? 100 :
          Math.min(100, ((requirements.timePerQuestion - timePerQuestion) / requirements.timePerQuestion) * 100)
        
        const isUnlocked = levels.indexOf(level) <= levels.indexOf(currentLevel as MasteryLevel)
        
        return (
          <div key={level} className="space-y-2">
            <div className="flex justify-between items-center">
              <MasteryBadge level={level} />
              {isUnlocked && <span className="text-sm text-green-500">Unlocked!</span>}
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Accuracy: {requirements.accuracy}%</span>
                <span>{Math.round(accuracy)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all",
                    isUnlocked ? "bg-green-500" : "bg-blue-500"
                  )}
                  style={{ width: `${accuracyProgress}%` }}
                />
              </div>
            </div>

            {requirements.timePerQuestion !== Infinity && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Time per question: {requirements.timePerQuestion}s</span>
                  <span>{Math.round(timePerQuestion)}s</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all",
                      isUnlocked ? "bg-green-500" : "bg-blue-500"
                    )}
                    style={{ width: `${timeProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
} 