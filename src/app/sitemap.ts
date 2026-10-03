import type { MetadataRoute } from 'next'
import { getAllTags, getPublishedPosts } from '@/lib/posts'
import { absoluteUrl } from '@/lib/site'

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags] = await Promise.all([getPublishedPosts(), getAllTags()])
  const latest = posts[0]?.updatedAt

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1, lastModified: latest },
    { url: absoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.8, lastModified: latest },
    { url: absoluteUrl('/about'), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/contact'), changeFrequency: 'yearly', priority: 0.4 },
    { url: absoluteUrl('/affiliate-disclosure'), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/disclaimer'), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/privacy-policy'), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/terms'), changeFrequency: 'yearly', priority: 0.2 },
  ]

  return [
    ...staticPages,
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...tags.map((tag) => ({
      url: absoluteUrl(`/blog/tag/${tag.slug}`),
      changeFrequency: 'weekly' as const,
      priority: 0.3,
    })),
  ]
}
