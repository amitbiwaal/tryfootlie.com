import type { Metadata } from 'next'
import { PostEditor } from '@/components/admin/PostEditor'
import { StorageNotice } from '@/components/admin/StorageNotice'
import { requireAdmin } from '@/lib/auth'
import { site } from '@/lib/site'
import { uploadMode } from '@/lib/uploads'

export const metadata: Metadata = { title: 'New post' }

export default async function NewPostPage() {
  await requireAdmin()

  return (
    <>
      <StorageNotice />
      <PostEditor
        post={null}
        defaultAuthor={site.defaultAuthor}
        siteHost={site.domain}
        uploadsEnabled={uploadMode() !== 'none'}
      />
    </>
  )
}
