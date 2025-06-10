'use client'

import * as React from 'react'
import { colors } from '@/lib/theme'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl"
        style={{ maxWidth: '90vw', maxHeight: '90vh', width: '500px' }}
      >
        {title && (
          <h2 className="mb-4 text-xl font-semibold" style={{ color: colors.primary[900] }}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </>
  )
} 