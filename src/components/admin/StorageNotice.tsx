import { storageKind } from '@/lib/kv'
import { uploadMode } from '@/lib/uploads'

// Tells the admin, in plain words, where content is being saved and what is still missing.
export function StorageNotice() {
  const storage = storageKind()
  const uploads = uploadMode()

  return (
    <>
      {storage === 'none' && (
        <p className="alert alert--err">
          <strong>Storage is not connected, so posts cannot be saved yet.</strong> In Vercel open{' '}
          <em>Storage → Create Database → Upstash for Redis</em>, connect it to this project, then redeploy. Until
          then the site shows the built-in starter posts.
        </p>
      )}
      {storage === 'file' && (
        <p className="alert alert--info">
          Local mode: posts are saved to <code>.data/cms.json</code> on this computer. On Vercel, connect Upstash Redis
          (Storage tab) so posts are saved online.
        </p>
      )}
      {storage !== 'none' && uploads === 'none' && (
        <p className="alert alert--info">
          Image uploads are off. Connect a public Vercel Blob store (Storage tab) to upload from your device — pasting
          image URLs already works.
        </p>
      )}
    </>
  )
}
