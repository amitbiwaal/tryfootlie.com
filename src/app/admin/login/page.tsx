import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { isAdmin, isAuthConfigured } from '@/lib/auth'
import { site } from '@/lib/site'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = { title: 'Sign in' }

export default async function LoginPage() {
  if (await isAdmin()) redirect('/admin')

  return (
    <div className="login">
      <div className="card login-card">
        <Link className="brand" href="/">
          <span className="dot" aria-hidden="true" />
          {site.name} <small>Admin</small>
        </Link>
        <h1>Sign in</h1>
        {isAuthConfigured() ? (
          <LoginForm />
        ) : (
          <p className="alert alert--info">
            Admin login is not set up yet. Add an <code>ADMIN_PASSWORD</code> environment variable (Vercel → Project →
            Settings → Environment Variables), then redeploy.
          </p>
        )}
        <p className="hint">
          <Link href="/">← Back to site</Link>
        </p>
      </div>
    </div>
  )
}
