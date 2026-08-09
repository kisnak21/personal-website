import Link from 'next/link'
import { getProjects } from '@/lib/api/projects'
import TerminalWidget from '@/components/home/TerminalWidget'
import ProfileCard from '@/components/home/ProfileCard'
import ProjectCard from '@/components/ProjectCard'
import GithubActivity from '@/components/GithubActivity'

export const revalidate = 60

export default async function HomePage() {
  let featuredProjects: import('@/lib/types').Project[] = []
  try {
    featuredProjects = await getProjects({ featured: true, limit: 3 })
  } catch (error) {
    console.error('Failed to fetch featured projects:', error)
  }

  return (
    <div className='max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-8 space-y-8'>
      {/* Hero Bento Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        <div className='lg:col-span-8'>
          <TerminalWidget projectCount={featuredProjects.length} />
        </div>
        <div className='lg:col-span-4'>
          <ProfileCard />
        </div>
      </div>

      {/* GitHub Activity Section */}
      <div className='bg-surface-container border border-outline-variant rounded p-6 shadow-xl'>
        <h2 className='font-headline-sm text-headline-sm text-primary mb-4 flex items-center gap-2'>
          <span className='material-symbols-outlined text-[20px]'>commit</span>
          GitHub Activity
        </h2>
        <GithubActivity />
      </div>

      {/* Featured Projects Section */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='font-headline-md text-headline-md text-on-surface flex items-center gap-2'>
            <span className='material-symbols-outlined text-primary text-[24px]'>star</span>
            Featured Projects
          </h2>
          <Link
            href='/projects'
            className='font-code-sm text-code-sm text-primary hover:underline flex items-center gap-1'
          >
            View all
            <span className='material-symbols-outlined text-[16px]'>arrow_forward</span>
          </Link>
        </div>

        {featuredProjects.length === 0 ? (
          <div className='bg-surface-container border border-outline-variant rounded p-8 text-center text-on-surface-variant font-code-sm'>
            No featured projects available right now.
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
