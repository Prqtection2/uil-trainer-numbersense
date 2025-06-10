'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { colors } from '@/lib/theme'
import { units, numericalTricksContent } from '@/lib/topics'
import { Question, QuestionDifficulty } from '@/lib/types'
import { MasteryProgress } from '@/components/ui/mastery-progress'
import { calculateMasteryLevel } from '@/lib/constants/achievements'

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
  const allTopics = units.flatMap(unit => unit.topics)
  const topic = allTopics.find(t => t.id === topicId)
  const topicContent = topicId ? numericalTricksContent[topicId] : null

  // Debug logging
  useEffect(() => {
    console.log('Debug Info:')
    console.log('Topic ID:', topicId)
    console.log('All Topics:', allTopics)
    console.log('Found Topic:', topic)
    console.log('Topic Content:', topicContent)
    console.log('Content Keys:', Object.keys(numericalTricksContent))
    console.log('Units:', units)
  }, [topicId, topic, topicContent])

  // Redirect to topics if no topic is selected or found
  useEffect(() => {
    if (!topicId || !topic || !topicContent) {
      console.log('Redirecting because:')
      console.log('- No topicId:', !topicId)
      console.log('- No topic:', !topic)
      console.log('- No topicContent:', !topicContent)
      router.push('/topics')
    }
  }, [topicId, topic, topicContent, router])

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

    // If this is the last question, don't show the next button
    if (currentQuestionIndex === questions.length - 1) {
      // Calculate and submit stats
      const stats = calculateStats()
      if (stats) {
        fetch('/api/stats/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topicId,
            accuracy: stats.accuracy,
            avgTime: stats.timePerQuestion,
            correctAnswers: stats.correctAnswers,
            totalQuestions: questions.length,
            schoolLevel: level.toUpperCase(),
          }),
        })
      }
    }
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
    const timePerQuestion = avgTime

    // Calculate mastery level
    const masteryLevel = calculateMasteryLevel(accuracy, timePerQuestion)

    // Update stats in database
    fetch('/api/stats/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topicId,
        accuracy,
        avgTime: timePerQuestion,
        correctAnswers,
        totalQuestions: questions.length,
        schoolLevel: level.toUpperCase(),
      }),
    })

    return {
      correctAnswers,
      accuracy: Math.round(accuracy),
      avgTime: Math.round(avgTime * 10) / 10,
      masteryLevel,
      timePerQuestion: Math.round(timePerQuestion * 10) / 10,
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
            <div className="mt-4 flex gap-4">
              <Input
                type="number"
                placeholder="Enter your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !showExplanation) {
                    handleSubmit()
                  }
                }}
                className="flex-1"
              />
              {!showExplanation ? (
                <Button
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: levelColor,
                    color: 'white'
                  }}
                >
                  Submit
                </Button>
              ) : currentQuestionIndex < questions.length - 1 ? (
                <Button
                  onClick={handleNext}
                  style={{
                    backgroundColor: levelColor,
                    color: 'white'
                  }}
                >
                  Next
                </Button>
              ) : null}
            </div>
            {showExplanation && (
              <div className="mt-4">
                <p
                  className="text-lg font-medium"
                  style={{
                    color: isAnswerCorrect ? colors.success[600] : colors.error[600]
                  }}
                >
                  {isAnswerCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="mt-2" style={{ color: colors.primary[600] }}>
                  The correct answer is: {currentQuestion.answer}
                </p>
                {topic.generator.getExplanation && (
                  <pre className="mt-2 whitespace-pre-line font-mono text-sm" style={{ color: colors.primary[600] }}>
                    {topic.generator.getExplanation(currentQuestion)}
                  </pre>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {!showSettings && currentQuestionIndex === questions.length - 1 && showExplanation && (
        <Modal
          isOpen={true}
          onClose={() => {}}
          title="Session Complete!"
        >
          <div className="space-y-6">
            {(() => {
              const stats = calculateStats()
              if (!stats) return null

              return (
                <>
                  <div className="space-y-2">
                    <h3 className="font-semibold" style={{ color: colors.primary[900] }}>
                      Results
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Accuracy</p>
                        <p className="text-lg font-medium">{stats.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Average Time</p>
                        <p className="text-lg font-medium">{stats.avgTime}s</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Correct Answers</p>
                        <p className="text-lg font-medium">{stats.correctAnswers}/{questions.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time per Question</p>
                        <p className="text-lg font-medium">{stats.timePerQuestion}s</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold" style={{ color: colors.primary[900] }}>
                      Mastery Progress
                    </h3>
                    <MasteryProgress
                      currentLevel={stats.masteryLevel}
                      accuracy={stats.accuracy}
                      timePerQuestion={stats.timePerQuestion}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      className="flex-1"
                      onClick={() => {
                        setShowSettings(true)
                        setCurrentQuestionIndex(0)
                        setQuestions([])
                        setAnswer('')
                        setIsAnswerCorrect(null)
                        setShowExplanation(false)
                      }}
                      style={{
                        backgroundColor: colors.primary[500],
                        color: 'white'
                      }}
                    >
                      Practice Again
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => router.push('/topics')}
                      variant="outline"
                    >
                      Back to Topics
                    </Button>
                  </div>
                </>
              )
            })()}
          </div>
        </Modal>
      )}
    </div>
  )
} 