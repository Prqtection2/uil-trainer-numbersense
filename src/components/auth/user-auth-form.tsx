'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isRegister?: boolean
}

export function UserAuthForm({
  className,
  isRegister,
  ...props
}: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(event.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    try {
      if (isRegister) {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            name,
          }),
        })

        if (!res.ok) {
          throw new Error(await res.text())
        }

        const signInResult = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (signInResult?.error) {
          setError('Invalid credentials')
          return
        }

        router.push('/')
      } else {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          setError('Invalid credentials')
          return
        }

        router.push('/')
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Something went wrong')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {isRegister && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                name="name"
                required
                className="border-input bg-background"
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              required
              className="border-input bg-background"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete={isRegister ? "new-password" : "current-password"}
              disabled={isLoading}
              name="password"
              required
              className="border-input bg-background"
            />
          </div>
          {error && (
            <div className="text-sm font-medium text-red-500">
              {error}
            </div>
          )}
          <Button disabled={isLoading} className="w-full">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isRegister ? 'Create account' : 'Sign in'}
          </Button>
        </div>
      </form>
    </div>
  )
} 