import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/PostCard'
import { pageMetadata } from '@/lib/metadata'
import { getAllTags, getPublishedPosts } from '@/lib/posts'
import { decodeParam, tagSlug } from '@/lib/text'

export const revalidate = 300

type Params = { params: Promise<{ tag: string }> }

export async function generateStaticParams() {
  return (await getAllTags()).map((t) => ({ tag: t.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const tag = decodeParam((await params).tag)
  const found = (await getAllTags()).find((t) => t.slug === tag)
  if (!found) return {}
  return pageMetadata({
    title: `${found.name} — Articles`,
    description: `Articles about ${found.name.toLowerCase()} for people who want to sell feet pics online safely.`,
    path: `/blog/tag/${found.slug}`,
  })
}

export default async function TagPage({ params }: Params) {
  const tag = decodeParam((await params).tag)
  const [tags, posts] = await Promise.all([getAllTags(), getPublishedPosts()])
  const current = tags.find((t) => t.slug === tag)
  if (!current) notFound()

  const tagged = posts.filter((p) => p.tags.some((t) => tagSlug(t) === tag))

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link>
            <span aria-hidden="true">/</span>
            <span>{current.name}</span>
          </nav>
          <span className="eyebrow">Topic</span>
          <h1>{current.name}</h1>
          <p className="lead">
            {tagged.length} {tagged.length === 1 ? 'article' : 'articles'} on {current.name.toLowerCase()}.
          </p>
        </div>
      </div>
      <div className="page-body">
        <div className="wrap">
          <div className="blog-tools">
            <div className="tag-row" aria-label="Browse by topic">
              <Link className="tag" href="/blog">
                All articles
              </Link>
              {tags.map((t) => (
                <Link
                  className="tag"
                  key={t.slug}
                  href={`/blog/tag/${t.slug}`}
                  aria-current={t.slug === tag ? 'page' : undefined}
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="post-grid">
            {tagged.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
