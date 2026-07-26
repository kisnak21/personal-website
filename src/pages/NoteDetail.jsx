import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getNoteBySlug } from '../api/notes.js'
import { fallbackNotes } from '../data/notesData.js'
import SEO from '../components/SEO.jsx'
import { getTagClassName } from '../data/projectsData.js'

const NoteDetail = () => {
  const { slug } = useParams()
  const [note, setNote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchNote() {
      setIsLoading(true)
      const res = await getNoteBySlug(slug)
      if (res.data) {
        setNote(res.data)
      } else {
        const fallback = fallbackNotes.find((n) => n.slug === slug)
        if (fallback) setNote(fallback)
      }
      setIsLoading(false)
    }
    fetchNote()
  }, [slug])

  if (isLoading) {
    return (
      <div className='max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop py-16 text-center text-on-surface-variant font-code-sm flex items-center justify-center gap-2'>
        <span className='material-symbols-outlined animate-spin text-2xl'>sync</span>
        Rendering article...
      </div>
    )
  }

  if (!note) {
    return (
      <div className='max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop py-16 text-center'>
        <span className='material-symbols-outlined text-[64px] text-error mb-4'>error</span>
        <h1 className='font-headline-sm text-headline-sm text-on-surface mb-2'>Catatan Tidak Ditemukan</h1>
        <p className='text-on-surface-variant font-body-md mb-6'>File Markdown yang kamu cari tidak ada atau sudah dihapus.</p>
        <Link to='/notes' className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-code-sm rounded'>
          <span className='material-symbols-outlined text-[18px]'>arrow_back</span>
          Kembali ke Notes
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(note.created_at || Date.now()).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <>
      <SEO
        title={note.title}
        description={note.excerpt || note.content.substring(0, 160)}
        url={`/notes/${note.slug}`}
        image={note.cover_image_url}
      />

      {/* Editor Tab Strip */}
      <div className='flex bg-surface-container-low border-b border-outline-variant h-10 items-center px-margin-mobile md:px-margin-desktop'>
        <div className='bg-surface px-4 h-full flex items-center gap-2 border-r border-outline-variant border-t-2 border-t-primary'>
          <span className='material-symbols-outlined text-primary text-[14px]'>article</span>
          <span className='font-code-sm text-code-sm text-primary'>{note.slug}.md</span>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className='px-margin-mobile md:px-margin-desktop py-2 flex items-center gap-2 text-on-surface-variant font-code-sm text-code-sm border-b border-outline-variant bg-surface-container-lowest/50 overflow-x-auto'>
        <Link to='/notes' className='hover:text-primary transition-colors flex items-center gap-1'>
          <span className='material-symbols-outlined text-[14px]'>arrow_back</span>
          notes
        </Link>
        <span className='material-symbols-outlined text-[14px]'>chevron_right</span>
        <span className='text-on-surface truncate'>{note.slug}.md</span>
      </div>

      {/* Article Container */}
      <article className='max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop py-10'>
        {/* Header */}
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
                  to='/projects'
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
              {note.tags.map((tag, i) => (
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

        {/* Cover Image */}
        {note.cover_image_url && (
          <div className='mb-10 rounded border border-outline-variant overflow-hidden bg-surface-container'>
            <img
              src={note.cover_image_url}
              alt={note.cover_image_alt || note.title}
              className='w-full max-h-[450px] object-cover'
            />
          </div>
        )}

        {/* Markdown Content */}
        <div className='markdown-content'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
          >
            {note.content || ''}
          </ReactMarkdown>
        </div>

        {/* Footer Navigation */}
        <footer className='mt-16 pt-8 border-t border-outline-variant flex justify-between items-center'>
          <Link
            to='/notes'
            className='inline-flex items-center gap-2 text-primary hover:text-primary-container font-code-sm transition-colors'
          >
            <span className='material-symbols-outlined text-[18px]'>arrow_back</span>
            Kembali ke Daftar Notes
          </Link>

          {note.projects && (
            <Link
              to='/projects'
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

export default NoteDetail
