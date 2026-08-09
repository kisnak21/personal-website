'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { contactIntro, socialProfiles, directEmail, meta } from '@/content/contactData'
import { useToast } from '@/context/ToastContext'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MAX_NAME_LENGTH = 100
const MAX_MESSAGE_LENGTH = 5000

function sanitizeSingleLine(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function sanitizeEmail(value: string): string {
  return sanitizeSingleLine(value).toLowerCase()
}

function sanitizeMessage(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const { error: showError } = useToast()
  const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_URL || ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const name = sanitizeSingleLine(formData.name)
    const email = sanitizeEmail(formData.email)
    const message = sanitizeMessage(formData.message)

    if (name.length < 2 || name.length > MAX_NAME_LENGTH) {
      showError(`Please enter a valid name (2-${MAX_NAME_LENGTH} characters).`)
      return
    }
    if (!EMAIL_REGEX.test(email)) {
      showError('Please enter a valid email address.')
      return
    }
    if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
      showError(`Message must be between 10 and ${MAX_MESSAGE_LENGTH} characters.`)
      return
    }

    if (!formEndpoint) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      const body = new FormData()
      body.append('name', name)
      body.append('email', email)
      body.append('message', message)
      body.append('_gotcha', '')

      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      })

      if (res.ok) {
        setStatus('submitted')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        showError('Message could not be sent. Please try again.')
      }
    } catch {
      setStatus('error')
      showError('Network error. Please try again or use email directly.')
    }
  }

  return (
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
          <h1 className='font-headline-md text-headline-md text-primary mb-4'># Contact Information</h1>
          <p className='text-on-surface-variant font-body-lg text-body-lg mb-8 max-w-2xl'>{contactIntro}</p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
            <div>
              <h2 className='font-headline-sm text-headline-sm text-tertiary mb-3'>## Social Profiles</h2>
              <div className='flex flex-col gap-2'>
                {socialProfiles.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-code-sm text-code-sm text-on-surface-variant hover:text-primary smooth-transition'
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className='font-headline-sm text-headline-sm text-tertiary mb-3'>## Direct Reach</h2>
              <div className='border border-outline-variant bg-surface-container rounded p-4'>
                <div className='font-code-sm text-code-sm text-on-surface-variant mb-1'>EMAIL_ADDRESS</div>
                <a href={`mailto:${directEmail}`} className='font-code-sm text-lg text-primary hover:underline'>
                  {directEmail}
                </a>
              </div>
            </div>
          </div>

          <h2 className='font-headline-sm text-headline-sm text-tertiary mb-4'>## Send a Message</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label htmlFor='sender-name' className='block font-code-sm text-code-sm text-on-surface-variant mb-2'>sender.name</label>
                <input
                  id='sender-name'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your Full Name'
                  required
                  maxLength={MAX_NAME_LENGTH}
                  className='w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/40 focus:border-primary smooth-transition'
                />
              </div>
              <div>
                <label htmlFor='sender-email' className='block font-code-sm text-code-sm text-on-surface-variant mb-2'>sender.email</label>
                <input
                  id='sender-email'
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
              <label htmlFor='message-body' className='block font-code-sm text-code-sm text-on-surface-variant mb-2'>message.body</label>
              <textarea
                id='message-body'
                name='message'
                value={formData.message}
                onChange={handleChange}
                placeholder='Write your project details or inquiry here...'
                required
                maxLength={MAX_MESSAGE_LENGTH}
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
              <p className='text-tertiary font-code-sm text-code-sm' role='status'>$ message.send() → 200 OK</p>
            )}
            {status === 'error' && (
              <p className='text-error font-code-sm text-code-sm' role='alert'>
                $ message.send() → 500 ERR — please try again or email{' '}
                <a href={`mailto:${directEmail}`} className='hover:underline'>{directEmail}</a>
              </p>
            )}
          </form>

          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-10 pt-4 border-t border-outline-variant'>
            <div className='flex items-center gap-4 font-code-sm text-code-sm text-on-surface-variant'>
              <span className='flex items-center gap-1'>
                <span className='material-symbols-outlined text-[14px]'>history</span>
                Last edited: {meta.lastEdited}
              </span>
              <span className='flex items-center gap-1'>
                <span className='material-symbols-outlined text-[14px]'>visibility</span>
                {meta.views} views
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='px-2 py-1 border border-outline-variant text-on-surface-variant font-code-sm text-[11px] rounded'>MARKDOWN</span>
              <span className='px-2 py-1 border border-outline-variant text-on-surface-variant font-code-sm text-[11px] rounded'>UTF-8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
