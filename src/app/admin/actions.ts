'use server'

import { revalidatePath, updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSession, destroySession, isAdmin, isAuthConfigured, requireAdmin, verifyPassword } from '@/lib/auth'
import { StorageNotConfiguredError } from '@/lib/kv'
import { deleteMessage, setMessageRead } from '@/lib/messages'
import { deletePost, POSTS_TAG, savePost, ValidationError, type PostInput, type PostStatus } from '@/lib/posts'
import { clearHits, isLimited, recordHit } from '@/lib/rate-limit'

/* ---------- Auth ---------- */

export type LoginState = { error: string } | null

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAuthConfigured()) {
    return { error: 'Admin login is not set up yet. Add the ADMIN_PASSWORD environment variable and redeploy.' }
  }
  if (await isLimited('login', 5)) {
    return { error: 'Too many failed attempts. Please wait 15 minutes and try again.' }
  }

  const password = String(formData.get('password') ?? '')
  if (!verifyPassword(password)) {
    await recordHit('login', 15 * 60 * 1000)
    await new Promise((resolve) => setTimeout(resolve, 600))
    return { error: 'Incorrect password.' }
  }

  await clearHits('login')
  await createSession()
  redirect('/admin')
}

export async function logoutAction(): Promise<void> {
  await destroySession()
  redirect('/admin/login')
}

/* ---------- Posts ---------- */

// Published content appears on the home page, blog, tag pages, sitemap and feeds — refresh them all.
function refreshSite() {
  updateTag(POSTS_TAG)
  revalidatePath('/', 'layout')
}

export type SavePostResult =
  | { ok: true; post: { id: string; slug: string; status: PostStatus } }
  | { ok: false; error: string }

const str = (value: unknown) => (typeof value === 'string' ? value : '')

export async function savePostAction(input: PostInput): Promise<SavePostResult> {
  // Return an error instead of redirecting so unsaved writing in the editor is not lost.
  if (!(await isAdmin())) {
    return { ok: false, error: 'Your session has expired. Open /admin/login in a new tab, sign in, then save again.' }
  }

  try {
    const post = await savePost({
      id: str(input?.id) || undefined,
      title: str(input?.title),
      slug: str(input?.slug),
      excerpt: str(input?.excerpt),
      content: str(input?.content),
      coverImage: str(input?.coverImage),
      coverAlt: str(input?.coverAlt),
      tags: Array.isArray(input?.tags) ? input.tags.map(str) : [],
      author: str(input?.author),
      status: input?.status === 'published' ? 'published' : 'draft',
      metaTitle: str(input?.metaTitle),
      metaDescription: str(input?.metaDescription),
    })
    refreshSite()
    return { ok: true, post: { id: post.id, slug: post.slug, status: post.status } }
  } catch (err) {
    if (err instanceof ValidationError || err instanceof StorageNotConfiguredError) {
      return { ok: false, error: err.message }
    }
    console.error('Saving post failed', err)
    return { ok: false, error: 'Could not save the post. Please try again.' }
  }
}

export async function deletePostAction(id: string): Promise<void> {
  await requireAdmin()
  await deletePost(id)
  refreshSite()
  redirect('/admin')
}

/* ---------- Messages ---------- */

export async function setMessageReadAction(id: string, read: boolean): Promise<void> {
  await requireAdmin()
  await setMessageRead(id, read)
  revalidatePath('/admin/messages')
}

export async function deleteMessageAction(id: string): Promise<void> {
  await requireAdmin()
  await deleteMessage(id)
  revalidatePath('/admin/messages')
}
