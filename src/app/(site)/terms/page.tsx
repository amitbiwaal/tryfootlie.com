import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Terms of Use',
  description: `The terms that apply when you use ${site.domain}, including eligibility, affiliate links, third-party services, and limits on our liability.`,
  path: '/terms',
})

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro={`Please read these terms before using ${site.domain}. By using the site, you agree to them.`}
    >
      <h2>1. About these terms</h2>
      <p>
        These Terms of Use govern your access to and use of {site.domain} (“the site”). If you do not agree with them,
        please do not use the site. They should be read together with our <Link href="/privacy-policy">Privacy Policy</Link>
        , <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>, and <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>2. Adults only</h2>
      <p>
        The site is intended strictly for adults. By using it, you confirm that you are at least 18 years old, or the
        age of majority where you live if that is higher, and that viewing this kind of content is lawful in your
        location.
      </p>

      <h2>3. What the site is — and is not</h2>
      <p>
        The site publishes general information and guides about selling feet pics online. It is not a marketplace: we do
        not host seller or buyer accounts, process payments, or hold anyone&apos;s photos.
      </p>
      <p>
        Nothing on the site is legal, tax, financial, or other professional advice. Laws and platform rules differ
        between countries and change over time. You are responsible for checking the rules that apply to you and for
        any tax obligations that arise from your earnings.
      </p>

      <h2>4. Affiliate links and third-party services</h2>
      <p>
        The site contains affiliate links to {site.partnerName} and may link to other third-party websites. We may earn
        a commission when you sign up or buy through those links. Third-party services are operated by their own
        companies under their own terms and privacy policies. We do not control them and are not responsible for their
        availability, features, fees, decisions about your account, or any dealings you have with them or with their
        users.
      </p>

      <h2>5. No guarantee of results</h2>
      <p>
        Prices, earnings examples, ratings, statistics, and testimonials shown on the site are illustrative. They are
        not promises or typical results. What you earn, if anything, depends on many factors outside our control.
      </p>

      <h2>6. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the site for anything unlawful, or to promote content involving anyone under 18;</li>
        <li>attempt to gain unauthorised access to the site, its administration area, or its systems;</li>
        <li>interfere with the site&apos;s operation, for example by overloading it or introducing malicious code;</li>
        <li>send spam, abusive, or misleading messages through the contact form;</li>
        <li>copy or scrape substantial parts of the site for republication without our permission.</li>
      </ul>

      <h2>7. Intellectual property</h2>
      <p>
        The text, design, and graphics on the site belong to us or our licensors and are protected by copyright and
        other laws. You may view and share links to our pages and quote brief extracts with attribution. Any other use
        requires our written permission. Third-party names and trademarks belong to their respective owners and are
        used only to describe their products or services.
      </p>

      <h2>8. Messages you send us</h2>
      <p>
        If you send us feedback or suggestions, you allow us to use them to improve the site without owing you
        compensation. Do not send us anything confidential.
      </p>

      <h2>9. Disclaimer of warranties</h2>
      <p>
        The site is provided “as is” and “as available”. We try to keep the information accurate and up to date, but we
        make no warranties, express or implied, about its completeness, accuracy, or suitability for any purpose, or
        that the site will be uninterrupted or error-free.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for any indirect, incidental, special, or
        consequential losses, or for any loss of income, data, or goodwill, arising from your use of the site or of any
        third-party service reached through it. Nothing in these terms excludes liability that cannot be excluded under
        applicable law.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update the site and these terms at any time. The “last updated” date shows the latest revision. By
        continuing to use the site after changes are posted, you accept the revised terms.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of the jurisdiction in which the operator of the site is established,
        without regard to conflict-of-law rules. Mandatory consumer protections in your country of residence continue
        to apply.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms? <Link href="/contact">Contact us</Link>.
      </p>
    </LegalPage>
  )
}
