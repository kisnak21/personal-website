interface JsonCodePanelProps {
  data: unknown
}

export default function JsonCodePanel({ data }: JsonCodePanelProps) {
  return (
    <pre className='overflow-x-auto custom-scrollbar'>
      <code className='text-[13px] leading-relaxed'>
        <span className='text-primary'>const</span> <span className='text-tertiary'>data</span> ={' '}
        <JsonTree value={data} indent={0} />
      </code>
    </pre>
  )
}

function JsonTree({ value, indent }: { value: unknown; indent: number }) {
  const pad = '  '.repeat(indent)

  if (value === null) return <span className='text-error'>null</span>

  if (typeof value === 'string') {
    return (
      <span className='text-secondary'>&quot;{value}&quot;</span>
    )
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return <span className='text-primary'>{String(value)}</span>
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className='text-on-surface-variant'>[]</span>
    return (
      <span>
        <span className='text-on-surface-variant'>[</span>
        <br />
        {value.map((item, i) => (
          <span key={i}>
            {pad}  <JsonTree value={item} indent={indent + 1} />
            {i < value.length - 1 && <span className='text-on-surface-variant'>,</span>}
            <br />
          </span>
        ))}
        {pad}
        <span className='text-on-surface-variant'>]</span>
      </span>
    )
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    if (entries.length === 0) return <span className='text-on-surface-variant'>{"{}"}</span>
    return (
      <span>
        <span className='text-on-surface-variant'>{"{"}</span>
        <br />
        {entries.map(([key, val], i) => (
          <span key={key}>
            {pad}  <span className='text-tertiary'>&quot;{key}&quot;</span>
            <span className='text-on-surface-variant'>: </span>
            <JsonTree value={val} indent={indent + 1} />
            {i < entries.length - 1 && <span className='text-on-surface-variant'>,</span>}
            <br />
          </span>
        ))}
        {pad}
        <span className='text-on-surface-variant'>{"}"}</span>
      </span>
    )
  }

  return null
}
