import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Affiliate Disclosure',
  description: `${site.domain} earns commissions through affiliate links. Here is exactly how that works and what it means for you.`,
  path: '/affiliate-disclosure',
})

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      intro="This site earns money through affiliate links. Here is exactly how that works."
    >
      <h2>The short version</h2>
      <p>
        Some links on {site.domain} are affiliate links. If you click one and then sign up or make a purchase, we may
        receive a commission from the company you were sent to. This comes at <strong>no extra cost to you</strong>.
      </p>

      <h2>Which links are affiliate links</h2>
      <p>
        The “Start selling” and “Create your account” buttons throughout the site are affiliate links to{' '}
        {site.partnerName}, a third-party creator platform. They open in a new tab and are marked for search engines as
        sponsored links. Links inside blog articles that point to the same platform are affiliate links too.
      </p>

      <h2>Our relationship with the brands we mention</h2>
      <p>
        {site.domain} is an independent, unofficial guide. We are <strong>not</strong> owned, operated, endorsed, or
        sponsored by {site.partnerName}, Instafeet, or any other platform mentioned on the site. “{site.name}” is the
        name of this guide. Sign-up, age verification, payments, payouts, and support are provided by the third-party
        platform under its own terms — not by us.
      </p>

      <h2>How this affects what we write</h2>
      <p>
        Commissions are how we keep the site free. They also mean we have a financial interest in you signing up, and
        you should weigh our recommendations with that in mind. We aim to give accurate, practical guidance — including
        the risks and the limits — but you should always read a platform&apos;s own terms, fees, and policies before
        joining.
      </p>

      <h2>Earnings and testimonials</h2>
      <p>
        Prices, ratings, statistics, and creator quotes shown on the site are illustrative examples, not guarantees and
        not verified results from specific individuals. Your results will depend on your own effort, content, and
        audience. See our <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, <Link href="/contact">contact us</Link> and we will be happy to explain.
      </p>
    </LegalPage>
  )
}
