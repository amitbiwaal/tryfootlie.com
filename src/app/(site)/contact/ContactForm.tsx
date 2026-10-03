'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { sendMessage, type ContactState } from './actions'

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, null)

  if (state?.ok) {
    return (
      <p className="alert alert--ok" role="status">
        {state.message}
      </p>
    )
  }

  return (
    <form className="form" action={action}>
      {state && !state.ok && (
        <p className="alert alert--err" role="alert">
          {state.message}
        </p>
      )}
      <div className="field">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" className="input" name="name" type="text" autoComplete="name" maxLength={100} required />
      </div>
      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" className="input" name="email" type="email" autoComplete="email" maxLength={200} required />
      </div>
      <div className="field">
        <label htmlFor="contact-subject">Subject (optional)</label>
        <input id="contact-subject" className="input" name="subject" type="text" maxLength={150} />
      </div>
      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" className="textarea" name="message" minLength={10} maxLength={5000} required />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="hint">
        We use these details only to reply to you. See our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <div>
        <button className="btn" type="submit" disabled={pending}>
          {pending ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
