import { useState, useEffect } from 'react'
import { getSkills, getSiteSettings } from '../api/skills.js'
import SEO from '../components/SEO.jsx'
import SkillCard from '../components/SkillCard.jsx'

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [settings, setSettings] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const [skillsRes, settingsRes] = await Promise.all([getSkills(), getSiteSettings()])
      if (skillsRes.data) setSkills(skillsRes.data)
      if (settingsRes.data) setSettings(settingsRes.data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) return <div>Loading...</div>

  const frontendStack = skills.filter((s) => s.category === 'frontend')
  const backendCore = skills.filter((s) => s.category === 'backend')
  const toolingStack = skills.filter((s) => s.category === 'tooling').map((s) => s.name)

  return (
    <>
      <SEO
        title="Skills"
        description="Technical skills and expertise in modern web development: React, Next.js, TypeScript, Node.js, Tailwind CSS, MongoDB, PostgreSQL, and more."
        url="/skills"
      />
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-8">
        <section className="mb-8">
          <h1 className="font-headline-md text-headline-md text-primary mb-2 flex items-center gap-3">
            <span className="material-symbols-outlined">terminal</span>
            skills.ts
          </h1>
        </section>

        <div className="bg-surface-container-lowest border border-outline-variant rounded shadow-xl mb-8 overflow-hidden">
          <div className="bg-surface-container-high px-4 py-2.5 flex items-center border-b border-outline-variant relative">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 font-code-sm text-code-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">
                description
              </span>
              src/components/skills.ts
            </div>
          </div>

          <div className="p-6 overflow-x-auto custom-scrollbar">
            <div className="whitespace-pre font-code-sm text-code-sm">
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">1</span>
                <span className="text-tertiary">import</span> {'{ '}
                <span className="text-secondary">SkillSet</span>
                {' }'} <span className="text-tertiary">from</span>{' '}
                <span className="text-primary">'@types/portfolio'</span>;
              </div>
              <div className="flex">&nbsp;</div>
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">2</span>
                <span>&nbsp;</span>
              </div>
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">3</span>
                <span className="text-tertiary">export const</span>{' '}
                <span className="text-secondary">SkillSet</span> ={' '}
                {'{'}
              </div>
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">4</span>
                <span>{'  category: '}</span>
                <span className="text-primary">'Frontend Development'</span>,
              </div>
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">5</span>
                <span>{'  stack: ['}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 pl-8">
                {frontendStack.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>

              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">18</span>
                <span>{'  ]'}</span>
              </div>
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">19</span>
                <span>{'};'}</span>
              </div>
              <div className="flex">&nbsp;</div>
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">20</span>
                <span>&nbsp;</span>
              </div>
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">21</span>
                <span className="text-tertiary">export const</span>{' '}
                <span className="text-secondary">SkillSet</span> ={' '}
                {'{'}
              </div>
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">22</span>
                <span>{'  core: ['}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 pl-8">
                {backendCore.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>

              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">30</span>
                <span>{'  ]'}</span>
              </div>
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">31</span>
                <span>{'};'}</span>
              </div>
              <div className="flex">&nbsp;</div>
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">32</span>
                <span>&nbsp;</span>
              </div>
              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">33</span>
                <span className="text-tertiary">const</span> tooling = [
              </div>

              <div className="flex flex-wrap gap-2 my-4 pl-8">
                {toolingStack.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 border border-outline-variant bg-surface-container text-on-surface-variant font-code-sm text-[11px] rounded"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="flex">
                <span className="w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0">40</span>
                <span>]</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface-container rounded-lg border border-outline-variant p-6">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-3">
              Philosophical Approach
            </h2>
            <p className="text-on-surface-variant font-body-md text-body-md">
              {settings.philosophy}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Skills

