'use client'

import { useState, useTransition } from 'react'
import { cn } from '@/lib/utils'
import { CustomButton } from '@/components/custom/CustomButton'
import { useForm, FormProvider } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Users } from '@/lib/types/users'
import { Ban } from 'lucide-react'
import { regularEmailRegex } from '@/helpers/regularExpression'
import { signIn } from '@/services/auth/auth.services'
import { useAuth, UseForm } from '@/services/auth/state/auth-state'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { setCookie } from 'cookies-next'
import { useShallow } from 'zustand/shallow'

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [message, setMessage] = useState<string>('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<Users>()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = form

  const { setAuth } = useAuth(
    useShallow((state) => ({ setAuth: state.setUserInfo }))
  )

  const router = useRouter()

  const onSubmit = async ({ email, password }: Users): Promise<void> => {
    startTransition(async () => {
      console.log(email, password)
      try {
        const response = await signIn({ email, password })

        setAuth({
          ...response,
          email,
          password
        } as UseForm)

        setCookie('auth', response?.token)

        router.push('/backend/dashboard')
      } catch (error) {
        setMessage(error as string)
      }
    })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <div className='flex flex-col items-center gap-2 text-center'>
            <h1 className='text-2xl font-bold' aria-label='login-title'>
              Login to your account
            </h1>
            <p
              className='text-balance text-sm text-muted-foreground'
              aria-label='login-desc'
            >
              Enter your email below to login to your account
            </p>
          </div>

          {message && (
            <Alert className='border-red-500 bg-red-500/20'>
              <Ban className='h-4 w-4' />
              <AlertTitle>Note!</AlertTitle>
              <AlertDescription>
                {message === 'Unauthorized'
                  ? 'This account is not registered'
                  : message}
              </AlertDescription>
            </Alert>
          )}

          <div className='grid gap-6'>
            <Input
              id='email'
              title='Email'
              type='email'
              placeholder='email'
              {...register('email', {
                required: 'field required.',
                pattern: {
                  value: regularEmailRegex,
                  message: 'invalid email address'
                }
              })}
              hasError={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <div className='grid gap-2'>
              <Input
                title='Password'
                id='password'
                type='password'
                placeholder='Password'
                hasError={!!errors.password as boolean}
                errorMessage={errors.password?.message as string}
                {...register('password', {
                  required: 'field required.'
                })}
              />
            </div>
            <CustomButton
              isLoading={isPending}
              disabled={isPending}
              type='submit'
              className='w-full cursor-pointer'
            >
              Login
            </CustomButton>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
