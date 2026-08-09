import { getNotes } from '@/lib/api/notes'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kisnaknugroho.vercel.app'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildRss(items: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Kresna S. - Notes & Dev Blog</title>
  <link>${siteUrl}</link>
  <description>Catatan proses belajar dan pemikiran dalam membangun proyek-proyek pengembangan software.</description>
  <language>id</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`
}

function buildItem(note: {
  title: string
  slug: string
  excerpt?: string
  content: string
  created_at: string
  updated_at?: string
  tags?: string[]
}): string {
  const description =
    note.excerpt ||
    note.content
      .replace(/[#*`>\[\]!-]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 300)

  const categories = (note.tags || [])
    .map((tag) => `    <category>${escapeXml(tag)}</category>`)
    .join('\n')

  return `  <item>
    <title>${escapeXml(note.title)}</title>
    <link>${siteUrl}/notes/${note.slug}</link>
    <guid isPermaLink="true">${siteUrl}/notes/${note.slug}</guid>
    <pubDate>${new Date(note.created_at).toUTCString()}</pubDate>
    <description><![CDATA[${escapeXml(description)}]]></description>
${categories}  </item>`
}

export async function GET() {
  try {
    const notes = await getNotes({ limit: 50 })
    const items = notes.map(buildItem).join('\n')
    return new Response(buildRss(items), {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch {
    return new Response(buildRss(''), {
      headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    })
  }
}
