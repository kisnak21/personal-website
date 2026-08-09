import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateNote, deleteNote } from '@/lib/api/notes'

type Context = { params: Promise<{ id: string }> }

export async function PUT(request: Request, { params }: Context) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const note = await updateNote(id, body)
    return NextResponse.json(note)
  } catch (error) {
    console.error('PUT /api/admin/notes error:', error)
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await deleteNote(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/admin/notes error:', error)
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
  }
}
