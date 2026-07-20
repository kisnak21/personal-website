import { supabase } from './supabase.js'

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
