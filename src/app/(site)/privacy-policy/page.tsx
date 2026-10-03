import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${site.domain} collects, uses, and protects information — including the contact form, cookies, hosting logs, and affiliate links.`,
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`This policy explains what information ${site.domain} collects, why, and the choices you have.`}
    >
      <h2>1. Who we are</h2>
      <p>
        {site.domain} (“we”, “us”, “the site”) is an independent informational website about selling feet pics online.
        We do not operate a marketplace and we do not create user accounts for visitors. You can reach us through the{' '}
        <Link href="/contact">contact page</Link>.
      </p>

      <h2>2. Information we collect</h2>
      <h3>Information you give us</h3>
      <p>
        If you use the contact form, we collect the name, email address, subject, and message you submit. Please do not
        include sensitive personal information in your message.
      </p>
      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Server logs.</strong> Our hosting provider automatically records standard technical data for each
          request, such as IP address, browser type, the page requested, and the time of the request. This is used to
          deliver the site, keep it secure, and diagnose problems.
        </li>
        <li>
          <strong>Abuse prevention.</strong> When a form is submitted, we briefly store a one-way hashed value derived
          from the sender&apos;s IP address so we can limit repeated submissions. It expires automatically.
        </li>
      </ul>
      <p>We do not ask for, and do not knowingly collect, photos, identity documents, or payment details.</p>

      <h2>3. Cookies</h2>
      <p>
        The public pages of this site do not set advertising or tracking cookies. The only cookie we set ourselves is a
        strictly necessary session cookie used by site administrators when they sign in to manage content; ordinary
        visitors never receive it.
      </p>
      <p>
        If we add analytics or similar tools in the future, we will update this policy and, where the law requires it,
        ask for your consent first.
      </p>

      <h2>4. Affiliate links and third-party sites</h2>
      <p>
        Buttons such as “Start selling” are affiliate links that take you to {site.partnerName}, a third-party platform.
        The link contains a referral identifier so that platform can tell the visit came from us. Once you leave this
        site, the third party may set its own cookies and collect its own data, and its privacy policy and terms apply —
        not ours. We do not receive your account details, photos, or payment information from that platform. See our{' '}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
      </p>
      <p>
        Articles may also link to other external websites. We are not responsible for the content or privacy practices
        of sites we do not control.
      </p>

      <h2>5. How we use information</h2>
      <ul>
        <li>To read and reply to messages you send us.</li>
        <li>To operate, secure, and improve the site.</li>
        <li>To prevent spam and abuse.</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <p>We do not sell your personal information, and we do not use it for automated decision-making.</p>

      <h2>6. Who we share it with</h2>
      <p>
        We share information only with service providers that help us run the site — for example our hosting and
        database providers — and only so they can provide those services to us. We may also disclose information if the
        law requires it or to protect our rights and the safety of others.
      </p>

      <h2>7. How long we keep it</h2>
      <p>
        Contact messages are kept only as long as needed to deal with your enquiry and maintain a reasonable record of
        the conversation, after which they are deleted. You can ask us to delete your message sooner at any time.
        Server logs are retained by our hosting provider according to its own retention schedule.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, or delete the personal information we
        hold about you, to object to or restrict certain processing, and to lodge a complaint with your local data
        protection authority. To make a request, use the <Link href="/contact">contact form</Link> and mention “privacy
        request”. We will respond within a reasonable time.
      </p>

      <h2>9. Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect the information we hold, including encrypted
        connections (HTTPS) and restricted administrative access. No method of transmission or storage is completely
        secure, so we cannot guarantee absolute security.
      </p>

      <h2>10. International transfers</h2>
      <p>
        Our service providers may process data in countries other than your own. Where that happens, we rely on the
        safeguards those providers put in place for international data transfers.
      </p>

      <h2>11. Age restriction</h2>
      <p>
        This site is intended strictly for adults aged 18 and over. We do not knowingly collect information from anyone
        under 18. If you believe a minor has sent us personal information, please contact us and we will delete it.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The “last updated” date at the top shows when it was most recently
        revised. Significant changes will be reflected on this page.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about this policy? <Link href="/contact">Contact us</Link>
        {site.contactEmail ? (
          <>
            {' '}
            or email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </>
        ) : null}
        .
      </p>
    </LegalPage>
  )
}
