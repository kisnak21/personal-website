import { supabaseAdmin } from './supabase.js'

export async function testApiKeyExists() {
  if (!supabaseAdmin) {
    console.error('supabaseAdmin not available')
    return
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('api_keys')
      .select('*')

    console.log('API Keys in database:', data)
    console.log('Error:', error)
    return { data, error }
  } catch (err) {
    console.error('Error checking API keys:', err)
    return { data: null, error: err }
  }
}
