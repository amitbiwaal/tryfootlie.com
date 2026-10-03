'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { mainNav, site } from '@/lib/site'
import { CtaLink } from './CtaLink'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isCurrent = (href: string) =>
    !href.includes('#') && (pathname === href || pathname.startsWith(`${href}/`))

  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="brand" href="/" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <span className="dot" aria-hidden="true" />
          {site.name} <small>{site.tagline}</small>
        </Link>
        <nav className={open ? 'nav open' : 'nav'} id="nav" aria-label="Primary navigation">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <CtaLink className="btn menu-cta">Start selling</CtaLink>
        </nav>
        <div className="header-actions">
          <CtaLink className="btn">Start selling</CtaLink>
          <button
            className="nav-toggle"
            type="button"
            aria-controls="nav"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
