import { NextResponse } from 'next/server'
import { verifyAdminKey } from '@/lib/admin-auth'
import { login } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { key } = await request.json()

    if (!key || typeof key !== 'string' || key.length === 0) {
      return NextResponse.json({ error: 'Admin key is required' }, { status: 400 })
    }

    const result = await verifyAdminKey(key)

    if (!result.valid) {
      return NextResponse.json({ error: 'Invalid admin key' }, { status: 401 })
    }

    await login(result.data)

    return NextResponse.json({ success: true, user: { name: result.data.name } })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
