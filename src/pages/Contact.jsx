import { useState } from 'react'
import {
  contactIntro,
  socialProfiles,
  directEmail,
  meta,
  formEndpoint,
} from '../data/contactData.js'
import { profile } from '../data/homeData.js'
import SEO from '../components/SEO.jsx'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | submitted | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formEndpoint) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.currentTarget),
      })
      if (res.ok) {
        setStatus('submitted')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO
        title='Contact'
        description='Get in touch with Kresna S. Nugroho for collaboration, job opportunities, or web development projects.'
        url='/contact'
      />
      <div className='max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-8'>
        <div className='bg-surface-container-lowest border border-outline-variant rounded shadow-xl overflow-hidden'>
          <div className='bg-surface-container-high px-4 py-3 flex items-center gap-2 border-b border-outline-variant'>
            <div className='flex gap-1.5'>
              <div className='w-3 h-3 rounded-full bg-[#ff5f56]'></div>
              <div className='w-3 h-3 rounded-full bg-[#ffbd2e]'></div>
              <div className='w-3 h-3 rounded-full bg-[#27c93f]'></div>
            </div>
            <span className='font-code-sm text-code-sm text-on-surface-variant'>
              kresna-portfolio — contact.md
            </span>
          </div>

          <div className='p-6 md:p-10'>
            <h1 className='font-headline-md text-headline-md text-primary mb-4'>
              # Contact Information
            </h1>
            <p className='text-on-surface-variant font-body-lg text-body-lg mb-8 max-w-2xl'>
              {contactIntro}
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
              <div>
                <h2 className='font-headline-sm text-headline-sm text-tertiary mb-3'>
                  ## Social Profiles
                </h2>
                <div className='flex flex-col gap-2'>
                  {socialProfiles.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-code-sm text-code-sm text-on-surface-variant hover:text-primary smooth-transition'
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h2 className='font-headline-sm text-headline-sm text-tertiary mb-3'>
                  ## Direct Reach
                </h2>
                <div className='border border-outline-variant bg-surface-container rounded p-4'>
                  <div className='font-code-sm text-code-sm text-on-surface-variant mb-1'>
                    EMAIL_ADDRESS
                  </div>
                  <a
                    href={`mailto:${directEmail}`}
                    className='font-code-sm text-lg text-primary hover:underline'
                  >
                    {directEmail}
                  </a>
                </div>
              </div>
            </div>

            <h2 className='font-headline-sm text-headline-sm text-tertiary mb-4'>
              ## Send a Message
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block font-code-sm text-code-sm text-on-surface-variant mb-2'>
                    sender.name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Your Full Name'
                    required
                    className='w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/40 focus:border-primary smooth-transition'
                  />
                </div>
                <div>
                  <label className='block font-code-sm text-code-sm text-on-surface-variant mb-2'>
                    sender.email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='email@example.com'
                    required
                    className='w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/40 focus:border-primary smooth-transition'
                  />
                </div>
              </div>

              <div>
                <label className='block font-code-sm text-code-sm text-on-surface-variant mb-2'>
                  message.body
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Write your project details or inquiry here...'
                  required
                  rows={6}
                  className='w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/40 focus:border-primary smooth-transition resize-none'
                />
              </div>

              <button
                type='submit'
                disabled={status === 'submitting'}
                className='w-full sm:w-auto self-start px-6 py-3 bg-primary text-on-primary font-label-caps text-label-caps rounded flex items-center justify-center gap-2 hover:opacity-90 smooth-transition active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed'
              >
                <span className='material-symbols-outlined text-[16px]'>
                  {status === 'submitting' ? 'hourglass_empty' : 'play_arrow'}
                </span>
                {status === 'submitting' ? 'SENDING...' : 'SUBMIT_FORM'}
              </button>

              {status === 'submitted' && (
                <p className='text-tertiary font-code-sm text-code-sm' role='status'>
                  $ message.send() → 200 OK
                </p>
              )}
              {status === 'error' && (
                <p className='text-error font-code-sm text-code-sm' role='alert'>
                  $ message.send() → 500 ERR — please try again or email{' '}
                  <a href={`mailto:${directEmail}`} className='hover:underline'>
                    {directEmail}
                  </a>
                </p>
              )}
            </form>

            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-10 pt-4 border-t border-outline-variant'>
              <div className='flex items-center gap-4 font-code-sm text-code-sm text-on-surface-variant'>
                <span className='flex items-center gap-1'>
                  <span className='material-symbols-outlined text-[14px]'>
                    history
                  </span>
                  Last edited: {meta.lastEdited}
                </span>
                <span className='flex items-center gap-1'>
                  <span className='material-symbols-outlined text-[14px]'>
                    visibility
                  </span>
                  {meta.views} views
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='px-2 py-1 border border-outline-variant text-on-surface-variant font-code-sm text-[11px] rounded'>
                  MARKDOWN
                </span>
                <span className='px-2 py-1 border border-outline-variant text-on-surface-variant font-code-sm text-[11px] rounded'>
                  UTF-8
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
          <div className='bg-secondary-container/10 border border-secondary/30 rounded-lg p-6 flex items-center gap-4'>
            <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-primary flex-shrink-0'>
              <img
                src={profile.avatar}
                alt={profile.name}
                className='w-full h-full object-cover'
              />
            </div>
            <div>
              <h3 className='font-headline-sm text-headline-sm text-secondary mb-1'>
                Looking for my Resume?
              </h3>
              <p className='text-on-surface-variant font-body-md text-body-md'>
                Download the latest version of my CV in PDF format for a
                complete overview of my experience.
              </p>
            </div>
          </div>
          <a
            href='/resume.pdf'
            download
            className='bg-surface-container border border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:border-primary smooth-transition'
          >
            <span className='material-symbols-outlined text-[28px] text-primary'>
              download
            </span>
            <span className='font-code-sm text-code-sm text-on-surface'>
              resume.pdf
            </span>
          </a>
        </div>
      </div>
    </>
  )
}

export default Contact
