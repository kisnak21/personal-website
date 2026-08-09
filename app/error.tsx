'use client'

export default function ErrorBoundary({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='min-h-[50vh] flex items-center justify-center p-6'>
      <div className='max-w-lg w-full bg-surface-container border border-error/40 rounded-lg p-8 text-center'>
        <span className='material-symbols-outlined text-[48px] text-error mb-4'>error</span>
        <h2 className='font-headline-sm text-headline-sm text-on-surface mb-2'>Something went wrong</h2>
        <p className='font-body-md text-body-md text-on-surface-variant mb-6'>Please retry or return to the homepage.</p>
        <button onClick={reset} className='px-4 py-2 bg-primary text-on-primary font-code-sm rounded'>Try again</button>
      </div>
    </div>
  )
}
