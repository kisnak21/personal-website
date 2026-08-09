import { createServerClient, createAdminClient } from '../supabase/server'
import type { Project } from '../types'

export async function getProjects({
  featured,
  limit,
  all = false,
}: {
  featured?: boolean
  limit?: number
  all?: boolean
} = {}): Promise<Project[]> {
  const client = all ? createAdminClient() : createServerClient()
  let query = client.from('projects').select('*').order('sort_order', { ascending: true })

  if (!all) {
    query = query.eq('published', true)
  }

  if (featured !== undefined) {
    query = query.eq('featured', featured)
  }

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) throw new Error(`Error fetching projects: ${error.message}`)

  return data as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const client = createServerClient()
  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) return null
  return data as Project
}

export async function createProject(projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const client = createAdminClient()
  const { data, error } = await client.from('projects').insert([projectData]).select().single()

  if (error) throw new Error(`Error creating project: ${error.message}`)
  return data as Project
}

export async function updateProject(id: string, projectData: Partial<Project>) {
  const client = createAdminClient()
  const { data, error } = await client
    .from('projects')
    .update(projectData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(`Error updating project: ${error.message}`)
  return data as Project
}

export async function deleteProject(id: string) {
  const client = createAdminClient()
  const { error } = await client.from('projects').delete().eq('id', id)

  if (error) throw new Error(`Error deleting project: ${error.message}`)
  return true
}
