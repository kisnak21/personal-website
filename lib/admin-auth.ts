import { createHash } from 'crypto'
import { createAdminClient } from './supabase/server'

export async function verifyAdminKey(key: string) {
  const client = createAdminClient()

  const keyHash = createHash('sha256').update(key).digest('hex')

  const { data, error } = await client
    .from('api_keys')
    .select('id, name')
    .eq('key_hash', keyHash)
    .eq('active', true)
    .single()

  if (error || !data) {
    return { valid: false as const, data: null }
  }

  await client.from('api_keys').update({ last_used_at: new Date().toISOString() }).eq('id', data.id)

  return { valid: true as const, data }
}
