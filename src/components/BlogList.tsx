'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo, useState } from 'react'
import type { PostMeta } from '@/lib/posts'
import { PostCard } from './PostCard'

type Tag = { name: string; slug: string; count: number }
type Props = { posts: PostMeta[]; tags: Tag[] }

const PAGE_SIZE = 12

const toWords = (text: string) => text.toLowerCase().split(/[^\p{L}\p{M}\p{N}]+/u).filter(Boolean)

// Every search word must appear in the post's title, summary, SEO description or tags. A word also
// counts when it merely extends one of the post's words, so "lighting" finds "light".
function matches(post: PostMeta, query: string): boolean {
  const words = toWords(`${post.title} ${post.excerpt} ${post.metaDescription} ${post.tags.join(' ')}`)
  const haystack = words.join(' ')
  return toWords(query).every(
    (term) => haystack.includes(term) || words.some((word) => word.length >= 4 && term.startsWith(word))
  )
}

function BlogListInner({ posts, tags, initialQuery }: Props & { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(
    () => (query.trim() ? posts.filter((p) => matches(p, query)) : posts),
    [posts, query]
  )

  function onChange(value: string) {
    setQuery(value)
    setVisible(PAGE_SIZE)
    // Keep the URL shareable without triggering a navigation.
    const url = new URL(window.location.href)
    if (value.trim()) url.searchParams.set('q', value)
    else url.searchParams.delete('q')
    window.history.replaceState(null, '', url)
  }

  return (
    <>
      <div className="blog-tools">
        <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label className="sr-only" htmlFor="blog-search">
            Search articles
          </label>
          <input
            id="blog-search"
            className="input"
            type="search"
            name="q"
            placeholder="Search articles…"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="off"
          />
        </form>
        {tags.length > 0 && (
          <div className="tag-row" aria-label="Browse by topic">
            {tags.map((tag) => (
              <Link className="tag" key={tag.slug} href={`/blog/tag/${tag.slug}`}>
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="empty" role="status">
          {posts.length === 0 ? 'No articles yet — check back soon.' : `No articles match “${query}”.`}
        </p>
      ) : (
        <div className="post-grid">
          {filtered.slice(0, visible).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {filtered.length > visible && (
        <div className="more-row">
          <button type="button" className="btn btn--ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Show more articles
          </button>
        </div>
      )}
    </>
  )
}

function BlogListWithParams(props: Props) {
  const params = useSearchParams()
  return <BlogListInner {...props} initialQuery={params.get('q') ?? ''} />
}

// The fallback is the full unfiltered list, so the prerendered HTML still contains every article.
export function BlogList(props: Props) {
  return (
    <Suspense fallback={<BlogListInner {...props} initialQuery="" />}>
      <BlogListWithParams {...props} />
    </Suspense>
  )
}
