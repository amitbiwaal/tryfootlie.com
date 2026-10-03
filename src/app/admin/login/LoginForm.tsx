'use client'

import { useActionState } from 'react'
import { loginAction, type LoginState } from '../actions'

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, null)

  return (
    <form className="form" action={action}>
      {state?.error && (
        <p className="alert alert--err" role="alert">
          {state.error}
        </p>
      )}
      <div className="field">
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          className="input"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
        />
      </div>
      <button className="btn" type="submit" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
