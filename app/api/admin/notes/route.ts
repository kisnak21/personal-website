import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getAllNotesAdmin, createNote } from '@/lib/api/notes'

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const notes = await getAllNotesAdmin()
    return NextResponse.json(notes)
  } catch (error) {
    console.error('GET /api/admin/notes error:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const note = await createNote(body)
    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    console.error('POST /api/admin/notes error:', error)
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
  }
}
