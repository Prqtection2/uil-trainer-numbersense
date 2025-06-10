'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { colors } from '@/lib/theme'
import { units, numericalTricksContent } from '@/lib/topics'

export default function TopicsPage() {
  const searchParams = useSearchParams()
  const level = searchParams.get('level') || 'elementary'
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const levelColor = {
    elementary: colors.elementary[500],
    middle: colors.middle[500],
    high: colors.high[500]
  }[level] || colors.primary[500]

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold capitalize" style={{ color: colors.primary[900] }}>
          {level} School Topics
        </h1>
        <div className="flex gap-2">
          {['elementary', 'middle', 'high'].map((l) => (
            <Link key={l} href={`/topics?level=${l}`}>
              <Button
                variant={l === level ? 'default' : 'outline'}
                className="capitalize"
                style={l === level ? {
                  backgroundColor: colors[l][500],
                  color: 'white'
                } : {
                  borderColor: colors[l][500],
                  color: colors[l][500]
                }}
              >
                {l}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {units.map((unit) => (
        <div
          key={unit.id}
          className="rounded-lg bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold" style={{ color: colors.primary[900] }}>
            {unit.name}
          </h2>
          <div className="mt-4 space-y-2">
            {unit.topics
              .filter(topic => topic.level === level)
              .map((topic) => (
                <div
                  key={topic.id}
                  className="block rounded-md border p-3 transition-colors hover:bg-gray-50"
                  style={{ borderColor: colors.primary[200] }}
                >
                  <h3 className="font-medium" style={{ color: colors.primary[900] }}>
                    {topic.name}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: colors.primary[600] }}>
                    {topic.description}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedTopic(topic.id)}
                      style={{
                        borderColor: levelColor,
                        color: levelColor
                      }}
                    >
                      Learn
                    </Button>
                    <Link href={`/practice?topic=${topic.id}&level=${level}`}>
                      <Button
                        style={{
                          backgroundColor: levelColor,
                          color: 'white'
                        }}
                      >
                        Practice
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <Modal
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        title={selectedTopic ? numericalTricksContent[selectedTopic]?.title : ''}
      >
        <div className="space-y-6">
          {selectedTopic && (
            <>
              <div className="prose max-w-none" style={{ color: colors.primary[600] }}>
                {numericalTricksContent[selectedTopic].content.split('\n\n').map((paragraph, i) => (
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

              <div>
                <h3 className="mb-4 text-lg font-semibold" style={{ color: colors.primary[700] }}>
                  Examples
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {numericalTricksContent[selectedTopic].examples.map((example, index) => (
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

              <div className="flex justify-end">
                <Link href={`/practice?topic=${selectedTopic}&level=${level}`}>
                  <Button
                    style={{
                      backgroundColor: levelColor,
                      color: 'white'
                    }}
                  >
                    Start Practice
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
} 