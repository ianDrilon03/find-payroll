import { JSX } from 'react'
import { LoginForm } from './components/login-form'

export default async function SignIn(): Promise<JSX.Element> {
  return <LoginForm />
}
