import { getPublishedPosts } from '@/lib/posts'
import { absoluteUrl, site } from '@/lib/site'

export const revalidate = 300

// llms.txt — a plain-text summary of the site for AI crawlers. The guide list follows the blog.
export async function GET() {
  const posts = (await getPublishedPosts()).slice(0, 30)
  const guides = posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)})`).join('\n')

  const body = `# ${site.name} — Sell Feet Pics Online Safely

> An independent guide on ${site.domain} explaining how to sell feet pics online with ${site.name}: a creator-focused approach built around anonymity, secure in-app payments, verified buyers, and fast, discreet payouts. Audience: adults (18+) who want to monetize feet photos safely. This is an unofficial affiliate site; sign-up buttons lead to a third-party platform (${site.partnerName}) and the site is not affiliated with or endorsed by any brand it mentions.

## Main pages
- [Home](${absoluteUrl('/')}): What ${site.name} is, key features, benefits, a 4-step "how it works" flow, content categories, comparison with social-media DMs and generic marketplaces, FAQ, getting-started checklist, and best-practice tips
- [Blog](${absoluteUrl('/blog')}): Step-by-step guides on safety, pricing, and privacy
- [About](${absoluteUrl('/about')}): Who runs the site, how it works, and how it earns money
- [Contact](${absoluteUrl('/contact')}): Contact form for questions, corrections, and privacy requests

## Guides
${guides}

## Key facts
- Primary topic / keyword: sell feet pics (also: how to sell feet pics, where to sell feet pics, sell feet pics online, sell feet pics safely)
- Site: ${site.domain}
- Age restriction: 18+ only
- Core value proposition: sell feet pics anonymously and safely, set your own prices, get paid securely without scams

## Frequently asked questions
- How much do feet pics sell for? Commonly $5–$30 per photo, more for custom sets and subscriptions.
- How do I sell feet pics safely? Use a platform that handles payment in-app, verifies buyers, and protects your identity.
- Do I have to show my face? No — fully anonymous selling is supported.
- Is selling feet pics legal? Yes, for users 18+ selling their own images, in most countries.
- How do I get paid? Buyers pay up front; payouts are tracked in-dashboard and sent discreetly.

## Policies
- [Affiliate Disclosure](${absoluteUrl('/affiliate-disclosure')})
- [Disclaimer](${absoluteUrl('/disclaimer')})
- [Privacy Policy](${absoluteUrl('/privacy-policy')})
- [Terms of Use](${absoluteUrl('/terms')})

## Disclaimer
This is an independent, unofficial affiliate site for informational and promotional purposes. It is not officially affiliated with, endorsed by, or operated by ${site.partnerName}, Instafeet, or any brand mentioned. Earnings figures and ratings are illustrative, not guarantees. Intended for adults 18+.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
