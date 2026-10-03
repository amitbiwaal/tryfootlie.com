import Link from 'next/link'
import { footerNav, site } from '@/lib/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="brand" href="/" aria-label={`${site.name} home`}>
              <span className="dot" aria-hidden="true" />
              {site.name}
            </Link>
            <p>An independent guide to selling feet pics online safely, anonymously, and profitably. For adults 18+ only.</p>
          </div>
          {footerNav.map((col) => (
            <nav className="footer-col" key={col.title} aria-label={col.title}>
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer-legal">
          <p>
            <strong>Disclaimer:</strong> This is an independent, unofficial affiliate site published on {site.domain} for
            informational and promotional purposes only. It is{' '}
            <strong>
              not officially affiliated with, endorsed by, sponsored by, or operated by {site.partnerName}, Instafeet
            </strong>{' '}
            or any other brand mentioned here. References to “{site.name}” and other names are used for descriptive
            purposes. We may earn a commission if you sign up or make a purchase through links on this site, at no extra
            cost to you. See our <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
          </p>
          <p>
            This site and the platforms it describes are intended strictly for adults aged 18 and over. All content is
            presented in good faith; figures, ratings, and earnings examples are illustrative and not guarantees of
            income. Always review the terms and policies of any third-party service before signing up.
          </p>
          <p>
            © {new Date().getFullYear()} {site.domain} — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
