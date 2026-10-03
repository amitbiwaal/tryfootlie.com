// Small key/value storage layer used by the CMS (posts, contact messages, rate limits).
//
//   redis — Upstash Redis over REST. Used whenever the env vars are present (production on Vercel).
//   file  — a JSON file in .data/. Used for local development so the CMS works with zero setup.
//   none  — Vercel without Redis connected. Reads are empty, writes throw StorageNotConfiguredError.

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { Redis } from '@upstash/redis'

export type StorageKind = 'redis' | 'file' | 'none'

export interface KV {
  kind: StorageKind
  get<T>(key: string): Promise<T | null>
  set(key: string, value: unknown, ttlSeconds?: number): Promise<void>
  del(key: string): Promise<void>
  hgetall<T>(key: string): Promise<Record<string, T>>
  hset(key: string, field: string, value: unknown): Promise<void>
  hdel(key: string, field: string): Promise<void>
}

export class StorageNotConfiguredError extends Error {
  constructor() {
    super(
      'CMS storage is not connected. In Vercel, open Storage → Create Database → Upstash for Redis, connect it to this project, then redeploy.'
    )
    this.name = 'StorageNotConfiguredError'
  }
}

function redisEnv(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  return url && token ? { url, token } : null
}

export function storageKind(): StorageKind {
  if (redisEnv()) return 'redis'
  // Vercel's filesystem is read-only at runtime, so the file store only makes sense elsewhere.
  if (process.env.VERCEL) return 'none'
  return 'file'
}

/* ---------- Redis ---------- */

function createRedisKV(env: { url: string; token: string }): KV {
  const redis = new Redis({ url: env.url, token: env.token })
  return {
    kind: 'redis',
    async get<T>(key: string) {
      return (await redis.get<T>(key)) ?? null
    },
    async set(key, value, ttlSeconds) {
      if (ttlSeconds) await redis.set(key, value, { ex: ttlSeconds })
      else await redis.set(key, value)
    },
    async del(key) {
      await redis.del(key)
    },
    async hgetall<T>(key: string) {
      return ((await redis.hgetall(key)) ?? {}) as Record<string, T>
    },
    async hset(key, field, value) {
      await redis.hset(key, { [field]: value })
    },
    async hdel(key, field) {
      await redis.hdel(key, field)
    },
  }
}

/* ---------- File (local development) ---------- */

type FileData = {
  values: Record<string, unknown>
  hashes: Record<string, Record<string, unknown>>
}

const DATA_FILE = path.join(process.cwd(), '.data', 'cms.json')

async function readFileData(): Promise<FileData> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw) as Partial<FileData>
    return { values: parsed.values ?? {}, hashes: parsed.hashes ?? {} }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return { values: {}, hashes: {} }
    throw err
  }
}

async function writeFileData(data: FileData): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  const tmp = `${DATA_FILE}.${process.pid}.tmp`
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8')
  await fs.rename(tmp, DATA_FILE)
}

// Serialise writes so two concurrent saves can't clobber each other.
let fileQueue: Promise<unknown> = Promise.resolve()
function mutateFile(fn: (data: FileData) => void): Promise<void> {
  const run = fileQueue.then(async () => {
    const data = await readFileData()
    fn(data)
    await writeFileData(data)
  })
  fileQueue = run.catch(() => undefined)
  return run
}

const fileKV: KV = {
  kind: 'file',
  async get<T>(key: string) {
    const data = await readFileData()
    return (data.values[key] as T | undefined) ?? null
  },
  set: (key, value) => mutateFile((d) => void (d.values[key] = value)),
  del: (key) => mutateFile((d) => void delete d.values[key]),
  async hgetall<T>(key: string) {
    const data = await readFileData()
    return (data.hashes[key] ?? {}) as Record<string, T>
  },
  hset: (key, field, value) =>
    mutateFile((d) => {
      d.hashes[key] = { ...(d.hashes[key] ?? {}), [field]: value }
    }),
  hdel: (key, field) =>
    mutateFile((d) => {
      if (d.hashes[key]) delete d.hashes[key][field]
    }),
}

/* ---------- None ---------- */

const noneKV: KV = {
  kind: 'none',
  get: async () => null,
  hgetall: async () => ({}),
  set: async () => {
    throw new StorageNotConfiguredError()
  },
  del: async () => {
    throw new StorageNotConfiguredError()
  },
  hset: async () => {
    throw new StorageNotConfiguredError()
  },
  hdel: async () => {
    throw new StorageNotConfiguredError()
  },
}

let cached: KV | null = null

export function getKV(): KV {
  if (cached) return cached
  const env = redisEnv()
  if (env) cached = createRedisKV(env)
  else if (process.env.VERCEL) cached = noneKV
  else cached = fileKV
  return cached
}
