import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Topic = {
  id: string
  name: string
  description: string
  level: 'elementary' | 'middle' | 'high'
  progress: number
  completed: number
  total: number
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
  updateProgress: (topicId: string, progress: number) => void
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
      updateProgress: (topicId, progress) =>
        set((state) => ({
          topics: state.topics.map((t) =>
            t.id === topicId ? { ...t, progress } : t
          ),
        })),
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