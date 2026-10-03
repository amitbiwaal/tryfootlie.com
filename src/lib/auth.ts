import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const COOKIE = 'footly_admin'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD)
}

function secret(): string {
  const password = process.env.ADMIN_PASSWORD
  if (!password) throw new Error('ADMIN_PASSWORD is not set')
  // Without an explicit secret, derive one so that changing the password also ends every session.
  return (
    process.env.SESSION_SECRET ||
    createHash('sha256').update(`footly-session:${password}`).digest('hex')
  )
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

function safeEqual(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
}

export function verifyPassword(candidate: string): boolean {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  return safeEqual(candidate, password)
}

export async function createSession(): Promise<void> {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000
  const payload = String(expires)
  const store = await cookies()
  store.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  })
}

export async function destroySession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE)
}

export async function isAdmin(): Promise<boolean> {
  if (!isAuthConfigured()) return false
  const store = await cookies()
  const token = store.get(COOKIE)?.value
  if (!token) return false
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false
  if (!safeEqual(signature, sign(payload))) return false
  return Number(payload) > Date.now()
}

// Call at the top of every admin page and every admin action — layouts alone are not a guard.
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect('/admin/login')
}
