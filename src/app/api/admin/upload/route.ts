import { NextResponse, type NextRequest } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { MAX_UPLOAD_BYTES, sniffImage, storeImage, uploadMode } from '@/lib/uploads'

export const dynamic = 'force-dynamic'

const fail = (error: string, status: number) => NextResponse.json({ error }, { status })

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return fail('Not signed in.', 401)

  // Route handlers get no automatic CSRF protection, so reject cross-origin posts explicitly.
  const origin = request.headers.get('origin')
  if (origin && URL.parse(origin)?.host !== request.headers.get('host')) return fail('Bad origin.', 403)

  if (uploadMode() === 'none') {
    return fail(
      'Image uploads are not connected. In Vercel open Storage → Create → Blob, connect it to this project and redeploy — or paste an image URL instead.',
      503
    )
  }

  let file: FormDataEntryValue | null
  try {
    file = (await request.formData()).get('file')
  } catch {
    return fail('Could not read the upload.', 400)
  }
  if (!(file instanceof File)) return fail('No file received.', 400)
  if (file.size > MAX_UPLOAD_BYTES) return fail('Image is too large. The limit is 4 MB.', 413)

  const bytes = new Uint8Array(await file.arrayBuffer())
  const type = sniffImage(bytes)
  if (!type) return fail('Unsupported file. Use a JPG, PNG, WebP, GIF or AVIF image.', 415)

  try {
    return NextResponse.json({ url: await storeImage(bytes, type) })
  } catch (err) {
    console.error('Upload failed', err)
    return fail('Upload failed. Check that the Blob store is a public store and try again.', 500)
  }
}
