import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostEditor } from '@/components/admin/PostEditor'
import { StorageNotice } from '@/components/admin/StorageNotice'
import { requireAdmin } from '@/lib/auth'
import { ensureSeeded, getPostById } from '@/lib/posts'
import { site } from '@/lib/site'
import { uploadMode } from '@/lib/uploads'

export const metadata: Metadata = { title: 'Edit post' }

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  await ensureSeeded()
  const post = await getPostById(id)
  if (!post) notFound()

  return (
    <>
      <StorageNotice />
      {/* key: remount with fresh state when navigating between posts */}
      <PostEditor
        key={post.id}
        post={post}
        defaultAuthor={site.defaultAuthor}
        siteHost={site.domain}
        uploadsEnabled={uploadMode() !== 'none'}
      />
    </>
  )
}
