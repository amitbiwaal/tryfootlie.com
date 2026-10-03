import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleView } from '@/components/ArticleView'
import { CtaLink } from '@/components/CtaLink'
import { JsonLd } from '@/components/JsonLd'
import { PostCard } from '@/components/PostCard'
import { pageMetadata } from '@/lib/metadata'
import { getPublishedPostBySlug, getPublishedPosts } from '@/lib/posts'
import { absoluteUrl, site } from '@/lib/site'
import { decodeParam } from '@/lib/text'

export const revalidate = 300

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPublishedPosts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = decodeParam((await params).slug)
  const post = await getPublishedPostBySlug(slug)
  if (!post) return {}
  return pageMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt ?? undefined,
    modifiedTime: post.updatedAt,
    image: post.coverImage ? { url: post.coverImage, alt: post.coverAlt } : undefined,
  })
}

export default async function PostPage({ params }: Params) {
  const slug = decodeParam((await params).slug)
  const post = await getPublishedPostBySlug(slug)
  if (!post) notFound()

  const others = (await getPublishedPosts()).filter((p) => p.id !== post.id)
  const sameTopic = others.filter((p) => p.tags.some((t) => post.tags.includes(t)))
  const related = [...sameTopic, ...others.filter((p) => !sameTopic.includes(p))].slice(0, 3)
  const url = absoluteUrl(`/blog/${post.slug}`)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.metaDescription || post.excerpt,
          url,
          mainEntityOfPage: url,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          author: { '@type': 'Organization', name: post.author, url: absoluteUrl('/about') },
          publisher: {
            '@type': 'Organization',
            name: site.name,
            logo: { '@type': 'ImageObject', url: absoluteUrl('/icon.svg') },
          },
          image: post.coverImage ? absoluteUrl(post.coverImage) : absoluteUrl('/opengraph-image'),
          keywords: post.tags.join(', '),
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
          ],
        }}
      />

      <ArticleView post={post} />

      <div className="wrap article-cta">
        <div className="article-body">
          <aside className="cta-box" aria-label="Get started">
            <h2>Ready to start selling?</h2>
            <p>
              Set your own prices, stay anonymous, and get paid through secure checkout. Free to join, 18+ only.
            </p>
            <CtaLink className="btn">Start selling on {site.name}</CtaLink>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related">
          <div className="wrap">
            <h2>Keep reading</h2>
            <div className="post-grid">
              {related.map((p) => (
                <PostCard key={p.id} post={p} headingLevel="h3" />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
