import { useState, useEffect } from 'react'
import { getNotes } from '../api/notes.js'
import { fallbackNotes } from '../data/notesData.js'
import SEO from '../components/SEO.jsx'
import NoteCard from '../components/NoteCard.jsx'

const Notes = () => {
  const [notesList, setNotesList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchNotes() {
      setIsLoading(true)
      const res = await getNotes({ published: true })
      if (res.data && res.data.length > 0) {
        setNotesList(res.data)
      } else {
        setNotesList(fallbackNotes)
      }
      setIsLoading(false)
    }
    fetchNotes()
  }, [])

  return (
    <>
      <SEO
        title='Notes & Dev Blog'
        description='Catatan proses belajar dan pemikiran dalam membangun proyek-proyek pengembangan software.'
        url='/notes'
      />

      {/* Editor Tab Strip */}
      <div className='flex bg-surface-container-low border-b border-outline-variant h-10 items-center px-margin-mobile md:px-margin-desktop'>
        <div className='bg-surface px-4 h-full flex items-center gap-2 border-r border-outline-variant border-t-2 border-t-primary'>
          <span className='material-symbols-outlined text-primary text-[14px]'>
            article
          </span>
          <span className='font-code-sm text-code-sm text-primary'>
            notes.md
          </span>
          <span className='material-symbols-outlined text-[14px] hover:bg-surface-variant rounded cursor-pointer'>
            close
          </span>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className='px-margin-mobile md:px-margin-desktop py-2 flex items-center gap-2 text-on-surface-variant font-code-sm text-code-sm border-b border-outline-variant bg-surface-container-lowest/50'>
        <span>src</span>
        <span className='material-symbols-outlined text-[14px]'>chevron_right</span>
        <span>content</span>
        <span className='material-symbols-outlined text-[14px]'>chevron_right</span>
        <span className='text-on-surface'>notes.md</span>
      </div>

      {/* Main Content Area */}
      <div className='max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-8'>
        <div className='mb-8'>
          <h1 className='font-headline-md text-headline-md text-on-surface mb-2 flex items-center gap-2'>
            <span className='material-symbols-outlined text-primary text-[28px]'>history_edu</span>
            Learning Notes & Dev Log
          </h1>
          <p className='text-on-surface-variant font-body-md text-body-md max-w-2xl'>
            Dokumentasi perjalanan, studi kasus, serta tantangan teknis yang dipelajari selama membangun aplikasi dan eksperimen kode.
          </p>
        </div>

        {isLoading ? (
          <div className='flex justify-center items-center py-16 text-on-surface-variant font-code-sm'>
            <span className='material-symbols-outlined animate-spin text-2xl mr-2'>sync</span>
            Reading notes.md...
          </div>
        ) : notesList.length === 0 ? (
          <div className='bg-surface-container border border-outline-variant p-12 text-center rounded'>
            <span className='material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-2'>description</span>
            <p className='text-on-surface-variant font-code-sm'>Belum ada catatan yang diterbitkan.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notesList.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Notes
