import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateProject, deleteProject } from '@/lib/api/projects'

type Context = { params: Promise<{ id: string }> }

export async function PUT(request: Request, { params }: Context) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const project = await updateProject(id, body)
    return NextResponse.json(project)
  } catch (error) {
    console.error('PUT /api/admin/projects error:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await deleteProject(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/admin/projects error:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
