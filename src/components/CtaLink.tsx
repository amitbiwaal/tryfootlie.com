import type { ReactNode } from 'react'
import { affiliateRel, site } from '@/lib/site'

// Every outbound "start selling" button goes through here so the link and its rel stay consistent.
export function CtaLink({
  children,
  className = 'btn',
  arrow = true,
}: {
  children: ReactNode
  className?: string
  arrow?: boolean
}) {
  return (
    <a className={className} href={site.affiliateUrl} target="_blank" rel={affiliateRel}>
      {children}
      {arrow && (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      )}
    </a>
  )
}
