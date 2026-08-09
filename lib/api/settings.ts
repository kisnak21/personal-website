import { createServerClient, createAdminClient } from '../supabase/server'
import type { SiteSettings } from '../types'

export async function getSiteSettings(): Promise<SiteSettings> {
  const client = createServerClient()
  const { data, error } = await client.from('site_settings').select('*')

  if (error) throw new Error(`Error fetching site settings: ${error.message}`)

  const settings: SiteSettings = {}
  data.forEach(({ key, value }) => {
    settings[key] = value
  })

  return settings
}

export async function updateSiteSetting(key: string, value: string) {
  const client = createAdminClient()
  const { data, error } = await client
    .from('site_settings')
    .upsert({ key, value }, { onConflict: 'key' })
    .select()
    .single()

  if (error) throw new Error(`Error updating site setting: ${error.message}`)
  return data
}
