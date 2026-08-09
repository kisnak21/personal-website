import { getSession } from './auth'
import type { Session } from './types'

export async function requireAdmin(): Promise<Session | null> {
  return await getSession()
}
