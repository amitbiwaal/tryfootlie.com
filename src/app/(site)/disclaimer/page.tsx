import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Disclaimer',
  description: `Important information about ${site.domain}: independent and unofficial, no income guarantees, illustrative figures, 18+ only, and not professional advice.`,
  path: '/disclaimer',
})

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      intro="Please keep the following in mind when reading and acting on anything published on this site."
    >
      <h2>Independent and unofficial</h2>
      <p>
        {site.domain} is an independent, unofficial affiliate site published for informational and promotional
        purposes. It is not officially affiliated with, endorsed by, sponsored by, or operated by {site.partnerName},
        Instafeet, or any other brand mentioned here. References to “{site.name}” and other names are used for
        descriptive purposes. All trademarks belong to their respective owners.
      </p>

      <h2>Affiliate relationship</h2>
      <p>
        We may earn a commission if you sign up or make a purchase through links on this site, at no extra cost to you.
        Full details are in our <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
      </p>

      <h2>No guarantee of income</h2>
      <p>
        Figures, ratings, statistics, and earnings examples on this site are illustrative and are not guarantees of
        income. Creator quotes are illustrative of the kind of experience the content describes and are not verified
        statements from specific individuals. Many people who try selling photos online earn little or nothing. Your
        results depend on your own effort, content, pricing, and audience.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Content on this site is general information only. It is not legal, tax, financial, or safety advice, and it
        does not take your personal circumstances into account. Laws on adult content, online selling, and taxation
        vary by country and region. Check the rules that apply to you, and speak to a qualified professional if you are
        unsure.
      </p>

      <h2>Adults only</h2>
      <p>
        This site and the platforms it describes are intended strictly for adults aged 18 and over. Never create, sell,
        or share images of anyone under 18. Only sell images of yourself.
      </p>

      <h2>Third-party platforms</h2>
      <p>
        Features, fees, policies, and availability of third-party platforms can change without notice and may differ
        from what is described here. Always review the current terms and policies of any service before signing up. We
        are not responsible for the actions, content, or decisions of third-party platforms or their users.
      </p>

      <h2>Accuracy</h2>
      <p>
        All content is presented in good faith and we work to keep it accurate, but we make no warranty that it is
        complete, current, or error-free. If you spot a mistake, please <Link href="/contact">let us know</Link>.
      </p>
    </LegalPage>
  )
}
