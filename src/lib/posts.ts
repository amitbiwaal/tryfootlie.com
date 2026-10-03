import { randomUUID } from 'node:crypto'
import { unstable_cache } from 'next/cache'
import { getKV } from './kv'
import { htmlToText, sanitizePostHtml } from './sanitize'
import { seedPosts } from './seed-posts'
import { site } from './site'
import { readingMinutes, slugify, tagSlug, truncate } from './text'

export type PostStatus = 'draft' | 'published'

export interface PostMeta {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string
  coverAlt: string
  tags: string[]
  author: string
  status: PostStatus
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  metaTitle: string
  metaDescription: string
  readingMinutes: number
}

export interface Post extends PostMeta {
  content: string
}

export interface PostInput {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  coverAlt: string
  tags: string[]
  author: string
  status: PostStatus
  metaTitle: string
  metaDescription: string
}

const META_KEY = 'cms:posts:meta'
const SEEDED_KEY = 'cms:seeded'
const postKey = (id: string) => `cms:post:${id}`

export const POSTS_TAG = 'posts'

function toMeta(post: Post): PostMeta {
  const meta: Partial<Post> = { ...post }
  delete meta.content
  return meta as PostMeta
}

function byNewest(a: PostMeta, b: PostMeta): number {
  const da = a.publishedAt ?? a.updatedAt
  const db = b.publishedAt ?? b.updatedAt
  return db.localeCompare(da)
}

/* ---------- Seeding ---------- */

async function isSeeded(): Promise<boolean> {
  const kv = getKV()
  if (kv.kind === 'none') return false
  return Boolean(await kv.get(SEEDED_KEY))
}

// Copies the starter posts into the store once, so they become ordinary editable posts.
export async function ensureSeeded(): Promise<void> {
  const kv = getKV()
  if (kv.kind === 'none' || (await isSeeded())) return
  for (const post of seedPosts) {
    await kv.set(postKey(post.id), post)
    await kv.hset(META_KEY, post.id, toMeta(post))
  }
  await kv.set(SEEDED_KEY, new Date().toISOString())
}

/* ---------- Reads (uncached — used by the admin) ---------- */

export async function listPostMeta(): Promise<PostMeta[]> {
  if (!(await isSeeded())) return seedPosts.map(toMeta).sort(byNewest)
  const all = await getKV().hgetall<PostMeta>(META_KEY)
  return Object.values(all).sort(byNewest)
}

export async function getPostById(id: string): Promise<Post | null> {
  if (!(await isSeeded())) return seedPosts.find((p) => p.id === id) ?? null
  return getKV().get<Post>(postKey(id))
}

/* ---------- Reads (cached — used by the public site) ---------- */

export const getPublishedPosts = unstable_cache(
  async (): Promise<PostMeta[]> => {
    const all = await listPostMeta()
    return all.filter((p) => p.status === 'published')
  },
  ['published-posts'],
  { tags: [POSTS_TAG], revalidate: 300 }
)

export const getPublishedPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    const all = await listPostMeta()
    const meta = all.find((p) => p.slug === slug && p.status === 'published')
    if (!meta) return null
    return getPostById(meta.id)
  },
  ['published-post-by-slug'],
  { tags: [POSTS_TAG], revalidate: 300 }
)

export async function getAllTags(): Promise<{ name: string; slug: string; count: number }[]> {
  const posts = await getPublishedPosts()
  const map = new Map<string, { name: string; slug: string; count: number }>()
  for (const post of posts) {
    for (const name of post.tags) {
      const slug = tagSlug(name)
      if (!slug) continue
      const entry = map.get(slug) ?? { name, slug, count: 0 }
      entry.count += 1
      map.set(slug, entry)
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

/* ---------- Writes ---------- */

export class ValidationError extends Error {}

function cleanUrl(value: string): string {
  const url = value.trim()
  if (!url) return ''
  if (url.startsWith('/') && !url.startsWith('//')) return url
  try {
    const parsed = new URL(url)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.toString()
  } catch {
    // fall through
  }
  throw new ValidationError('Cover image must be a full http(s) URL or an uploaded image.')
}

function cleanTags(tags: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of tags) {
    const name = raw.trim().replace(/\s+/g, ' ').slice(0, 40)
    const key = tagSlug(name)
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(name)
  }
  return out.slice(0, 8)
}

export async function savePost(input: PostInput): Promise<Post> {
  const kv = getKV()
  await ensureSeeded()

  const title = input.title.trim().slice(0, 160)
  if (!title) throw new ValidationError('Please add a title.')

  const content = sanitizePostHtml(input.content)
  const text = htmlToText(content)
  if (input.status === 'published' && !text && !content.includes('<img')) {
    throw new ValidationError('Write some content before publishing.')
  }

  const existing = input.id ? await kv.get<Post>(postKey(input.id)) : null
  if (input.id && !existing) throw new ValidationError('This post no longer exists.')
  const id = existing?.id ?? randomUUID()

  // Slugs must be unique because they are the public URL.
  const metas = Object.values(await kv.hgetall<PostMeta>(META_KEY))
  const taken = new Set(metas.filter((m) => m.id !== id).map((m) => m.slug))
  const base = slugify(input.slug || title) || 'post'
  let slug = base
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`

  const now = new Date().toISOString()
  const post: Post = {
    id,
    slug,
    title,
    excerpt: input.excerpt.trim().slice(0, 320) || truncate(text, 160),
    content,
    coverImage: cleanUrl(input.coverImage),
    coverAlt: input.coverAlt.trim().slice(0, 200),
    tags: cleanTags(input.tags),
    author: input.author.trim().slice(0, 80) || site.defaultAuthor,
    status: input.status,
    publishedAt:
      input.status === 'published' ? (existing?.publishedAt ?? now) : (existing?.publishedAt ?? null),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    metaTitle: input.metaTitle.trim().slice(0, 120),
    metaDescription: input.metaDescription.trim().slice(0, 320),
    readingMinutes: readingMinutes(text),
  }

  await kv.set(postKey(id), post)
  await kv.hset(META_KEY, id, toMeta(post))
  return post
}

export async function deletePost(id: string): Promise<void> {
  const kv = getKV()
  await ensureSeeded()
  await kv.del(postKey(id))
  await kv.hdel(META_KEY, id)
}
