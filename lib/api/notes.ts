import { createServerClient, createAdminClient } from '../supabase/server'
import type { Note } from '../types'

export async function getNotes({
  projectId,
  limit,
  all = false,
}: {
  projectId?: string
  limit?: number
  all?: boolean
} = {}): Promise<Note[]> {
  const client = all ? createAdminClient() : createServerClient()
  let query = client
    .from('notes')
    .select('*, projects(id, title, slug)')
    .order('created_at', { ascending: false })

  if (!all) {
    query = query.eq('published', true)
  }

  if (projectId) {
    query = query.eq('project_id', projectId)
  }

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) throw new Error(`Error fetching notes: ${error.message}`)
  return data as Note[]
}

export async function getNoteBySlug(slug: string): Promise<Note | null> {
  const client = createServerClient()
  const { data, error } = await client
    .from('notes')
    .select('*, projects(id, title, slug, github_url, demo_url)')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) return null
  return data as Note
}

export async function getAllNotesAdmin(): Promise<Note[]> {
  const client = createAdminClient()
  const { data, error } = await client
    .from('notes')
    .select('*, projects(id, title, slug)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Error fetching notes: ${error.message}`)
  return data as Note[]
}

export async function createNote(noteData: Omit<Note, 'id' | 'created_at' | 'updated_at'>) {
  const client = createAdminClient()
  const { data, error } = await client.from('notes').insert([noteData]).select().single()

  if (error) throw new Error(`Error creating note: ${error.message}`)
  return data as Note
}

export async function updateNote(id: string, noteData: Partial<Note>) {
  const client = createAdminClient()
  const { data, error } = await client
    .from('notes')
    .update(noteData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(`Error updating note: ${error.message}`)
  return data as Note
}

export async function deleteNote(id: string) {
  const client = createAdminClient()
  const { error } = await client.from('notes').delete().eq('id', id)

  if (error) throw new Error(`Error deleting note: ${error.message}`)
  return true
}
