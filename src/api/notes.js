import { supabase, supabaseAdmin } from './supabase.js'

export async function getNotes({ published = true, limit, projectId, all = false } = {}) {
  try {
    const client = (all && supabaseAdmin) ? supabaseAdmin : supabase
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
    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching notes:', error)
    return { data: null, error }
  }
}

export async function getNoteBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*, projects(id, title, slug, github_url, demo_url)')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error(`Error fetching note with slug ${slug}:`, error)
    return { data: null, error }
  }
}

export async function createNote(noteData) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('notes')
      .insert([noteData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating note:', error)
    return { data: null, error }
  }
}

export async function updateNote(id, noteData) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('notes')
      .update(noteData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating note:', error)
    return { data: null, error }
  }
}

export async function deleteNote(id) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const { error } = await supabaseAdmin
      .from('notes')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { data: true, error: null }
  } catch (error) {
    console.error('Error deleting note:', error)
    return { data: null, error }
  }
}

export async function uploadNoteCoverImage(file, slug) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const timestamp = Date.now()
    const fileExt = file.name.split('.').pop()
    const filePath = `notes/${slug}-${timestamp}.${fileExt}`

    const { error } = await supabaseAdmin.storage
      .from('note-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    const { data: urlData } = supabaseAdmin.storage
      .from('note-images')
      .getPublicUrl(filePath)

    return { data: urlData.publicUrl, error: null }
  } catch (error) {
    console.error('Error uploading note cover image:', error)
    return { data: null, error }
  }
}

export async function deleteNoteCoverImage(imageUrl) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const filePath = imageUrl.split('/note-images/')[1]
    if (!filePath) throw new Error('Invalid image URL')

    const { error } = await supabaseAdmin.storage
      .from('note-images')
      .remove([filePath])

    if (error) throw error
    return { data: true, error: null }
  } catch (error) {
    console.error('Error deleting note cover image:', error)
    return { data: null, error }
  }
}
