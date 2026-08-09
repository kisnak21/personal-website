import { getProjects } from '@/lib/api/projects'
import TerminalWidget from '@/components/home/TerminalWidget'
import ProfileCard from '@/components/home/ProfileCard'
import ProjectCard from '@/components/ProjectCard'

export const revalidate = 60

export default async function HomePage() {
  let featuredProjects: import('@/lib/types').Project[] = []
  try {
    featuredProjects = await getProjects({ featured: true })
  } catch (error) {
    console.error('Failed to fetch featured projects:', error)
  }

  return (
    <div className='max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-8'>
      <section className='mb-12'>
        <h1 className='font-headline-md text-headline-md text-primary mb-2'>
          ## Welcome to my workspace! 👋
        </h1>
        <p className='font-body-lg text-body-lg text-on-surface-variant max-w-2xl'>
          I&apos;m Kresna, an{' '}
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
        <TerminalWidget projectCount={featuredProjects.length} />
        <ProfileCard />

        <div className='col-span-12 mt-8'>
          <h2 className='font-headline-md text-headline-md text-primary mb-6 flex items-center gap-3'>
            <span className='material-symbols-outlined'>folder_special</span>
            ## Featured Projects
          </h2>
          {featuredProjects.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className='text-on-surface-variant font-code-sm'>
              No featured projects found.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
