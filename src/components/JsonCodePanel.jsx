const buildLines = (data) => {
  const lines = []
  lines.push([{ text: '{', className: 'text-on-surface' }])

  Object.keys(data).forEach((key, keyIndex) => {
    const isLastKey = keyIndex === Object.keys(data).length - 1
    lines.push([
      { text: '  ', className: '' },
      { text: `"${key}"`, className: 'text-tertiary' },
      { text: ': ', className: '' },
      { text: '[', className: 'text-on-surface' },
    ])

    data[key].forEach((item, itemIndex) => {
      const isLastItem = itemIndex === data[key].length - 1
      lines.push([{ text: '    {', className: 'text-on-surface' }])

      Object.keys(item).forEach((field, fieldIndex) => {
        const isLastField = fieldIndex === Object.keys(item).length - 1
        let value = item[field]
        let valueClass = 'text-primary'

        if (typeof value === 'boolean') {
          value = String(value)
          valueClass = 'text-secondary'
        } else if (typeof value === 'number') {
          value = String(value)
          valueClass = 'text-secondary'
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            value = '[]'
          } else {
            lines.push([
              { text: '      ', className: '' },
              { text: `"${field}"`, className: 'text-tertiary' },
              { text: ': [', className: 'text-on-surface' },
            ])
            value.forEach((v, vi) => {
              const isLastTech = vi === value.length - 1
              lines.push([
                { text: '        ', className: '' },
                { text: `"${v}"${isLastTech ? '' : ','}`, className: 'text-primary' },
              ])
            })
            lines.push([
              { text: '      ]', className: 'text-on-surface' },
              { text: isLastField ? '' : ',', className: '' },
            ])
            return
          }
        } else if (typeof value === 'string') {
          value = `"${value}"`
        }

        lines.push([
          { text: '      ', className: '' },
          { text: `"${field}"`, className: 'text-tertiary' },
          { text: ': ', className: '' },
          { text: value, className: valueClass },
          { text: isLastField ? '' : ',', className: '' },
        ])
      })
      lines.push([
        { text: `    }${isLastItem ? '' : ','}`, className: 'text-on-surface' },
      ])
    })
    lines.push([
      { text: `  ]${isLastKey ? '' : ','}`, className: 'text-on-surface' },
    ])
  })

  lines.push([{ text: '}', className: 'text-on-surface' }])
  return lines
}

const JsonCodePanel = ({ data }) => {
  const lines = buildLines(data)

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
