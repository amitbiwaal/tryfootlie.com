import type { MetadataRoute } from 'next'
import { absoluteUrl, site } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/admin', '/api/']
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      // Common AI / LLM crawlers (explicitly allowed, as on the original site).
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
        ],
        allow: '/',
        disallow,
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: site.url,
  }
}
