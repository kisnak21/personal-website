import Link from 'next/link'
import { profile } from '@/content/homeData'

export default function ProfileCard() {
  return (
    <div className='col-span-12 lg:col-span-4 bg-surface-container rounded-lg border border-outline-variant p-6 flex flex-col justify-between shadow-lg smooth-transition hover:border-primary/50'>
      <div>
        <div className='w-16 h-16 rounded-full mb-4 overflow-hidden border-2 border-primary'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='w-full h-full object-cover'
            alt='Kresna S. Nugroho'
            src={profile.avatar}
            loading='lazy'
            decoding='async'
          />
        </div>
        <h3 className='font-headline-sm text-headline-sm text-on-surface mb-1'>
          {profile.name}
        </h3>
        <p className='text-on-surface-variant font-code-sm text-code-sm mb-4'>
          Location: {profile.location}
        </p>
      </div>
      <div className='space-y-2'>
        <Link
          href='/contact'
          className='w-full py-2 border border-outline-variant text-on-surface font-label-caps text-label-caps rounded flex items-center justify-center gap-2 hover:bg-surface-variant smooth-transition active:scale-95'
        >
          <span className='material-symbols-outlined text-[16px]'>alternate_email</span>
          HIRE ME
        </Link>
      </div>
    </div>
  )
}
