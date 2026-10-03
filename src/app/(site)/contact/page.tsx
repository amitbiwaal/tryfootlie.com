import Link from 'next/link'
import { storageKind } from '@/lib/kv'
import { pageMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'
import { ContactForm } from './ContactForm'

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with the Footly guide team — questions about our articles, corrections, feedback, privacy requests, and partnership enquiries.',
  path: '/contact',
})

export default function ContactPage() {
  const formAvailable = storageKind() !== 'none'

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Contact</span>
          <h1>Get in touch</h1>
          <p className="lead">
            Questions about a guide, a correction, feedback, or a partnership idea — send us a message and we will reply
            by email.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="wrap two-col">
          <div>
            {formAvailable ? (
              <ContactForm />
            ) : site.contactEmail ? (
              <p className="alert alert--info">
                Email us at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
              </p>
            ) : (
              <p className="alert alert--info">Our contact form is being set up. Please check back shortly.</p>
            )}
          </div>

          <div className="prose">
            <h2>Before you write</h2>
            <p>
              <strong>Account, payment, or payout problem?</strong> We are an independent guide and cannot access
              accounts on any selling platform. Please contact that platform&apos;s own support team — they are the only
              ones who can help.
            </p>
            <p>
              <strong>Looking for answers?</strong> Many common questions are covered in the{' '}
              <Link href="/#faq">FAQ</Link> and on the <Link href="/blog">blog</Link>.
            </p>
            <p>
              <strong>Privacy request?</strong> To access or delete information you have sent us, use this form and
              mention “privacy request”. See our <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>
            {formAvailable && site.contactEmail && (
              <p>
                <strong>Prefer email?</strong> Write to <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
              </p>
            )}
            <p className="hint">This site is for adults aged 18 and over.</p>
          </div>
        </div>
      </div>
    </>
  )
}
