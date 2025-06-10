'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const levels = [
  {
    name: 'Elementary',
    description: 'Master the fundamentals of number sense',
    color: 'bg-green-100',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    href: '/topics?level=elementary',
  },
  {
    name: 'Middle School',
    description: 'Build on your skills with advanced concepts',
    color: 'bg-blue-100',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    href: '/topics?level=middle',
  },
  {
    name: 'High School',
    description: 'Challenge yourself with complex problems',
    color: 'bg-purple-100',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    href: '/topics?level=high',
  },
]

export default function Home() {
  const { user } = useStore()

  return (
    <div className="space-y-8">
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome to NumberSense
        </h1>
        <p className="mt-2 text-slate-600">
          Train for UIL Number Sense with interactive practice and progress
          tracking. Choose your level and start practicing!
        </p>
      </section>

      {user ? (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => (
            <div
              key={level.name}
              className={`rounded-lg border p-6 ${level.color} ${level.borderColor}`}
            >
              <h2 className={`text-lg font-semibold ${level.textColor}`}>
                {level.name}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {level.description}
              </p>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Progress</span>
                  <span className={`font-medium ${level.textColor}`}>
                    {user.progress[level.name.toLowerCase().split(' ')[0]]}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white">
                  <div
                    className={`h-full ${level.color.replace(
                      '100',
                      '500'
                    )}`}
                    style={{
                      width: `${
                        user.progress[
                          level.name.toLowerCase().split(' ')[0]
                        ]
                      }%`,
                    }}
                  />
                </div>
              </div>
              <Link href={level.href}>
                <Button
                  className="mt-4 w-full"
                  variant="outline"
                >
                  Continue Learning
                </Button>
              </Link>
            </div>
          ))}
        </section>
      ) : (
        <section className="rounded-lg bg-white p-6 text-center shadow-sm">
          <p className="text-slate-600">
            Please log in to track your progress and start practicing.
          </p>
        </section>
      )}

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick Practice
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Jump into a practice session with random questions from your level.
          </p>
          <Link href="/topics">
            <Button className="mt-4">Choose a Topic</Button>
          </Link>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Your Statistics
          </h2>
          {user ? (
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Total Questions</p>
                <p className="text-lg font-medium text-slate-900">
                  {user.stats.totalQuestions}
                </p>
              </div>
              <div>
                <p className="text-slate-600">Correct Answers</p>
                <p className="text-lg font-medium text-slate-900">
                  {user.stats.correctAnswers}
                </p>
              </div>
              <div>
                <p className="text-slate-600">Average Time</p>
                <p className="text-lg font-medium text-slate-900">
                  {user.stats.averageTime}s
                </p>
              </div>
              <div>
                <p className="text-slate-600">Streak</p>
                <p className="text-lg font-medium text-slate-900">
                  {user.stats.streakDays} days
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-600">
              Log in to view your statistics.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
