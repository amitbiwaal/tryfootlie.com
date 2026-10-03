import { createHash } from 'node:crypto'
import { headers } from 'next/headers'
import { getKV } from './kv'

type Bucket = { count: number; resetAt: number }

// Fallback for when no shared store is connected. Per-instance only, so best effort.
const memory = new Map<string, Bucket>()

async function bucketKey(scope: string): Promise<string> {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  // Only a truncated hash of the IP is stored, never the address itself.
  const hash = createHash('sha256').update(ip).digest('hex').slice(0, 24)
  return `cms:rl:${scope}:${hash}`
}

async function read(key: string): Promise<Bucket | null> {
  const kv = getKV()
  const bucket = kv.kind === 'none' ? (memory.get(key) ?? null) : await kv.get<Bucket>(key)
  return bucket && bucket.resetAt > Date.now() ? bucket : null
}

// The limiter must never take the site down with it: if the store is unreachable, fail open.
async function failOpen<T>(fallback: T, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    console.error('Rate limiter error', err)
    return fallback
  }
}

export function isLimited(scope: string, limit: number): Promise<boolean> {
  return failOpen(false, async () => {
    const bucket = await read(await bucketKey(scope))
    return Boolean(bucket && bucket.count >= limit)
  })
}

export function recordHit(scope: string, windowMs: number): Promise<void> {
  return failOpen(undefined, async () => {
    const key = await bucketKey(scope)
    const existing = await read(key)
    const bucket: Bucket = {
      count: (existing?.count ?? 0) + 1,
      resetAt: existing?.resetAt ?? Date.now() + windowMs,
    }
    const kv = getKV()
    if (kv.kind === 'none') memory.set(key, bucket)
    else await kv.set(key, bucket, Math.max(1, Math.ceil((bucket.resetAt - Date.now()) / 1000)))
  })
}

export function clearHits(scope: string): Promise<void> {
  return failOpen(undefined, async () => {
    const key = await bucketKey(scope)
    const kv = getKV()
    if (kv.kind === 'none') memory.delete(key)
    else await kv.del(key)
  })
}
