interface JsonSegment {
  text: string
  className: string
}

function buildLines(data: Record<string, unknown>): JsonSegment[][] {
  const lines: JsonSegment[][] = []
  lines.push([{ text: '{', className: 'text-on-surface' }])

  Object.keys(data).forEach((key, keyIndex) => {
    const isLastKey = keyIndex === Object.keys(data).length - 1
    lines.push([
      { text: '  ', className: '' },
      { text: `"${key}"`, className: 'text-tertiary' },
      { text: ': ', className: '' },
      { text: '[', className: 'text-on-surface' },
    ])

    const items = data[key] as Record<string, unknown>[]
    items.forEach((item, itemIndex) => {
      const isLastItem = itemIndex === items.length - 1
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
            const arrLen = value.length
            lines.push([
              { text: '      ', className: '' },
              { text: `"${field}"`, className: 'text-tertiary' },
              { text: ': [', className: 'text-on-surface' },
            ])
            value.forEach((v: unknown, vi: number) => {
              const isLastTech = vi === arrLen - 1
              lines.push([
                { text: '        ', className: '' },
                { text: `"${String(v)}"${isLastTech ? '' : ','}`, className: 'text-primary' },
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
          { text: String(value), className: valueClass },
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

export default function JsonCodePanel({ data }: { data: Record<string, unknown> }) {
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
