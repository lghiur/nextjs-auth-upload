'use client'
 
import { useFormState } from 'react-dom'
import { login } from '@/actions/auth'
import { SubmitButton } from '@/app/components/functional/submit-button'
 
export function LoginForm() {
  const [state, action] = useFormState(login, undefined)
 
  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
 
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <SubmitButton btnName='Login' />

      {state?.message && <p>{state.message}</p>}
    </form>
  )
}