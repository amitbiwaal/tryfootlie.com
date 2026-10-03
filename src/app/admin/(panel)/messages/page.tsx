import type { Metadata } from 'next'
import { ConfirmButton } from '@/components/admin/ConfirmButton'
import { requireAdmin } from '@/lib/auth'
import { storageKind } from '@/lib/kv'
import { listMessages } from '@/lib/messages'
import { deleteMessageAction, setMessageReadAction } from '../../actions'

export const metadata: Metadata = { title: 'Messages' }

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }) + ' UTC'

export default async function MessagesPage() {
  await requireAdmin()
  const messages = await listMessages()

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Messages</h1>
          <p className="hint">Sent through the contact form on the site.</p>
        </div>
      </div>

      {storageKind() === 'none' && (
        <p className="alert alert--err">
          Storage is not connected, so the contact form is switched off. Connect Upstash Redis in Vercel → Storage.
        </p>
      )}

      {messages.length === 0 ? (
        <div className="card empty-card">
          <p>No messages yet.</p>
        </div>
      ) : (
        <ul className="msg-list">
          {messages.map((m) => (
            <li key={m.id} className={m.read ? 'card msg' : 'card msg msg--unread'}>
              <div className="msg-head">
                <div>
                  <strong>{m.name}</strong> · <a href={`mailto:${m.email}`}>{m.email}</a>
                  {!m.read && <span className="badge badge--new">New</span>}
                </div>
                <time dateTime={m.createdAt}>{formatDateTime(m.createdAt)}</time>
              </div>
              {m.subject && <p className="msg-subject">{m.subject}</p>}
              <p className="msg-body">{m.message}</p>
              <div className="row-actions">
                <a
                  className="btn btn--ghost btn--xs"
                  href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject || 'Your message'}`)}`}
                >
                  Reply by email
                </a>
                <form action={setMessageReadAction.bind(null, m.id, !m.read)}>
                  <button type="submit" className="btn btn--ghost btn--xs">
                    {m.read ? 'Mark unread' : 'Mark read'}
                  </button>
                </form>
                <form action={deleteMessageAction.bind(null, m.id)}>
                  <ConfirmButton className="btn btn--danger btn--xs" message="Delete this message?">
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
