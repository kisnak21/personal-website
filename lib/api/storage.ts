import { createAdminClient } from '../supabase/server'

export async function uploadImage(file: File, bucket: string, path: string) {
  const client = createAdminClient()
  const { error } = await client.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) throw new Error(`Error uploading image: ${error.message}`)

  const { data } = client.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteImage(imageUrl: string, bucket: string) {
  const client = createAdminClient()
  const filePath = imageUrl.split(`/${bucket}/`)[1]

  if (!filePath) throw new Error('Invalid image URL')

  const { error } = await client.storage.from(bucket).remove([filePath])
  if (error) throw new Error(`Error deleting image: ${error.message}`)
  return true
}
