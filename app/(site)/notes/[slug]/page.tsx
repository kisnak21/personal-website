import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNoteBySlug } from '@/lib/api/notes'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { getTagClassName } from '@/content/projectsData'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const note = await getNoteBySlug(slug)

  if (!note) {
    return { title: 'Note Not Found', robots: { index: false } }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kresna-portfolio.vercel.app'
  const description = (note.excerpt || note.content.substring(0, 160))
    .replace(/[#*`>\[\]!-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return {
    title: note.title,
    description,
    alternates: {
      canonical: `/notes/${note.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `${siteUrl}/notes/${note.slug}`,
      title: note.title,
      description,
      publishedTime: note.created_at,
      images: note.cover_image_url ? [note.cover_image_url] : ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: note.title,
      description,
      images: note.cover_image_url ? [note.cover_image_url] : ['/og-image.png'],
    },
  }
}

export default async function NoteDetailPage({ params }: PageProps) {
  const { slug } = await params
  const note = await getNoteBySlug(slug)

  if (!note) notFound()

  const formattedDate = new Date(note.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      {/* Editor Tab Strip */}
      <div className='flex bg-surface-container-low border-b border-outline-variant h-10 items-center px-margin-mobile md:px-margin-desktop'>
        <div className='bg-surface px-4 h-full flex items-center gap-2 border-r border-outline-variant border-t-2 border-t-primary'>
          <span className='material-symbols-outlined text-primary text-[14px]'>article</span>
          <span className='font-code-sm text-code-sm text-primary'>{note.slug}.md</span>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className='px-margin-mobile md:px-margin-desktop py-2 flex items-center gap-2 text-on-surface-variant font-code-sm text-code-sm border-b border-outline-variant bg-surface-container-lowest/50 overflow-x-auto'>
        <Link href='/notes' className='hover:text-primary transition-colors flex items-center gap-1'>
          <span className='material-symbols-outlined text-[14px]'>arrow_back</span>
          notes
        </Link>
        <span className='material-symbols-outlined text-[14px]'>chevron_right</span>
        <span className='text-on-surface truncate'>{note.slug}.md</span>
      </div>

      <article className='max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop py-10'>
        <header className='mb-8 border-b border-outline-variant pb-8'>
          <div className='flex flex-wrap items-center gap-3 text-on-surface-variant font-code-sm text-code-sm mb-4'>
            <span className='flex items-center gap-1'>
              <span className='material-symbols-outlined text-[16px]'>calendar_today</span>
              {formattedDate}
            </span>

            {note.projects && (
              <>
                <span>•</span>
                <Link
                  href='/projects'
                  className='text-primary hover:underline flex items-center gap-1 font-medium bg-primary/10 px-2 py-0.5 rounded'
                >
                  <span className='material-symbols-outlined text-[16px]'>folder_special</span>
                  Project: {note.projects.title}
                </Link>
              </>
            )}
          </div>

          <h1 className='font-headline-md text-headline-md md:text-display-sm md:font-display-sm text-on-surface mb-6 leading-tight'>
            {note.title}
          </h1>

          {note.tags && note.tags.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {note.tags.map((tag: string, i: number) => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 border font-label-caps text-xs rounded ${getTagClassName(i)}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {note.cover_image_url && (
          <div className='mb-10 rounded border border-outline-variant overflow-hidden bg-surface-container'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={note.cover_image_url}
              alt={note.cover_image_alt || note.title}
              className='w-full max-h-[450px] object-cover'
            />
          </div>
        )}

        <div className='markdown-content'>
          <MarkdownRenderer content={note.content || ''} />
        </div>

        <footer className='mt-16 pt-8 border-t border-outline-variant flex justify-between items-center gap-4'>
          <Link
            href='/notes'
            className='inline-flex items-center gap-2 text-primary hover:text-primary-container font-code-sm transition-colors'
          >
            <span className='material-symbols-outlined text-[18px]'>arrow_back</span>
            Kembali ke Daftar Notes
          </Link>

          {note.projects && (
            <Link
              href='/projects'
              className='inline-flex items-center gap-2 text-on-surface-variant hover:text-on-surface font-code-sm transition-colors'
            >
              Lihat Projek {note.projects.title}
              <span className='material-symbols-outlined text-[18px]'>arrow_forward</span>
            </Link>
          )}
        </footer>
      </article>
    </>
  )
}
