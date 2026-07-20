import { supabase, supabaseAdmin } from './supabase.js'

export async function getSkills() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching skills:', error)
    return { data: null, error }
  }
}

export async function getSkillsByCategory(category) {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('category', category)
      .order('sort_order', { ascending: true })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error(`Error fetching skills for category ${category}:`, error)
    return { data: null, error }
  }
}

export async function getSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')

    if (error) throw error

    const settings = {}
    data.forEach(({ key, value }) => {
      settings[key] = value
    })

    return { data: settings, error: null }
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return { data: null, error }
  }
}

export async function createSkill(skillData) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('skills')
      .insert([skillData])
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error creating skill:', error)
    return { data: null, error }
  }
}

export async function updateSkill(id, skillData) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('skills')
      .update(skillData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error updating skill:', error)
    return { data: null, error }
  }
}

export async function deleteSkill(id) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const { error } = await supabaseAdmin
      .from('skills')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { data: true, error: null }
  } catch (error) {
    console.error('Error deleting skill:', error)
    return { data: null, error }
  }
}

export async function updateSiteSetting(key, value) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Admin client not available') }
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' })
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error updating site setting:', error)
    return { data: null, error }
  }
}
