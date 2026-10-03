// Central site configuration. Change values here (or via env vars) and the whole site follows.

import { encodeNonAscii } from './text'

const DEFAULT_AFFILIATE_URL =
  'https://app.feetfinder.com/affiliate/link?af_id=97c365207f4d8-615933c06e600f70fe8-024240575f3229cc-1909bce247abe2cc48'

export const site = {
  name: 'Footly',
  tagline: 'Sell Feet Pics',
  domain: 'tryfootlie.com',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://tryfootlie.com').replace(/\/+$/, ''),
  title: 'Sell Feet Pics with Footly — Safe, Anonymous & Profitable',
  description:
    'Learn how to sell feet pics safely with Footly. Footly is the anonymous, secure platform to sell feet pics online, set your own prices, and get paid fast — no scams, no face required.',
  keywords: [
    'sell feet pics',
    'how to sell feet pics',
    'where to sell feet pics',
    'sell feet pics online',
    'sell feet pics safely',
    'best platform to sell feet pics',
    'make money selling feet pics',
    'feet pics to sell',
    'Footly',
  ],
  affiliateUrl: process.env.NEXT_PUBLIC_AFFILIATE_URL || DEFAULT_AFFILIATE_URL,
  // The third-party platform the affiliate buttons lead to. Used in the disclosure pages.
  partnerName: 'FeetFinder',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  defaultAuthor: 'Footly Guide',
  legalUpdated: 'October 2, 2026',
} as const

export const affiliateRel = 'nofollow sponsored noopener'

export const mainNav = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

export const footerNav = [
  {
    title: 'Guide',
    links: [
      { href: '/#features', label: 'Features' },
      { href: '/#how-it-works', label: 'How it works' },
      { href: '/#getting-started', label: 'Getting started' },
      { href: '/#faq', label: 'FAQ' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/feed.xml', label: 'RSS feed' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Use' },
      { href: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
      { href: '/disclaimer', label: 'Disclaimer' },
    ],
  },
] as const

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path
  // Slugs may contain non-Latin characters; sitemaps, feeds and JSON-LD need them percent-encoded.
  return `${site.url}${encodeNonAscii(path.startsWith('/') ? path : `/${path}`)}`
}
