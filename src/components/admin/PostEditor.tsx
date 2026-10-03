'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { deletePostAction, savePostAction } from '@/app/admin/actions'
import type { Post, PostStatus } from '@/lib/posts'
import { slugify, truncate } from '@/lib/text'
import { ConfirmButton } from './ConfirmButton'
import { RichTextEditor, uploadImage } from './RichTextEditor'

type Fields = {
  title: string
  slug: string
  excerpt: string
  coverImage: string
  coverAlt: string
  tags: string
  author: string
  metaTitle: string
  metaDescription: string
}

function Counter({ value, max }: { value: string; max: number }) {
  return (
    <span className={value.length > max ? 'counter over' : 'counter'}>
      {value.length}/{max}
    </span>
  )
}

export function PostEditor({
  post,
  defaultAuthor,
  siteHost,
  uploadsEnabled,
}: {
  post: Post | null
  defaultAuthor: string
  siteHost: string
  uploadsEnabled: boolean
}) {
  const router = useRouter()
  const [fields, setFields] = useState<Fields>({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    excerpt: post?.excerpt ?? '',
    coverImage: post?.coverImage ?? '',
    coverAlt: post?.coverAlt ?? '',
    tags: post?.tags.join(', ') ?? '',
    author: post?.author ?? defaultAuthor,
    metaTitle: post?.metaTitle ?? '',
    metaDescription: post?.metaDescription ?? '',
  })
  const [content, setContent] = useState(post?.content ?? '')
  const [id, setId] = useState(post?.id)
  const [status, setStatus] = useState<PostStatus>(post?.status ?? 'draft')
  // Until the writer edits the slug by hand (or the post is already live), it follows the title.
  const [slugLocked, setSlugLocked] = useState(Boolean(post))
  const [dirty, setDirty] = useState(false)
  const [notice, setNotice] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, startSaving] = useTransition()
  const coverInput = useRef<HTMLInputElement>(null)

  function update<K extends keyof Fields>(key: K, value: string) {
    setFields((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'title' && !slugLocked) next.slug = slugify(value)
      return next
    })
    setDirty(true)
  }

  const save = useCallback(
    (nextStatus: PostStatus) => {
      if (saving) return
      setNotice(null)
      startSaving(async () => {
        const result = await savePostAction({
          id,
          ...fields,
          content,
          tags: fields.tags.split(','),
          status: nextStatus,
        })
        if (!result.ok) {
          setNotice({ kind: 'err', text: result.error })
          return
        }
        setDirty(false)
        setStatus(result.post.status)
        setSlugLocked(true)
        setFields((prev) => ({ ...prev, slug: result.post.slug }))
        setNotice({
          kind: 'ok',
          text:
            result.post.status === 'published'
              ? status === 'published'
                ? 'Changes published.'
                : 'Published — your post is live.'
              : status === 'published'
                ? 'Unpublished. The post is a draft again.'
                : 'Draft saved.',
        })
        if (!id) {
          setId(result.post.id)
          router.replace(`/admin/posts/${result.post.id}`)
        }
      })
    },
    [content, fields, id, router, saving, status]
  )

  // Warn before leaving with unsaved work, and support Ctrl/Cmd+S.
  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault()
        save(status)
      }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [dirty, save, status])

  async function onCoverFile(file: File | undefined) {
    if (!file) return
    setUploading(true)
    setNotice(null)
    try {
      update('coverImage', await uploadImage(file))
    } catch (err) {
      setNotice({ kind: 'err', text: err instanceof Error ? err.message : 'Upload failed.' })
    } finally {
      setUploading(false)
      if (coverInput.current) coverInput.current.value = ''
    }
  }

  const isLive = status === 'published'
  const previewSlug = fields.slug || 'your-post-url'
  const serpTitle = truncate(`${fields.metaTitle || fields.title || 'Post title'} | Footly`, 62)
  const serpDescription = truncate(
    fields.metaDescription || fields.excerpt || 'Add an excerpt or SEO description to control this text.',
    158
  )

  return (
    <div className="editor">
      <div className="editor-bar">
        <div className="editor-bar-left">
          <Link
            href="/admin"
            className="back-link"
            onClick={(event) => {
              if (dirty && !window.confirm('You have unsaved changes. Leave without saving?')) event.preventDefault()
            }}
          >
            ← Posts
          </Link>
          <span className={isLive ? 'badge badge--live' : 'badge badge--draft'}>{isLive ? 'Published' : 'Draft'}</span>
          {dirty && <span className="unsaved">Unsaved changes</span>}
        </div>
        <div className="editor-actions">
          {id && (
            <a className="btn btn--ghost btn--sm" href={`/admin/posts/${id}/preview`} target="_blank" rel="noopener">
              Preview
            </a>
          )}
          {isLive ? (
            <>
              <button type="button" className="btn btn--ghost btn--sm" disabled={saving} onClick={() => save('draft')}>
                Unpublish
              </button>
              <button type="button" className="btn btn--sm" disabled={saving} onClick={() => save('published')}>
                {saving ? 'Saving…' : 'Update'}
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn--ghost btn--sm" disabled={saving} onClick={() => save('draft')}>
                {saving ? 'Saving…' : 'Save draft'}
              </button>
              <button type="button" className="btn btn--sm" disabled={saving} onClick={() => save('published')}>
                Publish
              </button>
            </>
          )}
        </div>
      </div>

      {notice && (
        <p className={notice.kind === 'ok' ? 'alert alert--ok' : 'alert alert--err'} role="status">
          {notice.text}{' '}
          {notice.kind === 'ok' && isLive && (
            <a href={`/blog/${fields.slug}`} target="_blank" rel="noopener">
              View post ↗
            </a>
          )}
        </p>
      )}

      <div className="editor-grid">
        <div className="editor-main">
          <label className="sr-only" htmlFor="post-title">
            Title
          </label>
          <input
            id="post-title"
            className="title-input"
            type="text"
            placeholder="Post title"
            maxLength={160}
            value={fields.title}
            onChange={(e) => update('title', e.target.value)}
          />
          <RichTextEditor
            initialContent={post?.content ?? ''}
            uploadsEnabled={uploadsEnabled}
            onChange={(html) => {
              setContent(html)
              setDirty(true)
            }}
          />
        </div>

        <aside className="editor-side">
          <div className="side-panel">
            <h2>URL</h2>
            <div className="field">
              <label htmlFor="post-slug">Slug</label>
              <input
                id="post-slug"
                className="input"
                type="text"
                value={fields.slug}
                onChange={(e) => {
                  setSlugLocked(true)
                  update('slug', e.target.value)
                }}
                onBlur={() => setFields((prev) => ({ ...prev, slug: slugify(prev.slug) }))}
              />
              <p className="hint url-hint">
                {siteHost}/blog/{previewSlug}
              </p>
              {isLive && <p className="hint">Changing the slug of a published post breaks existing links to it.</p>}
            </div>
          </div>

          <div className="side-panel">
            <h2>Summary</h2>
            <div className="field">
              <label htmlFor="post-excerpt">
                Excerpt <Counter value={fields.excerpt} max={160} />
              </label>
              <textarea
                id="post-excerpt"
                className="textarea textarea--sm"
                maxLength={320}
                placeholder="One or two sentences shown on the blog list. Left empty, it is taken from the article."
                value={fields.excerpt}
                onChange={(e) => update('excerpt', e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="post-tags">Tags</label>
              <input
                id="post-tags"
                className="input"
                type="text"
                placeholder="Safety, Pricing"
                value={fields.tags}
                onChange={(e) => update('tags', e.target.value)}
              />
              <p className="hint">Separate with commas. Up to 8.</p>
            </div>
            <div className="field">
              <label htmlFor="post-author">Author</label>
              <input
                id="post-author"
                className="input"
                type="text"
                maxLength={80}
                value={fields.author}
                onChange={(e) => update('author', e.target.value)}
              />
            </div>
          </div>

          <div className="side-panel">
            <h2>Cover image</h2>
            <div className="cover-preview">
              {/^(https?:\/\/|\/(?!\/))/i.test(fields.coverImage.trim()) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={fields.coverImage.trim()} alt="" />
              ) : (
                <span>{fields.coverImage.trim() ? 'Not a valid image address' : 'No cover image'}</span>
              )}
            </div>
            {uploadsEnabled && (
              <>
                <input
                  ref={coverInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  hidden
                  onChange={(e) => onCoverFile(e.target.files?.[0])}
                />
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  disabled={uploading}
                  onClick={() => coverInput.current?.click()}
                >
                  {uploading ? 'Uploading…' : 'Upload image'}
                </button>
              </>
            )}
            <div className="field">
              <label htmlFor="post-cover">Image URL</label>
              <input
                id="post-cover"
                className="input"
                type="text"
                inputMode="url"
                placeholder="https://…"
                value={fields.coverImage}
                onChange={(e) => update('coverImage', e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="post-cover-alt">Description (alt text)</label>
              <input
                id="post-cover-alt"
                className="input"
                type="text"
                maxLength={200}
                value={fields.coverAlt}
                onChange={(e) => update('coverAlt', e.target.value)}
              />
            </div>
            {fields.coverImage && (
              <button type="button" className="link-btn" onClick={() => update('coverImage', '')}>
                Remove cover image
              </button>
            )}
          </div>

          <div className="side-panel">
            <h2>Search engines (SEO)</h2>
            <div className="field">
              <label htmlFor="post-meta-title">
                SEO title <Counter value={fields.metaTitle || fields.title} max={60} />
              </label>
              <input
                id="post-meta-title"
                className="input"
                type="text"
                maxLength={120}
                placeholder={fields.title || 'Defaults to the post title'}
                value={fields.metaTitle}
                onChange={(e) => update('metaTitle', e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="post-meta-description">
                SEO description <Counter value={fields.metaDescription || fields.excerpt} max={160} />
              </label>
              <textarea
                id="post-meta-description"
                className="textarea textarea--sm"
                maxLength={320}
                placeholder="Defaults to the excerpt"
                value={fields.metaDescription}
                onChange={(e) => update('metaDescription', e.target.value)}
              />
            </div>
            <div className="serp" aria-label="Search result preview">
              <div className="u">
                {siteHost} › blog › {previewSlug}
              </div>
              <div className="t">{serpTitle}</div>
              <div className="d">{serpDescription}</div>
            </div>
          </div>

          {id && (
            <form className="side-panel" action={deletePostAction.bind(null, id)}>
              <h2>Danger zone</h2>
              <ConfirmButton
                className="btn btn--danger btn--sm"
                message="Delete this post permanently? This cannot be undone."
              >
                Delete post
              </ConfirmButton>
            </form>
          )}
        </aside>
      </div>
    </div>
  )
}
