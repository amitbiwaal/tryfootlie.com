import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/text'

export function PostCover({ post }: { post: Pick<PostMeta, 'coverImage' | 'coverAlt' | 'title'> }) {
  if (post.coverImage) {
    // Cover images come from the CMS and can live on any host, so a plain <img> is used on purpose.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={post.coverImage} alt={post.coverAlt} loading="lazy" decoding="async" />
  }
  return (
    <span className="cover--placeholder" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    </span>
  )
}

export function PostCard({ post, headingLevel = 'h2' }: { post: PostMeta; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  return (
    <article className="post-card">
      <Link className="cover" href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
        <PostCover post={post} />
      </Link>
      <div className="body">
        {post.tags.length > 0 && (
          <div className="tag-row">
            {post.tags.slice(0, 2).map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <Heading>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </Heading>
        <p>{post.excerpt}</p>
        <p className="post-meta">
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          {post.publishedAt && ' · '}
          {post.readingMinutes} min read
        </p>
      </div>
    </article>
  )
}
