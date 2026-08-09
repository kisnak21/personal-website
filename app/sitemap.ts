import type { MetadataRoute } from 'next'
import { getNotes } from '@/lib/api/notes'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kresna-portfolio.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/notes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/skills`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  try {
    const notes = await getNotes()
    return [
      ...staticRoutes,
      ...notes.map((note) => ({
        url: `${baseUrl}/notes/${note.slug}`,
        lastModified: new Date(note.updated_at || note.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ]
  } catch {
    return staticRoutes
  }
}
