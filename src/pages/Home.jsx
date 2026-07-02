import { useEffect, useState, useMemo } from 'react'
import { terminalLines, profile } from '../data/homeData.js'
import { projects } from '../data/projectsData.js'
import ProjectCard from '../components/ProjectCard.jsx'

const TYPE_SPEED_MS = 40
const LINE_PAUSE_MS = 200

const TerminalWidget = () => {
  const [typedLines, setTypedLines] = useState(terminalLines.map(() => ''))
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      for (let i = 0; i < terminalLines.length; i++) {
        const fullText = terminalLines[i].text
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
        {terminalLines.map((line, i) => (
          <div
            key={i}
            className={`mb-2 ${line.indent ? 'ml-4' : ''} ${line.className}`}
          >
            <span className='text-tertiary'>{line.prefix}</span>{' '}
            <span>{typedLines[i]}</span>
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
            alt={profile.name}
            src={profile.avatar}
          />
        </div>
        <h3 className='font-headline-sm text-headline-sm text-on-surface mb-1'>
          {profile.name}
        </h3>
        <p className='text-on-surface-variant font-code-sm text-code-sm mb-4'>
          Location: {profile.location}
        </p>
      </div>
      <div className='space-y-2'>
        <button className='w-full py-2 bg-primary text-on-primary font-label-caps text-label-caps rounded flex items-center justify-center gap-2 hover:opacity-90 smooth-transition active:scale-95'>
          <span className='material-symbols-outlined text-[16px]'>
            download
          </span>
          RESUME.PDF
        </button>
        <button className='w-full py-2 border border-outline-variant text-on-surface font-label-caps text-label-caps rounded flex items-center justify-center gap-2 hover:bg-surface-variant smooth-transition active:scale-95'>
          <span className='material-symbols-outlined text-[16px]'>
            alternate_email
          </span>
          HIRE ME
        </button>
      </div>
    </div>
  )
}

const GithubActivity = () => {
  const squares = useMemo(() => {
    return Array.from({ length: 45 }, () => {
      const r = Math.random()
      if (r > 0.7) return 'bg-primary'
      if (r > 0.4) return 'bg-primary/20'
      return 'bg-surface-variant'
    })
  }, [])

  return (
    <div className='col-span-12 mt-8 bg-surface-container-lowest rounded-lg border border-outline-variant p-4 smooth-transition hover:border-tertiary/30'>
      <div className='flex items-center justify-between mb-4 flex-wrap gap-2'>
        <div className='flex items-center gap-4'>
          <span className='font-label-caps text-label-caps text-on-surface-variant'>
            GITHUB CONTRIBUTIONS
          </span>
          <div className='flex gap-1'>
            <div className='w-3 h-3 bg-surface-variant rounded-sm'></div>
            <div className='w-3 h-3 bg-primary/40 rounded-sm'></div>
            <div className='w-3 h-3 bg-primary/60 rounded-sm'></div>
            <div className='w-3 h-3 bg-primary rounded-sm'></div>
          </div>
        </div>
        <span className='font-code-sm text-code-sm text-tertiary'>
          2,042 commits in 2024
        </span>
      </div>
      <div className='flex gap-1 overflow-x-auto pb-2'>
        {squares.map((cls, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-sm flex-shrink-0 smooth-transition hover:scale-125 hover:z-10 cursor-crosshair ${cls}`}
          ></div>
        ))}
      </div>
    </div>
  )
}

const Home = () => {
  return (
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
          . Bridging the gap between educational logic and scalable engineering.
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
            {projects
              .filter((p) => p.featured)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </div>

        <GithubActivity />
      </div>
    </div>
  )
}

export default Home
