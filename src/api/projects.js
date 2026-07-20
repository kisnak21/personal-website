import { supabase, supabaseAdmin } from './supabase.js'

export async function getProjects({ featured, limit } = {}) {
  try {
    let query = supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })

    if (featured !== undefined) {
      query = query.eq('featured', featured)
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return { data: null, error }
  }
}

export async function getProjectBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error)
    return { data: null, error }
  }
}

export async function getAllProjects() {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching all projects:', error)
    return { data: null, error }
  }
}

export async function createProject(projectData) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([projectData])
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error creating project:', error)
    return { data: null, error }
  }
}

export async function updateProject(id, projectData) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error updating project:', error)
    return { data: null, error }
  }
}

export async function deleteProject(id) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { data: true, error: null }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { data: null, error }
  }
}

export async function uploadProjectImage(file, slug) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const timestamp = Date.now()
    const fileExt = file.name.split('.').pop()
    const filePath = `projects/${slug}-${timestamp}.${fileExt}`

    const { error } = await supabaseAdmin.storage
      .from('project-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    const { data: urlData } = supabaseAdmin.storage
      .from('project-images')
      .getPublicUrl(filePath)

    return { data: urlData.publicUrl, error: null }
  } catch (error) {
    console.error('Error uploading project image:', error)
    return { data: null, error }
  }
}

export async function deleteProjectImage(imageUrl) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const filePath = imageUrl.split('/project-images/')[1]

    if (!filePath) {
      throw new Error('Invalid image URL')
    }

    const { error } = await supabaseAdmin.storage
      .from('project-images')
      .remove([filePath])

    if (error) throw error

    return { data: true, error: null }
  } catch (error) {
    console.error('Error deleting project image:', error)
    return { data: null, error }
  }
}
