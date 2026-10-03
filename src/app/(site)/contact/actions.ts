'use server'

import { getKV } from '@/lib/kv'
import { addMessage } from '@/lib/messages'
import { isLimited, recordHit } from '@/lib/rate-limit'

export type ContactState = { ok: boolean; message: string } | null

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const field = (name: string) => String(formData.get(name) ?? '').trim()

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (field('company')) return { ok: true, message: 'Thanks — your message has been sent.' }

  const name = field('name').slice(0, 100)
  const email = field('email').slice(0, 200)
  const subject = field('subject').slice(0, 150)
  const message = field('message').slice(0, 5000)

  if (name.length < 2) return { ok: false, message: 'Please enter your name.' }
  if (!EMAIL.test(email)) return { ok: false, message: 'Please enter a valid email address.' }
  if (message.length < 10) return { ok: false, message: 'Please write a message of at least 10 characters.' }

  if (getKV().kind === 'none') {
    return { ok: false, message: 'The contact form is not available right now. Please try again later.' }
  }

  try {
    if (await isLimited('contact', 5)) {
      return { ok: false, message: 'You have sent several messages recently. Please try again in an hour.' }
    }
    await addMessage({ name, email, subject, message })
    await recordHit('contact', 60 * 60 * 1000)
  } catch (err) {
    console.error('Contact form failed', err)
    return { ok: false, message: 'Something went wrong while sending your message. Please try again.' }
  }

  return { ok: true, message: 'Thanks — your message has been sent. We will reply by email.' }
}
