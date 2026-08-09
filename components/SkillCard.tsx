import type { Skill } from '@/lib/types'

const colorMap: Record<string, { text: string }> = {
  primary: { text: 'text-primary' },
  secondary: { text: 'text-secondary' },
  tertiary: { text: 'text-tertiary' },
}

const proficiencyLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

export default function SkillCard({ skill }: { skill: Skill }) {
  const colors = colorMap[skill.color] || colorMap.primary
  const label = proficiencyLabels[skill.proficiency] ?? skill.proficiency

  return (
    <div className='border border-outline-variant bg-surface-container-lowest px-4 py-3 rounded'>
      <div className='flex items-center justify-between gap-3'>
        <span className={`font-code-sm text-code-sm font-bold ${colors.text}`}>
          {skill.name}
        </span>
        <span className='font-code-sm text-code-sm text-on-surface-variant whitespace-nowrap'>
          {label}
        </span>
      </div>
    </div>
  )
}
