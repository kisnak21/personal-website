import type { Metadata } from 'next'
import { getSkills } from '@/lib/api/skills'
import { getSiteSettings } from '@/lib/api/settings'
import SkillCard from '@/components/SkillCard'
import { fallbackFrontendSkills, fallbackBackendSkills, fallbackTooling, fallbackPhilosophy } from '@/content/skillsData'
import { seoData } from '@/content/seoData'
import type { Skill } from '@/lib/types'

export const metadata: Metadata = {
  title: seoData.skills.title,
  description: seoData.skills.description,
}

export const revalidate = 60

export default async function SkillsPage() {
  let skills: Skill[] = []
  let philosophy = fallbackPhilosophy

  try {
    skills = await getSkills()
    const settings = await getSiteSettings()
    philosophy = settings.philosophy || philosophy
  } catch (error) {
    console.error('Failed to fetch skills:', error)
  }

  const frontend = skills.filter((skill) => skill.category === 'frontend')
  const backend = skills.filter((skill) => skill.category === 'backend')
  const tooling = skills.filter((skill) => skill.category === 'tooling')

  return (
    <>
      {/* Editor Tab Strip */}
      <div className='flex bg-surface-container-low border-b border-outline-variant h-10 items-center px-margin-mobile md:px-margin-desktop'>
        <div className='bg-surface px-4 h-full flex items-center gap-2 border-r border-outline-variant border-t-2 border-t-primary'>
          <span className='material-symbols-outlined text-primary text-[14px]'>terminal</span>
          <span className='font-code-sm text-code-sm text-primary'>skills.ts</span>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className='px-margin-mobile md:px-margin-desktop py-2 flex items-center gap-2 text-on-surface-variant font-code-sm text-code-sm border-b border-outline-variant bg-surface-container-lowest/50'>
        <span>src</span>
        <span className='material-symbols-outlined text-[14px]'>chevron_right</span>
        <span>config</span>
        <span className='material-symbols-outlined text-[14px]'>chevron_right</span>
        <span className='text-on-surface'>skills.ts</span>
      </div>

      <div className='max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Code panel */}
          <div className='lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded p-6 font-code-sm text-code-sm overflow-x-auto custom-scrollbar shadow-xl self-start sticky top-24'>
            <div className='absolute top-3 right-3 flex gap-2'>
              <div className='terminal-header-dot bg-[#FF5F56]'></div>
              <div className='terminal-header-dot bg-[#FFBD2E]'></div>
              <div className='terminal-header-dot bg-[#27C93F]'></div>
            </div>
            <div className='text-on-surface-variant'>
              <span className='text-primary'>interface</span> <span className='text-tertiary'>DeveloperSkills</span> {'{'}
              <br />
              <span className='pl-4 inline-block'>frontend: <span className='text-secondary'>string</span>[];</span>
              <br />
              <span className='pl-4 inline-block'>backend: <span className='text-secondary'>string</span>[];</span>
              <br />
              <span className='pl-4 inline-block'>tooling: <span className='text-secondary'>string</span>[];</span>
              <br />
              {'}'}
              <br /><br />
              <span className='text-primary'>const</span> skills: DeveloperSkills = {'{'}
              <br />
              <span className='pl-4 inline-block'>frontend: [{frontend.map((s) => `'${s.name}'`).join(', ')}],</span>
              <br />
              <span className='pl-4 inline-block'>backend: [{backend.map((s) => `'${s.name}'`).join(', ')}],</span>
              <br />
              <span className='pl-4 inline-block'>tooling: [{tooling.map((s) => `'${s.name}'`).join(', ')}],</span>
              <br />
              {'}'};
            </div>
          </div>

          {/* Skills rendered */}
          <div className='lg:col-span-7 flex flex-col gap-8'>
            <section>
              <h1 className='font-headline-md text-headline-md text-primary mb-4'>Frontend Development</h1>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {(frontend.length ? frontend : fallbackFrontendSkills.stack).map((skill) => (
                  <SkillCard key={skill.name} skill={skill as Skill} />
                ))}
              </div>
            </section>

            <section>
              <h2 className='font-headline-sm text-headline-sm text-tertiary mb-4'>Backend &amp; Database</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {(backend.length ? backend : fallbackBackendSkills.core).map((skill) => (
                  <SkillCard key={skill.name} skill={skill as Skill} />
                ))}
              </div>
            </section>

            <section>
              <h2 className='font-headline-sm text-headline-sm text-secondary mb-4'>Tools &amp; Workflow</h2>
              <div className='flex flex-wrap gap-2'>
                {(tooling.length ? tooling.map((skill) => skill.name.toUpperCase()) : fallbackTooling).map((tool) => (
                  <span key={tool} className='px-3 py-1.5 border border-secondary/30 bg-secondary/5 text-secondary font-label-caps text-label-caps rounded'>
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            <section className='bg-surface-container border border-outline-variant rounded p-6'>
              <h2 className='font-headline-sm text-headline-sm text-primary mb-3'>Developer Philosophy</h2>
              <p className='font-body-lg text-body-lg text-on-surface-variant italic leading-relaxed'>
                &quot;{philosophy}&quot;
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
