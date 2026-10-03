// Pure string helpers, safe to import from both server and client code.

// Keeps letters, marks and digits from any script, so a Hindi (or other non-Latin) title still
// produces a readable slug instead of an empty one. Latin accents are folded (é → e).
export function slugify(input: string): string {
  const cleaned = input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .normalize('NFC')
    .replace(/['’]/g, '')
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
  // Cut by code point so a multi-byte character is never split in half.
  return [...cleaned].slice(0, 80).join('').replace(/-+$/, '')
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : cut.length).replace(/[\s.,;:—-]+$/, '')}…`
}

const DISPLAY_TIME_ZONE = process.env.NEXT_PUBLIC_TIME_ZONE || 'UTC'

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return ''
  const format = (timeZone: string) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone })
  try {
    return format(DISPLAY_TIME_ZONE)
  } catch {
    // An unrecognised NEXT_PUBLIC_TIME_ZONE must not take the page down.
    return format('UTC')
  }
}

export function tagSlug(tag: string): string {
  return slugify(tag)
}

export function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220))
}

// Route params for non-ASCII slugs can arrive percent-encoded; malformed input is left as-is.
export function decodeParam(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

// Percent-encodes non-ASCII characters only, so already-encoded URLs are not encoded twice.
export function encodeNonAscii(value: string): string {
  return value.replace(/[^\x00-\x7F]+/g, (chars) => encodeURIComponent(chars))
}
