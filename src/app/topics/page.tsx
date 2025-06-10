'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { colors } from '@/lib/theme'
import { units, numericalTricksContent } from '@/lib/topics'
import { MasteryBadge } from '@/components/ui/mastery-badge'
import { MasteryLevel } from '@/lib/constants/achievements'
import { useSession } from 'next-auth/react'
import { CollapsibleSection } from '@/components/ui/collapsible-section'

interface TopicStats {
  level: MasteryLevel
  accuracy: number
  avgTime: number
  attempts: number
}

// Helper function to group topics by their prefix (e.g., "1.1", "1.2.1")
function groupTopicsByPrefix(topics: any[]) {
  const groups: Record<string, any[]> = {}
  
  topics.forEach(topic => {
    const name = topic.name
    const match = name.match(/Topic (\d+\.\d+(?:\.\d+)?) -/)
    if (match) {
      const prefix = match[1]
      const mainPrefix = prefix.split('.').slice(0, 2).join('.')
      if (!groups[mainPrefix]) {
        groups[mainPrefix] = []
      }
      groups[mainPrefix].push(topic)
    }
  })

  return groups
}

const getTopicTitle = (prefix: string) => {
  switch (prefix) {
    case '1.1':
      return 'Topic 1.1 - FOIL When Multiplying'
    case '1.2':
      return 'Topic 1.2 - Multiplying: The Basics'
    default:
      return `Topic ${prefix}`
  }
}

export default function TopicsPage() {
  const searchParams = useSearchParams()
  const level = searchParams.get('level') || 'elementary'
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [topicStats, setTopicStats] = useState<Record<string, TopicStats>>({})
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user?.id) {
      fetch('/api/stats/all')
        .then(res => res.json())
        .then(stats => {
          const formattedStats: Record<string, TopicStats> = {}
          stats.forEach((stat: any) => {
            formattedStats[stat.topicId] = {
              level: stat.level,
              accuracy: stat.accuracy,
              avgTime: stat.avgTime,
              attempts: stat.attempts
            }
          })
          setTopicStats(formattedStats)
        })
    }
  }, [session?.user?.id])

  const levelColor = {
    elementary: colors.elementary[500],
    middle: colors.middle[500],
    high: colors.high[500]
  }[level] || colors.primary[500]

  const renderTopic = (topic: any) => {
    const stats = topicStats[topic.id]
    return (
      <div
        key={topic.id}
        className="block rounded-md border p-3 transition-colors hover:bg-gray-50"
        style={{ borderColor: colors.primary[200] }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium" style={{ color: colors.primary[900] }}>
              {topic.name}
            </h3>
            <p className="mt-1 text-sm" style={{ color: colors.primary[600] }}>
              {topic.description}
            </p>
          </div>
          {stats && (
            <MasteryBadge level={stats.level} />
          )}
        </div>
        {stats && (
          <div className="mt-2 grid grid-cols-3 gap-2 text-sm text-gray-500">
            <div>
              <span>Accuracy: </span>
              <span className="font-medium">{Math.round(stats.accuracy)}%</span>
            </div>
            <div>
              <span>Avg Time: </span>
              <span className="font-medium">{Math.round(stats.avgTime)}s</span>
            </div>
            <div>
              <span>Attempts: </span>
              <span className="font-medium">{stats.attempts}</span>
            </div>
          </div>
        )}
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
    )
  }

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

      {units.map((unit) => {
        const filteredTopics = unit.topics.filter(topic => topic.level === level)
        const topicGroups = groupTopicsByPrefix(filteredTopics)
        
        return (
          <CollapsibleSection
            key={unit.id}
            title={unit.name}
            level={1}
          >
            <div className="mt-4 space-y-4">
              {Object.entries(topicGroups).map(([prefix, topics]) => {
                const mainTopic = topics[0]
                const title = getTopicTitle(prefix)

                return (
                  <CollapsibleSection
                    key={prefix}
                    title={title}
                    level={2}
                    defaultExpanded={false}
                  >
                    <div className="mt-2 space-y-2">
                      {topics.map(topic => renderTopic(topic))}
                    </div>
                  </CollapsibleSection>
                )
              })}
            </div>
          </CollapsibleSection>
        )
      })}

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