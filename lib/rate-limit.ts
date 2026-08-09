import type { NextRequest } from 'next/server'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5

const attempts = new Map<string, RateLimitEntry>()

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

export function checkRateLimit(key: string): {
  allowed: boolean
  retryAfterSeconds: number
} {
  const now = Date.now()
  const entry = attempts.get(key)

  if (!entry || now >= entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  entry.count += 1
  return { allowed: true, retryAfterSeconds: 0 }
}

export function clearRateLimit(key: string) {
  attempts.delete(key)
}
