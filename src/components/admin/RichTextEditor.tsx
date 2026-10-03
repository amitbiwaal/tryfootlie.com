'use client'

import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { TextSelection } from '@tiptap/pm/state'
import type { EditorView } from '@tiptap/pm/view'
import { EditorContent, useEditor, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useRef, useState, type ReactNode } from 'react'

export async function uploadImage(file: File): Promise<string> {
  const body = new FormData()
  body.append('file', file)
  const response = await fetch('/api/admin/upload', { method: 'POST', body })
  const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string }
  if (!response.ok || !data.url) throw new Error(data.error || 'Upload failed.')
  return data.url
}

function normaliseUrl(value: string): string {
  const url = value.trim()
  if (!url) return ''
  if (/^(https?:|mailto:|\/|#)/i.test(url)) return url
  return `https://${url}`
}

// Content pasted from Word, Google Docs or a web page, reshaped into what the editor supports.
function cleanPastedHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')

  // The post title is the page's only H1, so a pasted H1 becomes a section heading.
  doc.querySelectorAll('h1').forEach((h1) => {
    const h2 = doc.createElement('h2')
    h2.innerHTML = h1.innerHTML
    h1.replaceWith(h2)
  })

  // Tables are not supported. Keep each row as its own readable line instead of fused text.
  doc.querySelectorAll('table').forEach((table) => {
    const rows = [...table.querySelectorAll('tr')].flatMap((row) => {
      const cells = [...row.querySelectorAll('th,td')].map((cell) => cell.textContent?.trim() ?? '')
      const text = cells.filter(Boolean).join(' | ')
      if (!text) return []
      const p = doc.createElement('p')
      p.textContent = text
      return [p]
    })
    table.replaceWith(...rows)
  })

  return doc.body.innerHTML
}

function ToolButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={active ? 'rte-btn is-active' : 'rte-btn'}
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      // Keep the text selection in the editor when a toolbar button is pressed.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

type Panel = 'link' | 'image' | null

function Toolbar({ editor, uploadsEnabled }: { editor: Editor; uploadsEnabled: boolean }) {
  const [panel, setPanel] = useState<Panel>(null)
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)

  const chain = () => editor.chain().focus()

  // Typing in a panel's inputs moves focus out of the editor, so the panel acts on the range that
  // was selected when it opened rather than on whatever the editor reports afterwards.
  const [saved, setSaved] = useState({ from: 0, to: 0, onLink: false, onImage: false })
  const atSavedRange = () => editor.chain().focus().setTextSelection({ from: saved.from, to: saved.to })

  function open(next: Exclude<Panel, null>) {
    const { from, to } = editor.state.selection
    const onImage = editor.isActive('image')
    setSaved({ from, to, onLink: editor.isActive('link'), onImage })
    setError('')
    if (next === 'link') {
      setUrl((editor.getAttributes('link').href as string | undefined) ?? '')
    } else {
      // With an image selected, the panel edits that image (its address or its description).
      const current = onImage ? editor.getAttributes('image') : {}
      setUrl((current.src as string | undefined) ?? '')
      setAlt((current.alt as string | undefined) ?? '')
    }
    setPanel(panel === next ? null : next)
  }

  function applyLink() {
    const href = normaliseUrl(url)
    if (!href) {
      atSavedRange().extendMarkRange('link').unsetLink().run()
    } else if (saved.from === saved.to && !saved.onLink) {
      // Nothing selected: insert the address itself as the link text.
      atSavedRange()
        .insertContent({ type: 'text', text: url.trim(), marks: [{ type: 'link', attrs: { href } }] })
        .run()
    } else {
      atSavedRange().extendMarkRange('link').setLink({ href }).run()
    }
    setPanel(null)
  }

  function insertImage() {
    const src = normaliseUrl(url)
    if (!src) return setError('Add an image URL or upload a file first.')
    if (saved.onImage) {
      editor.chain().focus().setNodeSelection(saved.from).updateAttributes('image', { src, alt: alt.trim() }).run()
    } else {
      atSavedRange().setImage({ src, alt: alt.trim() }).run()
    }
    setPanel(null)
  }

  async function onFile(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setError('')
    try {
      setUrl(await uploadImage(file))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setBusy(false)
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  return (
    <>
      <div className="rte-toolbar" role="toolbar" aria-label="Formatting">
        <ToolButton label="Bold" active={editor.isActive('bold')} onClick={() => chain().toggleBold().run()}>
          <b>B</b>
        </ToolButton>
        <ToolButton label="Italic" active={editor.isActive('italic')} onClick={() => chain().toggleItalic().run()}>
          <i>I</i>
        </ToolButton>
        <ToolButton
          label="Underline"
          active={editor.isActive('underline')}
          onClick={() => chain().toggleUnderline().run()}
        >
          <u>U</u>
        </ToolButton>
        <ToolButton label="Strikethrough" active={editor.isActive('strike')} onClick={() => chain().toggleStrike().run()}>
          <s>S</s>
        </ToolButton>
        <span className="rte-sep" aria-hidden="true" />
        {([2, 3, 4] as const).map((level) => (
          <ToolButton
            key={level}
            label={`Heading ${level}`}
            active={editor.isActive('heading', { level })}
            onClick={() => chain().toggleHeading({ level }).run()}
          >
            H{level}
          </ToolButton>
        ))}
        <span className="rte-sep" aria-hidden="true" />
        <ToolButton
          label="Bullet list"
          active={editor.isActive('bulletList')}
          onClick={() => chain().toggleBulletList().run()}
        >
          • List
        </ToolButton>
        <ToolButton
          label="Numbered list"
          active={editor.isActive('orderedList')}
          onClick={() => chain().toggleOrderedList().run()}
        >
          1. List
        </ToolButton>
        <ToolButton label="Quote" active={editor.isActive('blockquote')} onClick={() => chain().toggleBlockquote().run()}>
          “ Quote
        </ToolButton>
        <ToolButton label="Code block" active={editor.isActive('codeBlock')} onClick={() => chain().toggleCodeBlock().run()}>
          {'</>'}
        </ToolButton>
        <ToolButton label="Divider line" onClick={() => chain().setHorizontalRule().run()}>
          ―
        </ToolButton>
        <span className="rte-sep" aria-hidden="true" />
        <ToolButton label="Link" active={editor.isActive('link') || panel === 'link'} onClick={() => open('link')}>
          Link
        </ToolButton>
        <ToolButton label="Image" active={panel === 'image'} onClick={() => open('image')}>
          Image
        </ToolButton>
        <span className="rte-sep" aria-hidden="true" />
        <ToolButton label="Undo" disabled={!editor.can().undo()} onClick={() => chain().undo().run()}>
          ↶
        </ToolButton>
        <ToolButton label="Redo" disabled={!editor.can().redo()} onClick={() => chain().redo().run()}>
          ↷
        </ToolButton>
      </div>

      {panel === 'link' && (
        <div className="rte-panel">
          <input
            className="input"
            type="url"
            inputMode="url"
            placeholder="https://example.com or /blog/another-post"
            aria-label="Link URL"
            value={url}
            autoFocus
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                applyLink()
              }
            }}
          />
          <button type="button" className="btn btn--xs" onClick={applyLink}>
            {url.trim() ? 'Apply link' : 'Remove link'}
          </button>
          <button type="button" className="btn btn--ghost btn--xs" onClick={() => setPanel(null)}>
            Cancel
          </button>
        </div>
      )}

      {panel === 'image' && (
        <div className="rte-panel">
          {uploadsEnabled && (
            <>
              <input
                ref={fileInput}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                hidden
                onChange={(e) => onFile(e.target.files?.[0])}
              />
              <button
                type="button"
                className="btn btn--ghost btn--xs"
                disabled={busy}
                onClick={() => fileInput.current?.click()}
              >
                {busy ? 'Uploading…' : 'Upload from device'}
              </button>
            </>
          )}
          <input
            className="input"
            type="url"
            inputMode="url"
            placeholder={uploadsEnabled ? 'or paste an image URL' : 'Paste an image URL'}
            aria-label="Image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Describe the image (alt text)"
            aria-label="Image description (alt text)"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />
          <button type="button" className="btn btn--xs" disabled={busy} onClick={insertImage}>
            {saved.onImage ? 'Update image' : 'Insert image'}
          </button>
          <button type="button" className="btn btn--ghost btn--xs" onClick={() => setPanel(null)}>
            Cancel
          </button>
          {error && (
            <p className="alert alert--err" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </>
  )
}

export function RichTextEditor({
  initialContent,
  onChange,
  uploadsEnabled,
}: {
  initialContent: string
  onChange: (html: string) => void
  uploadsEnabled: boolean
}) {
  const [status, setStatus] = useState<{ kind: 'busy' | 'err'; text: string } | null>(null)

  // Image files pasted (a screenshot) or dragged in from the desktop are uploaded and inserted.
  // Returns true when the event was handled, so the browser does not also try to open the file.
  function receiveFiles(view: EditorView, files: FileList | null | undefined, dropPos?: number): boolean {
    const images = Array.from(files ?? []).filter((file) => file.type.startsWith('image/'))
    if (images.length === 0) return false
    if (!uploadsEnabled) {
      setStatus({
        kind: 'err',
        text: 'Image uploads are not connected yet, so this image cannot be saved. Use the Image button and paste an image URL instead.',
      })
      return true
    }

    setStatus({ kind: 'busy', text: images.length > 1 ? `Uploading ${images.length} images…` : 'Uploading image…' })
    void (async () => {
      try {
        let pos = dropPos
        for (const file of images) {
          const src = await uploadImage(file)
          if (view.isDestroyed) return
          const tr = view.state.tr
          if (pos !== undefined) {
            tr.setSelection(TextSelection.near(tr.doc.resolve(Math.min(pos, tr.doc.content.size))))
            pos = undefined
          }
          tr.replaceSelectionWith(view.state.schema.nodes.image.create({ src, alt: '' }))
          view.dispatch(tr.scrollIntoView())
        }
        setStatus(null)
      } catch (err) {
        setStatus({ kind: 'err', text: err instanceof Error ? err.message : 'Upload failed.' })
      }
    })()
    return true
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
      Image.configure({ allowBase64: false }),
      Placeholder.configure({ placeholder: 'Start writing your article…' }),
    ],
    content: initialContent,
    // Next.js renders this component on the server first; TipTap must wait for the browser.
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: { class: 'prose rte-content', 'aria-label': 'Article content' },
      transformPastedHTML: cleanPastedHtml,
      handlePaste: (view, event) => {
        const data = event.clipboardData
        // Text copied from Word also carries a picture of itself, so a paste only counts as an
        // image when it brings no text at all.
        if (!data || data.getData('text/html') || data.getData('text/plain')) return false
        return receiveFiles(view, data.files)
      },
      handleDrop: (view, event, _slice, moved) => {
        if (moved) return false
        const at = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos
        return receiveFiles(view, event.dataTransfer?.files, at)
      },
    },
    onUpdate: ({ editor: current }) => onChange(current.isEmpty ? '' : current.getHTML()),
  })

  return (
    <div className="rte">
      <div className="rte-head">
        {editor ? <Toolbar editor={editor} uploadsEnabled={uploadsEnabled} /> : <div className="rte-toolbar" />}
        {status && (
          <p className={`rte-status rte-status--${status.kind}`} role={status.kind === 'err' ? 'alert' : 'status'}>
            {status.text}
            {status.kind === 'err' && (
              <button type="button" className="link-btn" onClick={() => setStatus(null)}>
                Dismiss
              </button>
            )}
          </p>
        )}
      </div>
      <EditorContent editor={editor} />
      {editor && (
        <div className="rte-foot">
          {editor.getText().trim().split(/\s+/).filter(Boolean).length} words
        </div>
      )}
    </div>
  )
}
