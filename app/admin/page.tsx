'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Key } from 'lucide-react'
import { useAdmin } from '@/context/AdminContext'

export default function AdminLoginPage() {
  const [key, setKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAdmin()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const result = await login(key)
    if (result.success) {
      router.push('/admin/dashboard')
    } else {
      setError(result.error || 'Invalid admin key')
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        <div className='bg-surface-container rounded-lg border border-outline-variant shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4'>
              <Shield className='w-8 h-8 text-primary' />
            </div>
            <h1 className='font-headline-md text-headline-md text-on-surface mb-2'>Admin Panel</h1>
            <p className='font-body-md text-body-md text-on-surface-variant'>
              Enter your admin API key to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='admin-key' className='block font-code-sm text-code-sm text-on-surface-variant mb-2'>
                Admin API Key
              </label>
              <div className='relative'>
                <Key className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-on-surface-variant' />
                <input
                  id='admin-key'
                  type='password'
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder='Enter your admin key'
                  className='w-full pl-10 pr-4 py-3 bg-background border border-outline-variant rounded font-code-sm text-code-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none smooth-transition'
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className='bg-error/10 border border-error/30 rounded p-3'>
                <p className='font-code-sm text-code-sm text-error'>{error}</p>
              </div>
            )}

            <button
              type='submit'
              disabled={isLoading || !key.trim()}
              className='w-full py-3 bg-primary text-on-primary font-label-caps text-label-caps rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition active:scale-95'
            >
              {isLoading ? (
                <span className='flex items-center justify-center gap-2'>
                  <span className='material-symbols-outlined animate-spin text-[18px]'>sync</span>
                  AUTHENTICATING...
                </span>
              ) : (
                'ACCESS_DASHBOARD'
              )}
            </button>
          </form>

          <div className='mt-6 pt-6 border-t border-outline-variant text-center'>
            <button
              onClick={() => router.push('/')}
              className='text-on-surface-variant hover:text-primary font-code-sm text-code-sm smooth-transition'
            >
              ← Return to public site
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
