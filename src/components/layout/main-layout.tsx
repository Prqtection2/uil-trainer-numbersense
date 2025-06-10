'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { colors } from '@/lib/theme'
import { signOut, useSession } from 'next-auth/react'

const navItems = [
  { id: 'dashboard', href: '/', label: 'Dashboard' },
  { id: 'topics', href: '/topics', label: 'Topics' },
  { id: 'favorites', href: '/favorites', label: 'Favorites' },
]

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { user, setUser } = useStore()

  // Update store user when session changes
  React.useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id as string,
        name: session.user.name || 'User',
        role: 'user',
        progress: {
          elementary: 0,
          middle: 0,
          high: 0,
        },
        favorites: [],
        achievements: [],
        stats: {
          totalQuestions: 0,
          correctAnswers: 0,
          averageTime: 0,
          fastestTime: 0,
          slowestTime: 0,
          streakDays: 0,
        },
      })
    } else {
      setUser(null)
    }
  }, [session, setUser])

  const handleLogin = () => {
    router.push('/auth/signin')
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    setUser(null)
    router.push('/')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.primary[50] }}>
      <nav className="fixed top-0 z-50 w-full border-b backdrop-blur-sm" 
        style={{ 
          backgroundColor: `${colors.primary[50]}80`,
          borderColor: colors.primary[200]
        }}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold" style={{ color: colors.middle[500] }}>
              NumberSense
            </Link>
            <div className="hidden md:flex md:gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 text-sm transition-colors',
                    pathname === item.href
                      ? ''
                      : 'hover:text-middle-500'
                  )}
                  style={{ 
                    color: pathname === item.href ? colors.middle[500] : colors.primary[600]
                  }}
                >
                  {item.label}
                  {pathname === item.href && (
                    <div
                      className="absolute bottom-0 left-0 h-0.5 w-full"
                      style={{ backgroundColor: colors.middle[500] }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm" style={{ color: colors.primary[600] }}>
                  {session.user.name}
                </span>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  style={{
                    borderColor: colors.primary[200],
                    color: colors.primary[600]
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleLogin}
                style={{
                  backgroundColor: colors.middle[500],
                  color: 'white'
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
} 