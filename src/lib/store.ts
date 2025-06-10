import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MasteryLevel } from './constants/achievements'
import { TopicProgress, calculateOverallProgress } from './utils/progress'

export type Topic = {
  id: string
  name: string
  description: string
  level: 'elementary' | 'middle' | 'high'
  mastery: MasteryLevel
  attempts: number
  bestAccuracy: number
  bestTime: number
}

export type User = {
  id: string
  name: string
  role: 'admin' | 'user'
  progress: {
    elementary: number
    middle: number
    high: number
  }
  favorites: string[]
  achievements: string[]
  topicProgress: TopicProgress[]
  stats: {
    totalQuestions: number
    correctAnswers: number
    averageTime: number
    fastestTime: number
    slowestTime: number
    streakDays: number
  }
}

type State = {
  user: User | null
  topics: Topic[]
  setUser: (user: User | null) => void
  addTopic: (topic: Topic) => void
  updateTopicMastery: (topicId: string, level: MasteryLevel) => void
  addFavorite: (topicId: string) => void
  removeFavorite: (topicId: string) => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      user: null,
      topics: [],
      setUser: (user) => set({ user }),
      addTopic: (topic) => set((state) => ({ topics: [...state.topics, topic] })),
      updateTopicMastery: (topicId, level) =>
        set((state) => {
          if (!state.user) return state

          // Update topic progress
          const newTopicProgress = [...state.user.topicProgress]
          const existingIndex = newTopicProgress.findIndex(p => p.topicId === topicId)
          
          if (existingIndex >= 0) {
            newTopicProgress[existingIndex] = { topicId, level }
          } else {
            newTopicProgress.push({ topicId, level })
          }

          // Calculate new overall progress
          const newProgress = calculateOverallProgress(newTopicProgress)

          return {
            user: {
              ...state.user,
              topicProgress: newTopicProgress,
              progress: newProgress
            },
            topics: state.topics.map((t) =>
              t.id === topicId ? { ...t, mastery: level } : t
            ),
          }
        }),
      addFavorite: (topicId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                favorites: [...state.user.favorites, topicId],
              }
            : null,
        })),
      removeFavorite: (topicId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                favorites: state.user.favorites.filter((id) => id !== topicId),
              }
            : null,
        })),
    }),
    {
      name: 'number-sense-storage',
    }
  )
) 