const colorMap = {
  primary: { bar: 'bg-primary', text: 'text-primary' },
  secondary: { bar: 'bg-secondary', text: 'text-secondary' },
  tertiary: { bar: 'bg-tertiary', text: 'text-tertiary' },
}

const proficiencyWidth = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
}

const proficiencyLabel = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

const SkillCard = ({ skill }) => {
  const colors = colorMap[skill.color] || colorMap.primary
  const width = proficiencyWidth[skill.proficiency] ?? 0
  const label = proficiencyLabel[skill.proficiency] ?? skill.proficiency

  return (
    <div className='border border-outline-variant bg-surface-container-lowest px-4 py-3 rounded'>
      <div className='flex items-center justify-between mb-2'>
        <span className={`font-code-sm text-code-sm font-bold ${colors.text}`}>
          {skill.name}
        </span>
        <span className='font-label-caps text-[10px] text-on-surface-variant'>
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

export default SkillCard
