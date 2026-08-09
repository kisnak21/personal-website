import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAdminKey } from '@/lib/admin-auth'
import { login } from '@/lib/auth'
import { checkRateLimit, clearRateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const rate = checkRateLimit(`login:${ip}`)

  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
    )
  }

  try {
    const { key } = await request.json()

    if (!key || typeof key !== 'string' || key.length === 0) {
      return NextResponse.json({ error: 'Admin key is required' }, { status: 400 })
    }

    const result = await verifyAdminKey(key)

    if (!result.valid) {
      return NextResponse.json({ error: 'Invalid admin key' }, { status: 401 })
    }

    clearRateLimit(`login:${ip}`)
    await login(result.data)

    return NextResponse.json({ success: true, user: { name: result.data.name } })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
