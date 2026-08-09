import Link from 'next/link'
import { profile } from '@/content/homeData'

export default function ProfileCard() {
  return (
    <div className='bg-surface-container border border-outline-variant rounded p-6 flex flex-col items-center text-center shadow-xl'>
      <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-primary mb-4 relative'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={profile.avatar} alt={profile.name} className='w-full h-full object-cover' />
      </div>
      <h2 className='font-headline-md text-headline-md text-on-surface mb-1'>{profile.name}</h2>
      <p className='font-code-sm text-code-sm text-on-surface-variant mb-4 flex items-center gap-1 justify-center'>
        <span className='material-symbols-outlined text-[16px] text-tertiary'>location_on</span>
        {profile.location}
      </p>

      <div className='w-full pt-4 border-t border-outline-variant flex flex-col gap-2'>
        <a
          href='/resume.pdf'
          download
          className='w-full py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface border border-outline-variant rounded font-code-sm text-code-sm flex items-center justify-center gap-2 smooth-transition'
        >
          <span className='material-symbols-outlined text-[16px]'>download</span>
          resume.pdf
        </a>
        <Link
          href='/contact'
          className='w-full py-2 bg-primary hover:bg-primary-container text-on-primary rounded font-label-caps text-label-caps flex items-center justify-center gap-2 smooth-transition'
        >
          <span className='material-symbols-outlined text-[16px]'>mail</span>
          GET_IN_TOUCH
        </Link>
      </div>
    </div>
  )
}
