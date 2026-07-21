import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../api/projects.js'
import { getSkills } from '../api/skills.js'
import { getSiteSettings } from '../api/skills.js'
import SEO from '../components/SEO.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

const TYPE_SPEED_MS = 40
const LINE_PAUSE_MS = 200

const TerminalWidget = () => {
  const [typedLines, setTypedLines] = useState(['', '', '', '', '', '', ''])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      for (let i = 0; i < 7; i++) {
        const fullText = [
          'Loading projects...',
          'Connecting to database...',
          'Fetching data...',
          'Processing results...',
          'Optimizing queries...',
          'Caching response...',
          'Ready to display!',
        ][i]
        for (let c = 1; c <= fullText.length; c++) {
          if (cancelled) return
          await new Promise((r) => setTimeout(r, TYPE_SPEED_MS))
          setTypedLines((prev) => {
            const next = [...prev]
            next[i] = fullText.slice(0, c)
            return next
          })
        }
        await new Promise((r) => setTimeout(r, LINE_PAUSE_MS))
      }
      if (!cancelled) setDone(true)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className='col-span-12 lg:col-span-8 bg-surface-container rounded-lg border border-outline-variant overflow-hidden flex flex-col h-full shadow-lg'>
      <div className='bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-outline-variant'>
        <div className='flex items-center gap-2'>
          <div className='flex gap-1.5'>
            <div className='w-3 h-3 rounded-full bg-[#ff5f56]'></div>
            <div className='w-3 h-3 rounded-full bg-[#ffbd2e]'></div>
            <div className='w-3 h-3 rounded-full bg-[#27c93f]'></div>
          </div>
          <span className='ml-4 font-code-sm text-code-sm text-on-surface-variant'>
            💡 Quick Stats (Interactive Terminal)
          </span>
        </div>
        <span className='material-symbols-outlined text-on-surface-variant text-[18px]'>
          terminal
        </span>
      </div>

      <div className='p-6 font-code-sm text-code-sm bg-surface-container-lowest flex-1 min-h-[200px]'>
        {typedLines.map((line, i) => (
          <div
            key={i}
            className={`mb-2 ml-4 ${i === 6 && done ? 'text-primary font-bold' : 'text-tertiary'}`}
          >
            {line}
          </div>
        ))}
        {done && (
          <div className='mt-4 flex items-center'>
            <span className='text-tertiary'>$</span>
            <span className='terminal-cursor'></span>
          </div>
        )}
      </div>
    </div>
  )
}

const ProfileCard = () => {
  return (
    <div className='col-span-12 lg:col-span-4 bg-surface-container rounded-lg border border-outline-variant p-6 flex flex-col justify-between shadow-lg smooth-transition hover:border-primary/50'>
      <div>
        <div className='w-16 h-16 rounded-full mb-4 overflow-hidden border-2 border-primary'>
          <img
            className='w-full h-full object-cover'
            alt='Kresna S. Nugroho'
            src='https://avatars.githubusercontent.com/u/102658612?v=4'
          />
        </div>
        <h3 className='font-headline-sm text-headline-sm text-on-surface mb-1'>
          Kresna S. Nugroho
        </h3>
        <p className='text-on-surface-variant font-code-sm text-code-sm mb-4'>
          Location: Indonesia
        </p>
      </div>
      <div className='space-y-2'>
        <a
          href='/resume.pdf'
          download
          className='w-full py-2 bg-primary text-on-primary font-label-caps text-label-caps rounded flex items-center justify-center gap-2 hover:opacity-90 smooth-transition active:scale-95'
        >
          <span className='material-symbols-outlined text-[16px]'>download</span>
          RESUME.PDF
        </a>
        <a
          href='/contact'
          className='w-full py-2 border border-outline-variant text-on-surface font-label-caps text-label-caps rounded flex items-center justify-center gap-2 hover:bg-surface-variant smooth-transition active:scale-95'
        >
          <span className='material-symbols-outlined text-[16px]'>alternate_email</span>
          HIRE ME
        </a>
      </div>
    </div>
  )
}

const Home = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects({ featured: true }),
  })

  if (isLoading) {
    return (
      <>
        <SEO
          title='Home'
          description='Kresna S. Nugroho - ICT Teacher pivoting into full-stack development.'
          url='/'
        />
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-primary font-headline-sm text-headline-sm'>Loading...</div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <SEO
          title='Home'
          description='Kresna S. Nugroho - ICT Teacher pivoting into full-stack development.'
          url='/'
        />
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-red-500 font-headline-sm text-headline-sm'>Error loading projects</div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        title='Home'
        description='Kresna S. Nugroho - ICT Teacher pivoting into full-stack development. Exploring React, Next.js, Node.js, and distributed systems.'
        url='/'
      />
      <div className='max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-8'>
        <section className='mb-12'>
          <h1 className='font-headline-md text-headline-md text-primary mb-2'>
            ## Welcome to my workspace! 👋
          </h1>
          <p className='font-body-lg text-body-lg text-on-surface-variant max-w-2xl'>
            I'm Kresna, an{' '}
            <span className='text-tertiary font-semibold'>ICT Teacher</span>{' '}
            pivoting into{' '}
            <span className='text-tertiary font-semibold'>
              Full-Stack Development
            </span>
            . Bridging the gap between educational logic and scalable
            engineering.
          </p>
        </section>

        <div className='bento-grid'>
          <TerminalWidget />
          <ProfileCard />

          <div className='col-span-12 mt-8'>
            <h2 className='font-headline-md text-headline-md text-primary mb-6 flex items-center gap-3'>
              <span className='material-symbols-outlined'>folder_special</span>
              ## Featured Projects
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {projects?.length > 0 ? (
                projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <p className='text-on-surface-variant'>No featured projects found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
