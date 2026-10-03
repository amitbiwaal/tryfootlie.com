import type { Metadata, Viewport } from 'next'
import { site } from '@/lib/site'
import './globals.css'
import './pages.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.defaultAuthor }],
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website',
    siteName: `${site.name} Guide — ${site.domain}`,
    locale: 'en_US',
    url: site.url,
    title: site.title,
    description:
      'Footly is the safe, anonymous way to sell feet pics online. Set your prices, protect your identity, and get paid fast. See how to start selling feet pics today.',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description:
      'Footly is the safe, anonymous platform to sell feet pics online. Set your prices, stay private, and get paid fast.',
  },
  alternates: {
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: `${site.name} Blog` }] },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
