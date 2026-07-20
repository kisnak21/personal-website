const baseClass =
  'hidden md:flex fixed bottom-0 left-0 w-full h-8 items-center justify-between px-4 z-50 bg-surface-container-lowest border-t border-outline-variant font-code-sm text-code-sm text-on-surface-variant'

const BranchBadge = ({ tone = 'tertiary' }) => (
  <div className={`flex items-center gap-1 text-${tone}`}>
    <span className='material-symbols-outlined text-[14px]'>account_tree</span>
    <span>main*</span>
  </div>
)

const LeftStatus = {
  home: (
    <>
      <span className='font-label-caps text-label-caps'>Built with Coffee © 2026</span>
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
    </>
  ),
  projects: (
    <>
      <div className='flex items-center gap-1 text-primary bg-primary/10 px-2 h-full'>
        <span className='material-symbols-outlined text-[14px]'>account_tree</span>
        <span>main*</span>
      </div>
      <div className='flex items-center gap-1 text-on-surface-variant hover:text-tertiary cursor-pointer'>
        <span className='material-symbols-outlined text-[14px]'>sync</span>
        <span>In Sync</span>
      </div>
      <div className='flex items-center gap-1 text-on-surface-variant'>
        <span className='material-symbols-outlined text-[14px]'>error_outline</span>
        <span>0</span>
        <span className='material-symbols-outlined text-[14px]'>warning</span>
        <span>0</span>
      </div>
    </>
  ),
  skills: (
    <>
      <span className='font-label-caps text-label-caps text-tertiary'>
        Built with Coffee © 2026
      </span>
      <div className='flex items-center gap-4 border-l border-outline-variant pl-4'>
        <span className='hover:text-tertiary cursor-pointer'>System Logs</span>
        <span className='hover:text-tertiary cursor-pointer'>Network Status</span>
        <span className='hover:text-tertiary cursor-pointer'>Dependencies</span>
      </div>
    </>
  ),
  contact: (
    <>
      <BranchBadge tone='tertiary' />
      <div className='flex items-center gap-1'>
        <span className='material-symbols-outlined text-[14px]'>sync</span>
        <span>Synchronized</span>
      </div>
    </>
  ),
}

const RightStatus = {
  home: (
    <div className='flex items-center gap-4'>
      <span className='text-tertiary'>UTF-8</span>
      <span className='text-tertiary'>JavaScript React</span>
    </div>
  ),
  projects: (
    <div className='flex items-center gap-4'>
      <span className='text-on-surface-variant'>Spaces: 2</span>
      <span className='text-on-surface-variant'>UTF-8</span>
      <span className='text-on-surface-variant'>JSON</span>
      <button type='button' aria-label='Notifications' className='cursor-pointer'>
        <span className='material-symbols-outlined text-[14px] text-tertiary' aria-hidden='true'>
          notifications
        </span>
      </button>
      <span className='font-label-caps text-label-caps text-tertiary'>
        Built with Coffee © 2026
      </span>
    </div>
  ),
  skills: (
    <div className='flex items-center gap-4'>
      <BranchBadge tone='primary' />
      <span>UTF-8</span>
    </div>
  ),
  contact: (
    <div className='flex items-center gap-4'>
      <span>Ln 42, Col 12</span>
      <span>UTF-8</span>
      <span>Network Status: Optimal</span>
      <span className='bg-tertiary/20 text-tertiary px-2 py-0.5 rounded'>System Logs</span>
    </div>
  ),
}

const AppFooter = ({ variant = 'home' }) => {
  return (
    <footer className={baseClass}>
      <div className='flex items-center gap-4'>{LeftStatus[variant]}</div>
      <div className='flex items-center gap-4'>{RightStatus[variant]}</div>
    </footer>
  )
}

export default AppFooter
