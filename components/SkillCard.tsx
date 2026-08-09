import type { Skill } from '@/lib/types'

const proficiencyLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

const proficiencyWidth: Record<string, string> = {
  beginner: '30%',
  intermediate: '60%',
  advanced: '85%',
  expert: '100%',
}

const colorClasses: Record<string, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
}

export function SkillBar({ skill }: { skill: Skill }) {
  const barColor = colorClasses[skill.color] || colorClasses.primary

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex justify-between items-center'>
        <span className='font-code-sm text-code-sm text-on-surface'>{skill.name}</span>
        <span className='font-label-caps text-[10px] text-on-surface-variant'>
          {proficiencyLabels[skill.proficiency] || skill.proficiency}
        </span>
      </div>
      <div className='h-1.5 bg-surface-container-high rounded-full overflow-hidden'>
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-700`}
          style={{ width: proficiencyWidth[skill.proficiency] || '50%' }}
        />
      </div>
    </div>
  )
}

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className='bg-surface-container border border-outline-variant rounded p-4'>
      <SkillBar skill={skill} />
    </div>
  )
}
