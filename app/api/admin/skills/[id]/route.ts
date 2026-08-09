import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateSkill, deleteSkill } from '@/lib/api/skills'

type Context = { params: Promise<{ id: string }> }

export async function PUT(request: Request, { params }: Context) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const skill = await updateSkill(id, body)
    return NextResponse.json(skill)
  } catch (error) {
    console.error('PUT /api/admin/skills error:', error)
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await deleteSkill(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/admin/skills error:', error)
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}
