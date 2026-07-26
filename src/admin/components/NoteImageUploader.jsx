import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { uploadNoteCoverImage, deleteNoteCoverImage } from '../../api/notes.js'

export const NoteImageUploader = ({ slug, currentImage, onImageUpload, onImageDelete, onAltTextChange, altText }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileChange = async (e) => {
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
      const result = await uploadNoteCoverImage(file, slug)
      
      if (result.error) {
        setError(result.error.message || 'Failed to upload image')
      } else if (result.data) {
        onImageUpload(result.data)
      }
    } catch (err) {
      console.error(err)
      setError('An unexpected error occurred during upload')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDelete = async () => {
    if (!currentImage) return

    if (!window.confirm('Are you sure you want to delete this cover image?')) return

    setIsUploading(true)
    setError('')

    try {
      if (currentImage.includes('/note-images/')) {
        const result = await deleteNoteCoverImage(currentImage)
        if (result.error) {
          console.error('Failed to delete image from storage:', result.error)
        }
      }
      onImageDelete()
    } catch (err) {
      console.error('Error deleting image:', err)
      setError('An error occurred while deleting the image')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <label className="block font-label-caps text-xs font-semibold text-on-surface">
        Cover Image (Optional)
      </label>

      {error && (
        <div className="bg-error/10 border border-error text-error text-xs p-2 rounded">
          {error}
        </div>
      )}

      {currentImage ? (
        <div className="space-y-3 bg-surface-container-high p-4 rounded border border-outline">
          <div className="relative rounded overflow-hidden max-h-48 bg-surface-container flex items-center justify-center">
            <img 
              src={currentImage} 
              alt={altText || 'Note cover preview'} 
              className="max-h-48 w-full object-cover"
            />
            <button
              type="button"
              onClick={handleDelete}
              disabled={isUploading}
              className="absolute top-2 right-2 bg-error text-on-error p-1.5 rounded-full hover:bg-error/90 transition-colors shadow-md disabled:opacity-50"
              title="Delete image"
            >
              <X size={16} />
            </button>
          </div>

          <div>
            <label className="block font-label-caps text-[10px] text-on-surface-variant mb-1">
              Alt Text (for accessibility & SEO)
            </label>
            <input
              type="text"
              value={altText || ''}
              onChange={(e) => onAltTextChange(e.target.value)}
              placeholder="e.g., Arsitektur diagram untuk Buildfolio"
              className="w-full bg-surface border border-outline-variant rounded px-3 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary"
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
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={isUploading}
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-surface rounded-full text-primary">
              <Upload size={24} className={isUploading ? 'animate-bounce' : ''} />
            </div>
            <div className="text-sm font-medium text-on-surface">
              {isUploading ? 'Uploading...' : 'Click to upload cover image'}
            </div>
            <div className="text-xs text-on-surface-variant">
              PNG, JPG, WebP up to 2MB
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
