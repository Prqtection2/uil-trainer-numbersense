'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FavoritesPage() {
  const { user } = useStore()

  // This will be replaced with actual favorites data later
  const demoFavorites = [
    {
      id: 'e1',
      name: 'Basic Addition',
      description: 'Quick addition of single and double digit numbers',
      level: 'elementary',
      progress: 0,
      completed: 0,
      total: 10,
    },
    {
      id: 'm1',
      name: 'Fractions',
      description: 'Adding and subtracting fractions quickly',
      level: 'middle',
      progress: 0,
      completed: 0,
      total: 10,
    },
  ]

  const levelColors = {
    elementary: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      border: 'border-green-200',
    },
    middle: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
    high: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      border: 'border-purple-200',
    },
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Favorites</h1>
        <p className="mt-2 text-slate-600">
          Your saved topics and practice sets.
        </p>
      </section>

      {!user ? (
        <section className="rounded-lg bg-white p-6 text-center shadow-sm">
          <p className="text-slate-600">
            Please log in to view your favorites.
          </p>
        </section>
      ) : user.favorites.length === 0 ? (
        <section className="rounded-lg bg-white p-6 text-center shadow-sm">
          <p className="text-slate-600">
            You haven't saved any favorites yet. Browse topics to add some!
          </p>
          <Link href="/topics">
            <Button className="mt-4">Browse Topics</Button>
          </Link>
        </section>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2">
          {demoFavorites.map((topic) => (
            <div
              key={topic.id}
              className={`rounded-lg border p-6 ${
                levelColors[topic.level as keyof typeof levelColors].bg
              } ${levelColors[topic.level as keyof typeof levelColors].border}`}
            >
              <h2
                className={`text-lg font-semibold ${
                  levelColors[topic.level as keyof typeof levelColors].text
                }`}
              >
                {topic.name}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {topic.description}
              </p>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Progress</span>
                  <span
                    className={`font-medium ${
                      levelColors[topic.level as keyof typeof levelColors].text
                    }`}
                  >
                    {topic.progress}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white">
                  <div
                    className={`h-full ${levelColors[
                      topic.level as keyof typeof levelColors
                    ].bg.replace('100', '500')}`}
                    style={{
                      width: `${topic.progress}%`,
                    }}
                  />
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  {topic.completed} / {topic.total} completed
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/practice?topic=${topic.id}`} className="flex-1">
                  <Button className="w-full" variant="outline">
                    Practice
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="aspect-square"
                  onClick={() => {
                    // Remove from favorites
                  }}
                >
                  ♥
                </Button>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
} 