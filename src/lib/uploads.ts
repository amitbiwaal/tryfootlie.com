// Image uploads for the editor.
//   Vercel Blob (public store) when BLOB_READ_WRITE_TOKEN is set — production.
//   public/uploads/ on disk when running outside Vercel — local development.

import { randomUUID } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { put } from '@vercel/blob'

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024 // Vercel functions accept request bodies up to ~4.5MB.

export type UploadMode = 'blob' | 'local' | 'none'

export function uploadMode(): UploadMode {
  if (process.env.BLOB_READ_WRITE_TOKEN) return 'blob'
  if (process.env.VERCEL) return 'none'
  return 'local'
}

// Detect the real type from the file's first bytes; the browser-supplied MIME type is not trusted.
// SVG is deliberately not accepted because it can carry scripts.
export function sniffImage(bytes: Uint8Array): { ext: string; contentType: string } | null {
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.subarray(start, end))
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { ext: 'jpg', contentType: 'image/jpeg' }
  if (bytes[0] === 0x89 && ascii(1, 4) === 'PNG') return { ext: 'png', contentType: 'image/png' }
  if (ascii(0, 4) === 'GIF8') return { ext: 'gif', contentType: 'image/gif' }
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return { ext: 'webp', contentType: 'image/webp' }
  if (ascii(4, 8) === 'ftyp' && /^(avif|avis)$/.test(ascii(8, 12))) return { ext: 'avif', contentType: 'image/avif' }
  return null
}

export async function storeImage(bytes: Uint8Array, type: { ext: string; contentType: string }): Promise<string> {
  const name = `${randomUUID()}.${type.ext}`
  const mode = uploadMode()

  if (mode === 'blob') {
    const blob = await put(`blog/${name}`, Buffer.from(bytes), {
      access: 'public',
      contentType: type.contentType,
      addRandomSuffix: false,
    })
    return blob.url
  }

  if (mode === 'local') {
    const dir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, name), bytes)
    return `/uploads/${name}`
  }

  throw new Error('Image uploads are not connected.')
}
