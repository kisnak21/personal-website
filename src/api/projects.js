import { supabase } from './supabase.js'

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
