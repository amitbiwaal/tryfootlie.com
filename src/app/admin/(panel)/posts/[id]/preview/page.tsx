import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArticleView } from '@/components/ArticleView'
import { requireAdmin } from '@/lib/auth'
import { getPostById } from '@/lib/posts'

export const metadata: Metadata = { title: 'Preview' }

export default async function PreviewPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const post = await getPostById(id)
  if (!post) notFound()

  return (
    <>
      <p className="alert alert--info preview-bar">
        Preview of the last saved version ({post.status === 'published' ? 'published' : 'draft — not visible to visitors'}
        ). <Link href={`/admin/posts/${post.id}`}>Back to editor</Link>
      </p>
      <div className="card preview-frame">
        <ArticleView post={post} linkTags={false} />
      </div>
    </>
  )
}
