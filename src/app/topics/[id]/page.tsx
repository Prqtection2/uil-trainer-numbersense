'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { colors } from '@/lib/theme'
import { numericalTricksContent } from '@/lib/topics'
import Link from 'next/link'

export default function TopicPage() {
  const params = useParams()
  const topicId = params.id as string
  const content = numericalTricksContent[topicId]

  if (!content) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold" style={{ color: colors.primary[900] }}>
          Topic not found
        </h1>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: colors.primary[900] }}>
          {content.title}
        </h1>
        <Link href={`/practice?topic=${topicId}`}>
          <Button
            style={{
              backgroundColor: colors.primary[500],
              color: 'white'
            }}
          >
            Start Practice
          </Button>
        </Link>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm space-y-6">
        {/* Theory section */}
        <div>
          <h2 className="text-lg font-semibold mb-4" style={{ color: colors.primary[700] }}>
            Theory
          </h2>
          <div className="prose max-w-none" style={{ color: colors.primary[600] }}>
            {content.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < paragraph.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        {/* Examples section */}
        <div>
          <h2 className="text-lg font-semibold mb-4" style={{ color: colors.primary[700] }}>
            Examples
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.examples.map((example, index) => (
              <div
                key={index}
                className="rounded-lg border p-4"
                style={{ borderColor: colors.primary[200], backgroundColor: colors.primary[50] }}
              >
                <p className="font-mono text-center" style={{ color: colors.primary[900] }}>
                  {example}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Practice button */}
        <div className="flex justify-center pt-4">
          <Link href={`/practice?topic=${topicId}`} className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto"
              style={{
                backgroundColor: colors.primary[500],
                color: 'white'
              }}
            >
              Practice This Topic
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 