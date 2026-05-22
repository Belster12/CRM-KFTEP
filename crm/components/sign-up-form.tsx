'use client'

import { signUp } from '@/app/action/auth'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Link from 'next/link'
import { useActionState } from 'react'

const initialState = { error: '' };

export default function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [state, formAction] = useActionState
    (signUp, initialState);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Sign up
          </CardTitle>

          <CardDescription>
            Create a new account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">
                  Password
                </Label>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>

              {state?.error && (
                <p className="text-sm text-red-500">
                  {state.error}
                </p>
              )}

              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}

              <Link
                href="/auth/login"
                className="underline underline-offset-4"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}