export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin'></div>
        <span className='font-code-sm text-code-sm text-on-surface-variant animate-pulse'>
          Initializing workspace...
        </span>
      </div>
    </div>
  )
}
