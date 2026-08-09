import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getAllSkillsAdmin, createSkill } from '@/lib/api/skills'

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const skills = await getAllSkillsAdmin()
    return NextResponse.json(skills)
  } catch (error) {
    console.error('GET /api/admin/skills error:', error)
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const skill = await createSkill(body)
    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error('POST /api/admin/skills error:', error)
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}
