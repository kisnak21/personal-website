import type { Skill } from '@/lib/types'

const colorMap: Record<string, { bar: string; text: string }> = {
  primary: { bar: 'bg-primary', text: 'text-primary' },
  secondary: { bar: 'bg-secondary', text: 'text-secondary' },
  tertiary: { bar: 'bg-tertiary', text: 'text-tertiary' },
}

const proficiencyWidth: Record<string, number> = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
}

const proficiencyLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

export default function SkillCard({ skill }: { skill: Skill }) {
  const colors = colorMap[skill.color] || colorMap.primary
  const width = proficiencyWidth[skill.proficiency] ?? 0
  const label = proficiencyLabels[skill.proficiency] ?? skill.proficiency

  return (
    <div className='border border-outline-variant bg-surface-container-lowest px-4 py-3 rounded'>
      <div className='flex items-center justify-between mb-2'>
        <span className={`font-code-sm text-code-sm font-bold ${colors.text}`}>
          {skill.name}
        </span>
        <span className='font-code-sm text-code-sm text-on-surface-variant'>
          {label}
        </span>
      </div>
      <div className='w-full h-1.5 bg-surface-variant rounded overflow-hidden'>
        <div
          className={`h-full rounded ${colors.bar}`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  )
}
