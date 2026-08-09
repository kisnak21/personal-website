import { ImageResponse } from 'next/og'
import { getNoteBySlug } from '@/lib/api/notes'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Kresna S. - Dev Blog Note'
export const revalidate = 60

function truncate(text: string, maxLength: number): string {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= maxLength) return cleaned
  return cleaned.slice(0, maxLength).trimEnd() + '…'
}

export default async function ogImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const note = await getNoteBySlug(slug)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kisnaknugroho.vercel.app'

  if (!note) {
    return new ImageResponse(
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f0f0f',
          color: '#ffffff',
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        Note Not Found
      </div>,
      size
    )
  }

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 55%, #16213e 100%)',
        color: '#ffffff',
        padding: 64,
        fontFamily: 'monospace',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          color: '#8ab4f8',
          fontSize: 28,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: '#8ab4f8',
            boxShadow: '0 0 24px #8ab4f8',
          }}
        />
        KRESNA S. — DEV NOTES
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h1
          style={{
            fontSize: 64,
            lineHeight: 1.15,
            fontWeight: 700,
            margin: 0,
            maxWidth: 1000,
            overflow: 'hidden',
          }}
        >
          {truncate(note.title, 90)}
        </h1>
        <p
          style={{
            fontSize: 28,
            lineHeight: 1.5,
            color: '#a8a8b3',
            margin: 0,
            maxWidth: 900,
          }}
        >
          {truncate(note.excerpt || note.content.substring(0, 160), 170)}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#6b6b76',
          fontSize: 24,
        }}
      >
        <span>{new Date(note.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        <span>{siteUrl.replace('https://', '')}</span>
      </div>
    </div>,
    size
  )
}
