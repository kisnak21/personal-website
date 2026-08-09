import Image from 'next/image'
import Link from 'next/link'
import { getTagClassName } from '@/content/projectsData'
import type { Note } from '@/lib/types'

function formatNoteDate(dateString?: string): string {
  const date = dateString ? new Date(dateString) : new Date()
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function NoteCard({ note }: { note: Note }) {
  const formattedDate = formatNoteDate(note.created_at)

  return (
    <div className='bg-surface-container border border-outline-variant overflow-hidden flex flex-col group hover:border-primary transition-all duration-300'>
      {note.cover_image_url ? (
        <div className='h-44 bg-surface-container-highest relative overflow-hidden'>
          <Image
            src={note.cover_image_url}
            alt={note.cover_image_alt || note.title}
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
            className='object-cover group-hover:scale-105 transition-transform duration-500'
          />
          <div className='absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity'></div>
        </div>
      ) : (
        <div className='h-10 bg-surface-container-highest flex items-center px-4 gap-2 border-b border-outline-variant'>
          <span className='material-symbols-outlined text-[16px] text-tertiary'>article</span>
          <span className='font-code-sm text-code-sm text-on-surface-variant truncate'>
            {note.slug}.md
          </span>
        </div>
      )}

      <div className='p-5 flex-1 flex flex-col'>
        <div className='flex items-center gap-2 mb-2 text-on-surface-variant font-code-sm text-code-sm'>
          <span className='material-symbols-outlined text-[14px]'>calendar_today</span>
          <span>{formattedDate}</span>
          {note.projects && (
            <>
              <span>•</span>
              <span className='text-primary flex items-center gap-1'>
                <span className='material-symbols-outlined text-[14px]'>folder</span>
                {note.projects.title}
              </span>
            </>
          )}
        </div>

        <Link href={`/notes/${note.slug}`} className='group-hover:text-primary transition-colors'>
          <h3 className='font-headline-sm text-headline-sm text-on-surface mb-2 line-clamp-2'>
            {note.title}
          </h3>
        </Link>

        <p className='text-on-surface-variant font-body-md text-body-md mb-4 line-clamp-3 flex-1'>
          {note.excerpt || (note.content || '').substring(0, 150) + '...'}
        </p>

        {note.tags && note.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 pt-2 border-t border-outline-variant'>
            {note.tags.map((tag: string, i: number) => (
              <span
                key={tag}
                className={`px-2 py-0.5 border font-label-caps text-[10px] rounded ${getTagClassName(i)}`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
