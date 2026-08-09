export default function Loading({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className='flex items-center justify-center gap-2 py-16 text-on-surface-variant font-code-sm'>
      <span className='material-symbols-outlined animate-spin text-2xl'>sync</span>
      <span>{label}</span>
    </div>
  )
}
