import Link from 'next/link'
import { CtaLink } from '@/components/CtaLink'
import { JsonLd } from '@/components/JsonLd'
import { pageMetadata } from '@/lib/metadata'
import { absoluteUrl, site } from '@/lib/site'

const description =
  'Footly is an independent guide to selling feet pics online. Learn who we are, how the site works, how we earn money, and what we stand for.'

export const metadata = pageMetadata({ title: 'About Footly', description, path: '/about' })

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `About ${site.name}`,
          url: absoluteUrl('/about'),
          description,
        }}
      />
      <div className="page-hero">
        <div className="wrap">
          <span className="eyebrow">About</span>
          <h1>An independent guide to selling feet pics safely</h1>
          <p className="lead">
            {site.name} exists to help adults who want to sell feet pics online get started the right way — with their
            privacy intact, their payments protected, and realistic expectations.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="wrap">
          <div className="prose">
            <h2>What we do</h2>
            <p>
              Plenty of people are curious about selling feet pics, and most of them have the same worries: scams, being
              recognised, and whether they will actually get paid. We publish plain-English guides that answer those
              questions — how selling works, how to price your photos, how to stay anonymous, and which mistakes to
              avoid.
            </p>
            <p>
              You will find the overview on our <Link href="/">home page</Link> and deeper, step-by-step articles on the{' '}
              <Link href="/blog">blog</Link>.
            </p>

            <h2>How this site works</h2>
            <p>
              {site.domain} is a guide, not a marketplace. We do not host creator accounts, process payments, or hold
              anyone&apos;s photos. When you click a “Start selling” button, you leave this site and go to{' '}
              {site.partnerName}, a third-party creator platform. Sign-up, age verification, listings, payments, and
              payouts all happen there, under that platform&apos;s own terms and privacy policy.
            </p>

            <h2>How we earn money</h2>
            <p>
              Those buttons are affiliate links. If you sign up or make a purchase after clicking one, we may earn a
              commission at no extra cost to you. That is what keeps this site free to read. We are not owned,
              operated, or endorsed by {site.partnerName} or any other brand we mention. The full details are in our{' '}
              <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
            </p>

            <h2>What we stand for</h2>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <h3>Safety first</h3>
              <p>
                Payment before delivery, no off-platform deals, and no sending money to buyers. Our advice always starts
                with protecting you.
              </p>
            </div>
            <div className="info-card">
              <h3>Privacy by default</h3>
              <p>
                You should never need to show your face or share your real name. We explain how to keep your seller
                identity separate.
              </p>
            </div>
            <div className="info-card">
              <h3>Honest expectations</h3>
              <p>
                Earnings depend on effort, consistency, and audience. Any figures on this site are illustrative — we do
                not promise an income.
              </p>
            </div>
          </div>

          <div className="prose prose--after">
            <h2>Adults only</h2>
            <p>
              Everything on this site is written for adults aged 18 and over. Reputable platforms verify every
              seller&apos;s age, and you should only ever sell images of yourself.
            </p>

            <h2>Get in touch</h2>
            <p>
              Spotted something out of date, or have a question we have not covered? <Link href="/contact">Contact us</Link>{' '}
              — corrections and suggestions are always welcome.
            </p>

            <div className="cta-box">
              <h2>Ready to get started?</h2>
              <p>See how selling works in four steps, or go straight to sign-up.</p>
              <div className="cta-actions">
                <CtaLink className="btn">Start selling</CtaLink>
                <Link className="link-arrow" href="/#how-it-works">
                  How it works <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
