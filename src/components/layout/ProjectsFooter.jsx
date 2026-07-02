const ProjectsFooter = () => {
  return (
    <footer className='hidden md:flex fixed bottom-0 left-0 w-full h-8 items-center justify-between px-4 z-50 bg-surface-container-lowest border-t border-outline-variant font-code-sm text-code-sm'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1 text-primary bg-primary/10 px-2 h-full'>
          <span className='material-symbols-outlined text-[14px]'>
            account_tree
          </span>
          <span>main*</span>
        </div>
        <div className='flex items-center gap-1 text-on-surface-variant hover:text-tertiary cursor-pointer'>
          <span className='material-symbols-outlined text-[14px]'>sync</span>
          <span>In Sync</span>
        </div>
        <div className='flex items-center gap-1 text-on-surface-variant'>
          <span className='material-symbols-outlined text-[14px]'>
            error_outline
          </span>
          <span>0</span>
          <span className='material-symbols-outlined text-[14px]'>warning</span>
          <span>0</span>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <span className='text-on-surface-variant'>Spaces: 2</span>
        <span className='text-on-surface-variant'>UTF-8</span>
        <span className='text-on-surface-variant'>JSON</span>
        <button
          type='button'
          aria-label='Notifications'
          className='cursor-pointer'
        >
          <span
            className='material-symbols-outlined text-[14px] text-tertiary'
            aria-hidden='true'
          >
            notifications
          </span>
        </button>
        <span className='font-label-caps text-label-caps text-tertiary'>
          Built with Coffee © 2026
        </span>
      </div>
    </footer>
  )
}

export default ProjectsFooter
