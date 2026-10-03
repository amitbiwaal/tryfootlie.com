'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from '@/app/admin/actions'
import { site } from '@/lib/site'

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname()
  const onMessages = pathname.startsWith('/admin/messages')

  return (
    <header className="admin-top">
      <div className="inner">
        <Link className="brand" href="/admin">
          <span className="dot" aria-hidden="true" />
          {site.name} <small>Admin</small>
        </Link>
        <nav aria-label="Admin">
          <Link href="/admin" aria-current={!onMessages ? 'page' : undefined}>
            Posts
          </Link>
          <Link href="/admin/messages" aria-current={onMessages ? 'page' : undefined}>
            Messages{unread > 0 && <span className="count">{unread}</span>}
          </Link>
          <a href="/" target="_blank" rel="noopener">
            View site ↗
          </a>
          <form action={logoutAction}>
            <button type="submit" className="link-btn">
              Sign out
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}
