import { randomUUID } from 'node:crypto'
import { getKV } from './kv'

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

const KEY = 'cms:messages'
const MAX_MESSAGES = 500

export async function listMessages(): Promise<ContactMessage[]> {
  const all = await getKV().hgetall<ContactMessage>(KEY)
  return Object.values(all).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function addMessage(
  input: Pick<ContactMessage, 'name' | 'email' | 'subject' | 'message'>
): Promise<void> {
  const kv = getKV()
  const message: ContactMessage = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  }
  await kv.hset(KEY, message.id, message)

  // Keep the inbox bounded so a spam run can't grow it forever.
  const all = await listMessages()
  for (const old of all.slice(MAX_MESSAGES)) await kv.hdel(KEY, old.id)
}

export async function setMessageRead(id: string, read: boolean): Promise<void> {
  const kv = getKV()
  const all = await kv.hgetall<ContactMessage>(KEY)
  const message = all[id]
  if (message) await kv.hset(KEY, id, { ...message, read })
}

export async function deleteMessage(id: string): Promise<void> {
  await getKV().hdel(KEY, id)
}
