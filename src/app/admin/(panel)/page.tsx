import type { Metadata } from 'next'
import Link from 'next/link'
import { ConfirmButton } from '@/components/admin/ConfirmButton'
import { StorageNotice } from '@/components/admin/StorageNotice'
import { requireAdmin } from '@/lib/auth'
import { ensureSeeded, listPostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/text'
import { deletePostAction } from '../actions'

export const metadata: Metadata = { title: 'Posts' }

export default async function AdminDashboard() {
  await requireAdmin()
  await ensureSeeded()
  const posts = await listPostMeta()
  const published = posts.filter((p) => p.status === 'published').length

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Posts</h1>
          <p className="hint">
            {published} published · {posts.length - published} draft
          </p>
        </div>
        <Link className="btn" href="/admin/posts/new">
          + New post
        </Link>
      </div>

      <StorageNotice />

      {posts.length === 0 ? (
        <div className="card empty-card">
          <p>No posts yet.</p>
          <Link className="btn" href="/admin/posts/new">
            Write your first post
          </Link>
        </div>
      ) : (
        <div className="card table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">Last updated</th>
                <th scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="cell-title">
                    <Link href={`/admin/posts/${post.id}`}>{post.title}</Link>
                    <span className="slug">/blog/{post.slug}</span>
                  </td>
                  <td>
                    <span className={post.status === 'published' ? 'badge badge--live' : 'badge badge--draft'}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="cell-date">{formatDate(post.updatedAt)}</td>
                  <td>
                    <div className="row-actions">
                      <Link className="btn btn--ghost btn--xs" href={`/admin/posts/${post.id}`}>
                        Edit
                      </Link>
                      {post.status === 'published' && (
                        <a className="btn btn--ghost btn--xs" href={`/blog/${post.slug}`} target="_blank" rel="noopener">
                          View
                        </a>
                      )}
                      <form action={deletePostAction.bind(null, post.id)}>
                        <ConfirmButton
                          className="btn btn--danger btn--xs"
                          message={`Delete “${post.title}”? This cannot be undone.`}
                        >
                          Delete
                        </ConfirmButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
