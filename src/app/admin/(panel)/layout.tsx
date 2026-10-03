import { AdminNav } from '@/components/admin/AdminNav'
import { requireAdmin } from '@/lib/auth'
import { listMessages } from '@/lib/messages'

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  let unread = 0
  try {
    unread = (await listMessages()).filter((m) => !m.read).length
  } catch (err) {
    console.error('Could not load messages', err)
  }

  return (
    <>
      <AdminNav unread={unread} />
      <div className="admin-main">{children}</div>
    </>
  )
}
