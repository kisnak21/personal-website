const ContactFooter = () => {
  return (
    <footer className='hidden md:flex fixed bottom-0 left-0 w-full h-8 items-center justify-between px-4 z-50 bg-surface-container-lowest border-t border-outline-variant font-code-sm text-code-sm text-on-surface-variant'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1 text-tertiary'>
          <span className='material-symbols-outlined text-[14px]'>
            account_tree
          </span>
          <span>main*</span>
        </div>
        <div className='flex items-center gap-1'>
          <span className='material-symbols-outlined text-[14px]'>sync</span>
          <span>Synchronized</span>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <span>Ln 42, Col 12</span>
        <span>UTF-8</span>
        <span>Network Status: Optimal</span>
        <span className='bg-tertiary/20 text-tertiary px-2 py-0.5 rounded'>
          System Logs
        </span>
      </div>
    </footer>
  )
}

export default ContactFooter
