'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="wrap notfound">
      <h1>Something went wrong</h1>
      <p className="lead">Sorry — this page failed to load. Please try again.</p>
      <div className="actions">
        <button className="btn" type="button" onClick={reset}>
          Try again
        </button>
        <Link className="btn btn--ghost" href="/">
          Back to home
        </Link>
      </div>
    </div>
  )
}
