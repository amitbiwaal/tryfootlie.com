import sanitizeHtml from 'sanitize-html'
import { site, affiliateRel } from './site'

function isInternal(href: string): boolean {
  if (href.startsWith('/') || href.startsWith('#')) return true
  try {
    return new URL(href).hostname.replace(/^www\./, '') === site.domain
  } catch {
    return false
  }
}

function isAffiliate(href: string): boolean {
  try {
    return new URL(href).hostname === new URL(site.affiliateUrl).hostname
  } catch {
    return false
  }
}

const EMPTY_WHEN_BLANK = new Set(['p', 'h2', 'h3', 'h4', 'li', 'ul', 'ol', 'blockquote', 'pre'])

// Everything the editor can produce, and nothing else. Runs on every save.
export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'br', 'hr', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's', 'a',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'img',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      ol: ['start'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    allowProtocolRelative: false,
    exclusiveFilter: (frame) => {
      // Images must point at a real location: an http(s) URL or a path on this site. Pasted content
      // often carries broken ones (src="x", file paths, stripped data: URIs).
      if (frame.tag === 'img') return !/^(https?:\/\/|\/(?!\/))/i.test(frame.attribs.src ?? '')
      // Drop empty blocks — the stray blank paragraphs and list items that editing leaves behind.
      if (EMPTY_WHEN_BLANK.has(frame.tag)) return !frame.text.trim() && frame.mediaChildren.length === 0
      return false
    },
    transformTags: {
      // The page already has an <h1> (the post title).
      h1: 'h2',
      a: (tagName, attribs) => {
        const href = attribs.href ?? ''
        const next: Record<string, string> = { href }
        if (!isInternal(href) && !href.startsWith('mailto:')) {
          next.target = '_blank'
          next.rel = isAffiliate(href) ? affiliateRel : 'nofollow noopener'
        }
        return { tagName, attribs: next }
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, alt: attribs.alt ?? '', loading: 'lazy' },
      }),
    },
  })
}

export function htmlToText(html: string): string {
  // Keep a space where block elements end so words from adjacent paragraphs don't fuse.
  const spaced = html.replace(/<\/(p|h[1-6]|li|blockquote|pre)>|<br\s*\/?>/gi, '$& ')
  return sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} })
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}
