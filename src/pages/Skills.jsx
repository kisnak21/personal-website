import {
  frontendSkills,
  backendSkills,
  tooling,
  philosophy,
  stats,
} from '../data/skillsData.js'
import SkillCard from '../components/SkillCard.jsx'

const CodeLine = ({ num, children }) => (
  <div className='flex'>
    <span className='w-8 text-right pr-4 text-on-surface-variant/30 select-none flex-shrink-0'>
      {num}
    </span>
    <span className='font-code-sm text-code-sm text-on-surface whitespace-pre'>
      {children}
    </span>
  </div>
)

const Skills = () => {
  return (
    <div className='max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-8'>
      <section className='mb-8'>
        <h1 className='font-headline-md text-headline-md text-primary mb-2 flex items-center gap-3'>
          <span className='material-symbols-outlined'>terminal</span>
          skills.ts
        </h1>
      </section>

      <div className='bg-surface-container-lowest border border-outline-variant rounded shadow-xl mb-8 overflow-hidden'>
        <div className='bg-surface-container-high px-4 py-2.5 flex items-center border-b border-outline-variant relative'>
          <div className='flex gap-1.5'>
            <div className='w-2.5 h-2.5 rounded-full bg-primary'></div>
            <div className='w-2.5 h-2.5 rounded-full bg-tertiary'></div>
            <div className='w-2.5 h-2.5 rounded-full bg-primary'></div>
          </div>
          <div className='absolute left-1/2 -translate-x-1/2 flex items-center gap-2 font-code-sm text-code-sm text-on-surface-variant'>
            <span className='material-symbols-outlined text-[16px]'>
              description
            </span>
            src/components/skills.ts
          </div>
        </div>

        <div className='p-6 overflow-x-auto custom-scrollbar'>
          <CodeLine num={1}>
            <span className='text-tertiary'>import</span> {'{ '}
            <span className='text-secondary'>SkillSet</span>
            {' }'} <span className='text-tertiary'>from</span>{' '}
            <span className='text-primary'>'@types/portfolio'</span>;
          </CodeLine>
          <CodeLine num={2}>&nbsp;</CodeLine>
          <CodeLine num={3}>
            <span className='text-tertiary'>export const</span> frontendSkills:{' '}
            <span className='text-secondary'>SkillSet</span> = {'{'}
          </CodeLine>
          <CodeLine num={4}>
            {'  category: '}
            <span className='text-primary'>'{frontendSkills.category}'</span>,
          </CodeLine>
          <CodeLine num={5}>{'  stack: ['}</CodeLine>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4 pl-8'>
            {frontendSkills.stack.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>

          <CodeLine num={18}>{'  ]'}</CodeLine>
          <CodeLine num={19}>{'};'}</CodeLine>
          <CodeLine num={20}>&nbsp;</CodeLine>
          <CodeLine num={21}>
            <span className='text-tertiary'>export const</span> backendSkills ={' '}
            {'{'}
          </CodeLine>
          <CodeLine num={22}>{'  core: ['}</CodeLine>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4 pl-8'>
            {backendSkills.core.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>

          <CodeLine num={30}>{'  ]'}</CodeLine>
          <CodeLine num={31}>{'};'}</CodeLine>
          <CodeLine num={32}>&nbsp;</CodeLine>
          <CodeLine num={33}>
            <span className='text-tertiary'>const</span> tooling = [
          </CodeLine>

          <div className='flex flex-wrap gap-2 my-4 pl-8'>
            {tooling.map((tool) => (
              <span
                key={tool}
                className='px-3 py-1 border border-outline-variant bg-surface-container text-on-surface-variant font-code-sm text-[11px] rounded'
              >
                {tool}
              </span>
            ))}
          </div>

          <CodeLine num={40}>];</CodeLine>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 bg-surface-container rounded-lg border border-outline-variant p-6'>
          <h2 className='font-headline-sm text-headline-sm text-primary mb-3'>
            Philosophical Approach
          </h2>
          <p className='text-on-surface-variant font-body-md text-body-md'>
            {philosophy}
          </p>
        </div>
        {/* <div className='bg-surface-container rounded-lg border border-outline-variant p-6 flex flex-col items-center justify-center text-center'>
          <span className='font-headline-md text-[40px] font-bold text-primary'>
            {stats.value}
          </span>
          <span className='text-on-surface-variant font-label-caps text-label-caps mt-1'>
            {stats.label}
          </span>
        </div> */}
      </div>
    </div>
  )
}

export default Skills
