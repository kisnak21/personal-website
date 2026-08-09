'use client'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface NoteImageUploaderProps {
  slug: string
  currentImage?: string
  onImageUpload: (url: string) => void
  onImageDelete: () => void
  onAltTextChange: (text: string) => void
  altText?: string
}

export function NoteImageUploader({ slug, currentImage, onImageUpload, onImageDelete, onAltTextChange, altText }: NoteImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, WebP)')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be less than 2MB')
      return
    }

    if (!slug) {
      setError('Note slug is required before uploading an image. Please enter a title first.')
      return
    }

    setError('')
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', 'note-images')
      formData.append('path', slug)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const result = await res.json()

      if (!res.ok) {
        setError(result.error || 'Failed to upload image')
      } else {
        onImageUpload(result.url)
      }
    } catch (err) {
      setError('An unexpected error occurred during upload')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this cover image?')) return
    onImageDelete()
  }

  return (
    <div className='space-y-3'>
      <label className='block font-label-caps text-xs font-semibold text-on-surface'>
        Cover Image (Optional)
      </label>

      {error && <div className='bg-error/10 border border-error text-error text-xs p-2 rounded'>{error}</div>}

      {currentImage ? (
        <div className='space-y-3 bg-surface-container-high p-4 rounded border border-outline'>
          <div className='relative rounded overflow-hidden max-h-48 bg-surface-container flex items-center justify-center'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentImage} alt={altText || 'Cover preview'} className='max-h-48 w-full object-cover' />
            <button
              type='button'
              onClick={handleDelete}
              disabled={isUploading}
              className='absolute top-2 right-2 bg-error text-on-error p-1.5 rounded-full hover:bg-error/90 shadow-md disabled:opacity-50'
            >
              <X size={16} />
            </button>
          </div>
          <div>
            <label className='block font-label-caps text-[10px] text-on-surface-variant mb-1'>Alt Text</label>
            <input
              type='text'
              value={altText || ''}
              onChange={(e) => onAltTextChange(e.target.value)}
              className='w-full bg-surface border border-outline-variant rounded px-3 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary'
            />
          </div>
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-outline-variant hover:border-primary bg-surface-container rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <input type='file' ref={fileInputRef} onChange={handleFileChange} accept='image/*' className='hidden' disabled={isUploading} />
          <div className='flex flex-col items-center space-y-2'>
            <div className='p-3 bg-surface rounded-full text-primary'>
              <Upload size={24} className={isUploading ? 'animate-bounce' : ''} />
            </div>
            <div className='text-sm font-medium text-on-surface'>{isUploading ? 'Uploading...' : 'Click to upload cover image'}</div>
            <div className='text-xs text-on-surface-variant'>PNG, JPG, WebP up to 2MB</div>
          </div>
        </div>
      )}
    </div>
  )
}
