import type { Metadata } from 'next'
import { site } from './site'

// Builds complete metadata for an inner page. Next merges `openGraph` shallowly, so each page has
// to restate the shared fields — this keeps that in one place.
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
}: {
  title: string
  description: string
  path: string
  image?: { url: string; alt?: string }
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
}): Metadata {
  const images = image ? [{ url: image.url, alt: image.alt || title }] : undefined
  return {
    title,
    description,
    alternates: { canonical: path },
    // Leaving the key out (rather than setting it to undefined) keeps the site-wide robots default.
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      siteName: `${site.name} Guide — ${site.domain}`,
      locale: 'en_US',
      url: path,
      title,
      description,
      ...(images ? { images } : {}),
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  }
}
