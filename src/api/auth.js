import { supabaseAdmin } from './supabase.js'

async function hashKey(key) {
  const encoder = new TextEncoder()
  const data = encoder.encode(key)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyAdminKey(key) {
  if (!supabaseAdmin) {
    return { valid: false, error: 'Admin client not available' }
  }

  try {
    const keyHash = await hashKey(key)

    const { data, error } = await supabaseAdmin
      .from('api_keys')
      .select('id, name')
      .eq('key_hash', keyHash)
      .eq('active', true)
      .single()

    if (error || !data) {
      return { valid: false, error: 'Invalid API key' }
    }

    await supabaseAdmin
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', data.id)

    return { valid: true, data }
  } catch (error) {
    console.error('Error verifying admin key:', error)
    return { valid: false, error: error.message }
  }
}

export function getStoredAdminKey() {
  return localStorage.getItem('admin_key')
}

export function storeAdminKey(key) {
  localStorage.setItem('admin_key', key)
}

export function clearAdminKey() {
  localStorage.removeItem('admin_key')
}
