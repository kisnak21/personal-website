import { createServerClient, createAdminClient } from '../supabase/server'
import type { Skill } from '../types'

export async function getSkills(): Promise<Skill[]> {
  const client = createServerClient()
  const { data, error } = await client
    .from('skills')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })

  if (error) throw new Error(`Error fetching skills: ${error.message}`)
  return data as Skill[]
}

export async function getAllSkillsAdmin(): Promise<Skill[]> {
  const client = createAdminClient()
  const { data, error } = await client
    .from('skills')
    .select('*')
    .order('category', { ascending: true })
    .order('sort_order', { ascending: true })

  if (error) throw new Error(`Error fetching skills: ${error.message}`)
  return data as Skill[]
}

export async function createSkill(skillData: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) {
  const client = createAdminClient()
  const { data, error } = await client.from('skills').insert([skillData]).select().single()

  if (error) throw new Error(`Error creating skill: ${error.message}`)
  return data as Skill
}

export async function updateSkill(id: string, skillData: Partial<Skill>) {
  const client = createAdminClient()
  const { data, error } = await client
    .from('skills')
    .update(skillData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(`Error updating skill: ${error.message}`)
  return data as Skill
}

export async function deleteSkill(id: string) {
  const client = createAdminClient()
  const { error } = await client.from('skills').delete().eq('id', id)

  if (error) throw new Error(`Error deleting skill: ${error.message}`)
  return true
}
