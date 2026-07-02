const Footer = () => {
  return (
    <footer className='hidden md:flex fixed bottom-0 left-0 w-full h-8 items-center justify-between px-4 z-50 bg-surface-container-lowest border-t border-outline-variant font-code-sm text-code-sm text-on-surface-variant'>
      <div className='flex items-center gap-4'>
        <span className='font-label-caps text-label-caps'>
          Built with Precision © 2024
        </span>
        <div className='hidden md:flex items-center gap-4 border-l border-outline-variant pl-4'>
          <span className='flex items-center gap-1 hover:text-tertiary cursor-pointer smooth-transition'>
            <span className='w-2 h-2 rounded-full bg-green-500 pulse-indicator'></span>
            System Logs
          </span>
          <span className='flex items-center gap-1 hover:text-tertiary cursor-pointer smooth-transition'>
            Network Status
          </span>
          <span className='flex items-center gap-1 hover:text-tertiary cursor-pointer smooth-transition'>
            Dependencies
          </span>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <span className='text-tertiary'>UTF-8</span>
        <span className='text-tertiary'>JavaScript React</span>
      </div>
    </footer>
  )
}

export default Footer
