import { BlogList } from '@/components/BlogList'
import { JsonLd } from '@/components/JsonLd'
import { pageMetadata } from '@/lib/metadata'
import { getAllTags, getPublishedPosts } from '@/lib/posts'
import { absoluteUrl, site } from '@/lib/site'

export const revalidate = 300

const description =
  'Guides on how to sell feet pics online: safety checklists, pricing advice, privacy tips, and best practices for new and experienced sellers.'

export const metadata = pageMetadata({
  title: 'Blog — Guides to Selling Feet Pics',
  description,
  path: '/blog',
})

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getPublishedPosts(), getAllTags()])

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${site.name} Blog`,
          url: absoluteUrl('/blog'),
          description,
          blogPost: posts.slice(0, 20).map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: absoluteUrl(`/blog/${p.slug}`),
            datePublished: p.publishedAt,
          })),
        }}
      />
      <div className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Blog</span>
          <h1>Guides to selling feet pics, safely</h1>
          <p className="lead">
            Practical advice on safety, pricing, and privacy — written to help you start well and avoid the common
            mistakes.
          </p>
        </div>
      </div>
      <div className="page-body">
        <div className="wrap">
          <BlogList posts={posts} tags={tags} />
        </div>
      </div>
    </>
  )
}
