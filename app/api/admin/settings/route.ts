import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateSiteSetting } from '@/lib/api/settings'

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { key, value } = body

    if (!key || typeof key !== 'string') {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const setting = await updateSiteSetting(key, String(value))
    return NextResponse.json(setting)
  } catch (error) {
    console.error('POST /api/admin/settings error:', error)
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 })
  }
}
