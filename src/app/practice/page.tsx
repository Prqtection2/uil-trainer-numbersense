'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { colors } from '@/lib/theme'
import { units, numericalTricksContent } from '@/lib/topics'
import { Question, QuestionDifficulty } from '@/lib/types'

export default function PracticePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const topicId = searchParams.get('topic')
  const level = searchParams.get('level') || 'elementary'
  
  const [showSettings, setShowSettings] = useState(true)
  const [numQuestions, setNumQuestions] = useState(10)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [sessionStats, setSessionStats] = useState({
    startTime: new Date(),
    answers: [] as (number | null)[],
    times: [] as number[],
  })

  // Find the topic
  const topic = units.flatMap(unit => unit.topics).find(t => t.id === topicId)
  const topicContent = topicId ? numericalTricksContent[topicId] : null

  // Redirect to topics if no topic is selected
  useEffect(() => {
    if (!topicId) {
      router.push('/topics')
    }
  }, [topicId, router])

  // Get difficulty based on level
  const getDifficultyForLevel = (level: string): QuestionDifficulty => {
    switch (level) {
      case 'elementary':
        return 'easy'
      case 'middle':
        return 'medium'
      case 'high':
        return 'hard'
      default:
        return 'easy'
    }
  }

  // Initialize questions
  const startPractice = () => {
    if (topic) {
      const difficulty = getDifficultyForLevel(level)
      const newQuestions = Array(numQuestions).fill(null).map(() => 
        topic.generator.generateQuestion(difficulty)
      )
      setQuestions(newQuestions)
      setSessionStats({
        startTime: new Date(),
        answers: Array(newQuestions.length).fill(null),
        times: Array(newQuestions.length).fill(0),
      })
      setShowSettings(false)
    }
  }

  const handleSubmit = () => {
    if (!currentQuestion || !topic) return

    const numAnswer = parseFloat(answer)
    const isCorrect = !isNaN(numAnswer) && topic.generator.validateAnswer(currentQuestion, numAnswer)
    
    setIsAnswerCorrect(isCorrect)
    
    const newAnswers = [...sessionStats.answers]
    newAnswers[currentQuestionIndex] = isNaN(numAnswer) ? null : numAnswer
    
    const newTimes = [...sessionStats.times]
    newTimes[currentQuestionIndex] = (new Date().getTime() - sessionStats.startTime.getTime()) / 1000

    setSessionStats({
      ...sessionStats,
      answers: newAnswers,
      times: newTimes,
    })

    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setAnswer('')
      setIsAnswerCorrect(null)
      setShowExplanation(false)
      setSessionStats({
        ...sessionStats,
        startTime: new Date(),
      })
    }
  }

  const calculateStats = () => {
    if (!topic) return null
    
    const correctAnswers = sessionStats.answers.filter((a, i) => 
      a !== null && questions[i] && topic.generator.validateAnswer(questions[i], a)
    ).length
    
    const accuracy = (correctAnswers / questions.length) * 100
    const avgTime = sessionStats.times.reduce((a, b) => a + b, 0) / questions.length

    return {
      correctAnswers,
      accuracy: Math.round(accuracy),
      avgTime: Math.round(avgTime * 10) / 10,
    }
  }

  const currentQuestion = questions[currentQuestionIndex]

  if (!topic || !topicContent) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold" style={{ color: colors.primary[900] }}>
          Redirecting to topics...
        </h1>
      </div>
    )
  }

  const levelColor = colors[level][500]

  return (
    <div className="space-y-6 p-6">
      <Modal
        isOpen={showSettings}
        onClose={() => {}}
        title="Practice Settings"
      >
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold" style={{ color: colors.primary[900] }}>
              {topic.name}
            </h3>
            <p className="text-sm" style={{ color: colors.primary[600] }}>
              {topic.description}
            </p>
            <p className="mt-2 text-sm font-medium capitalize" style={{ color: levelColor }}>
              {level} School Level
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium" style={{ color: colors.primary[700] }}>
                Number of Questions
              </label>
              <Input
                type="number"
                min={1}
                max={50}
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value) || 10)}
                className="mt-1"
              />
            </div>
          </div>

          <Button
            className="w-full"
            onClick={startPractice}
            style={{
              backgroundColor: levelColor,
              color: 'white'
            }}
          >
            Start Practice
          </Button>
        </div>
      </Modal>

      {currentQuestion && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ color: colors.primary[900] }}>
              Question {currentQuestionIndex + 1}/{questions.length}
            </h1>
            <p className="text-sm" style={{ color: colors.primary[600] }}>
              Time Limit: {currentQuestion.timeLimit}s
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-lg" style={{ color: colors.primary[900] }}>
              {currentQuestion.text}
            </p>
            
            <div className="mt-4">
              <Input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
                disabled={isAnswerCorrect !== null}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isAnswerCorrect === null) {
                    handleSubmit()
                  }
                }}
              />
            </div>

            {showExplanation && (
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <p className="font-medium" style={{ color: isAnswerCorrect ? 'green' : 'red' }}>
                  {isAnswerCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="mt-2 text-sm" style={{ color: colors.primary[700], whiteSpace: 'pre-line', fontFamily: 'monospace' }}>
                  {topic.generator.getExplanation(currentQuestion)}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            {isAnswerCorrect === null ? (
              <Button
                onClick={handleSubmit}
                style={{
                  backgroundColor: levelColor,
                  color: 'white'
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                style={{
                  backgroundColor: levelColor,
                  color: 'white'
                }}
              >
                Next Question
              </Button>
            )}
          </div>
        </>
      )}

      {currentQuestionIndex === questions.length - 1 && isAnswerCorrect !== null && (
        <Modal
          isOpen={true}
          onClose={() => {}}
          title="Practice Complete!"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              {(() => {
                const stats = calculateStats()
                if (!stats) return null
                return (
                  <>
                    <div>
                      <p className="text-sm" style={{ color: colors.primary[600] }}>Correct Answers</p>
                      <p className="text-2xl font-bold" style={{ color: colors.primary[900] }}>
                        {stats.correctAnswers}/{questions.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: colors.primary[600] }}>Accuracy</p>
                      <p className="text-2xl font-bold" style={{ color: colors.primary[900] }}>
                        {stats.accuracy}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: colors.primary[600] }}>Avg Time</p>
                      <p className="text-2xl font-bold" style={{ color: colors.primary[900] }}>
                        {stats.avgTime}s
                      </p>
                    </div>
                  </>
                )
              })()}
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => window.location.reload()}
                style={{
                  borderColor: levelColor,
                  color: levelColor
                }}
              >
                Try Again
              </Button>
              <Button
                className="flex-1"
                onClick={() => window.history.back()}
                style={{
                  backgroundColor: levelColor,
                  color: 'white'
                }}
              >
                Back to Topics
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
} 