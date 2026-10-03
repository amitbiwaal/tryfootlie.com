import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { formatDate, tagSlug } from '@/lib/text'

// The article itself — shared by the public post page and the admin preview.
export function ArticleView({ post, linkTags = true }: { post: Post; linkTags?: boolean }) {
  const published = post.publishedAt
  const showUpdated = published && post.updatedAt.slice(0, 10) > published.slice(0, 10)

  return (
    <article>
      <header className="article-head">
        <div className="wrap">
          <div className="inner">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog">Blog</Link>
            </nav>
            {post.tags.length > 0 && (
              <div className="tag-row">
                {post.tags.map((tag) =>
                  linkTags ? (
                    <Link className="tag" key={tag} href={`/blog/tag/${tagSlug(tag)}`}>
                      {tag}
                    </Link>
                  ) : (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  )
                )}
              </div>
            )}
            <h1>{post.title}</h1>
            {post.excerpt && <p className="lead">{post.excerpt}</p>}
            <p className="post-meta">
              By {post.author}
              {published && (
                <>
                  {' · '}
                  <time dateTime={published}>{formatDate(published)}</time>
                </>
              )}
              {' · '}
              {post.readingMinutes} min read
              {showUpdated && (
                <>
                  {' · Updated '}
                  <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </>
              )}
            </p>
          </div>
        </div>
      </header>

      <div className="wrap article-wrap">
        {post.coverImage && (
          <div className="article-cover">
            {/* CMS images can live on any host, so a plain <img> is used on purpose. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.coverAlt} decoding="async" fetchPriority="high" />
          </div>
        )}
        {/* Content is sanitised with an allow-list every time a post is saved (lib/sanitize.ts). */}
        <div className="article-body prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  )
}
