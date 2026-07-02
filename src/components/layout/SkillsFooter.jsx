const SkillsFooter = () => {
  return (
    <footer className='hidden md:flex fixed bottom-0 left-0 w-full h-8 items-center justify-between px-4 z-50 bg-surface-container-lowest border-t border-outline-variant font-code-sm text-code-sm text-on-surface-variant'>
      <div className='flex items-center gap-4'>
        <span className='font-label-caps text-label-caps text-tertiary'>
          Built with Precision © 2024
        </span>
        <div className='flex items-center gap-4 border-l border-outline-variant pl-4'>
          <span className='hover:text-tertiary cursor-pointer'>
            System Logs
          </span>
          <span className='hover:text-tertiary cursor-pointer'>
            Network Status
          </span>
          <span className='hover:text-tertiary cursor-pointer'>
            Dependencies
          </span>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1 text-primary'>
          <span className='material-symbols-outlined text-[14px]'>
            account_tree
          </span>
          <span>main*</span>
        </div>
        <span>UTF-8</span>
      </div>
    </footer>
  )
}

export default SkillsFooter
