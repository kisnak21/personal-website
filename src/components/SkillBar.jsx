const SkillBar = ({ skill }) => {
  return (
    <div className='mb-4'>
      <div className='flex items-center justify-between mb-1'>
        <span className='font-code-sm text-code-sm text-on-surface'>
          {skill.name}
        </span>
        <span className='font-code-sm text-code-sm text-on-surface-variant'>
          {skill.level}%
        </span>
      </div>
      <div className='w-full h-2 bg-surface-variant rounded overflow-hidden'>
        <div
          className='h-full bg-primary rounded smooth-transition'
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  )
}

export default SkillBar
