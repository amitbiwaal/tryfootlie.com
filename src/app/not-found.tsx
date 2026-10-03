import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <div className="wrap notfound">
          <p className="code" aria-hidden="true">
            404
          </p>
          <h1 className="sr-only">Page not found</h1>
          <h2>We can&apos;t find that page</h2>
          <p className="lead">The link may be out of date, or the page may have moved.</p>
          <div className="actions">
            <Link className="btn" href="/">
              Back to home
            </Link>
            <Link className="btn btn--ghost" href="/blog">
              Read the blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
