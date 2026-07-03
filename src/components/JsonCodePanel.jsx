const buildLines = (projects) => {
  const lines = []
  lines.push([{ text: '{', className: 'text-on-surface' }])
  lines.push([
    { text: '  ', className: '' },
    { text: '"projects"', className: 'text-tertiary' },
    { text: ': ', className: '' },
    { text: '[', className: 'text-on-surface' },
  ])

  projects.forEach((p, i) => {
    const isLast = i === projects.length - 1

    lines.push([{ text: '    {', className: 'text-on-surface' }])

    lines.push([
      { text: '      ', className: '' },
      { text: '"id"', className: 'text-tertiary' },
      { text: ': ', className: '' },
      { text: String(i + 1), className: 'text-secondary' },
      { text: ',', className: '' },
    ])

    lines.push([
      { text: '      ', className: '' },
      { text: '"title"', className: 'text-tertiary' },
      { text: ': ', className: '' },
      { text: `"${p.title}"`, className: 'text-primary' },
      { text: ',', className: '' },
    ])

    lines.push([
      { text: '      ', className: '' },
      { text: '"techStack"', className: 'text-tertiary' },
      { text: ': [', className: '' },
    ])

    p.techStack.forEach((tech, ti) => {
      const isLastTech = ti === p.techStack.length - 1
      lines.push([
        { text: '        ', className: '' },
        {
          text: `"${tech}"${isLastTech ? '' : ','}`,
          className: 'text-primary',
        },
      ])
    })

    lines.push([{ text: '      ]', className: 'text-on-surface' }])
    lines.push([
      { text: `    }${isLast ? '' : ','}`, className: 'text-on-surface' },
    ])
  })

  lines.push([{ text: '  ]', className: 'text-on-surface' }])
  lines.push([{ text: '}', className: 'text-on-surface' }])
  return lines
}

const JsonCodePanel = ({ projects }) => {
  const lines = buildLines(projects)

  return (
    <div className='flex gap-4'>
      <div className='text-on-surface-variant/30 text-right select-none pr-4 border-r border-outline-variant'>
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div>
        {lines.map((segments, i) => (
          <div key={i} className='whitespace-pre'>
            {segments.map((seg, j) => (
              <span key={j} className={seg.className}>
                {seg.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default JsonCodePanel
