import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { uploadImage } from '@/lib/api/storage'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ALLOWED_BUCKETS = ['project-images', 'note-images']

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const bucket = formData.get('bucket') as string | null
    const pathPrefix = formData.get('path') as string | null

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    if (!bucket || !ALLOWED_BUCKETS.includes(bucket)) {
      return NextResponse.json({ error: 'Invalid storage bucket' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'File type must be JPEG, PNG, or WebP' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File must be less than 2MB' }, { status: 400 })
    }

    if (!pathPrefix) {
      return NextResponse.json({ error: 'Path prefix is required' }, { status: 400 })
    }

    const sanitizedPrefix = pathPrefix.replace(/[^a-z0-9-]/gi, '').toLowerCase()
    if (!sanitizedPrefix) {
      return NextResponse.json({ error: 'Invalid path prefix' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop() || 'jpg'
    const filePath = `${sanitizedPrefix}-${Date.now()}.${fileExt}`

    const publicUrl = await uploadImage(file, bucket, filePath)
    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error('POST /api/admin/upload error:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
