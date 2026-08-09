import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-6'>
      <div className='max-w-lg w-full bg-surface-container border border-outline-variant rounded-lg p-8 text-center shadow-xl'>
        <span className='material-symbols-outlined text-[56px] text-error mb-4'>error</span>
        <h1 className='font-headline-md text-headline-md text-on-surface mb-2'>404: File Not Found</h1>
        <p className='font-body-md text-body-md text-on-surface-variant mb-6'>
          The requested file does not exist in this workspace.
        </p>
        <Link href='/' className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-code-sm rounded'>
          <span className='material-symbols-outlined text-[18px]'>home</span>
          Return Home
        </Link>
      </div>
    </div>
  )
}
