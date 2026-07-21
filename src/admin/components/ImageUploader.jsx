import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { uploadProjectImage, deleteProjectImage } from '../../api/projects.js'

export const ImageUploader = ({ slug, currentImage, onImageUpload, onImageDelete, onAltTextChange, altText }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Basic validation
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, WebP)')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be less than 2MB')
      return
    }

    if (!slug) {
      setError('Project slug is required before uploading an image')
      return
    }

    setError('')
    setIsUploading(true)

    try {
      const result = await uploadProjectImage(file, slug)
      
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
    
    if (window.confirm('Are you sure you want to delete this image?')) {
      setIsUploading(true)
      
      try {
        const result = await deleteProjectImage(currentImage)
        if (result.error) {
          setError(result.error.message || 'Failed to delete image')
        } else {
          onImageDelete()
        }
      } catch (err) {
        console.error(err)
        setError('An unexpected error occurred during deletion')
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="font-code-sm text-code-sm text-on-surface-variant">Project Screenshot</label>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-sm">
          {error}
        </div>
      )}

      {currentImage ? (
        <div className="relative border border-outline-variant rounded-lg overflow-hidden group bg-surface-container-lowest">
          <img 
            src={currentImage} 
            alt="Project Preview" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isUploading}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 smooth-transition flex items-center justify-center"
              title="Delete Image"
            >
              <Trash2Icon />
            </button>
          </div>
          
          <div className="p-3 border-t border-outline-variant bg-surface-container">
            <input
              type="text"
              value={altText || ''}
              onChange={(e) => onAltTextChange(e.target.value)}
              placeholder="Alt text (for accessibility)"
              className="w-full px-3 py-2 bg-bg-primary border border-outline-variant rounded font-code-sm text-[12px] text-on-surface focus:border-primary focus:outline-none smooth-transition"
            />
          </div>
        </div>
      ) : (
        <div 
          className={`border-2 border-dashed border-outline-variant rounded-lg p-8 flex flex-col items-center justify-center text-center smooth-transition ${
            isUploading ? 'opacity-50 pointer-events-none' : 'hover:border-primary/50 hover:bg-surface-container-high cursor-pointer'
          }`}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          {isUploading ? (
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          ) : (
            <div className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center mb-4 text-on-surface-variant">
              <Upload size={24} />
            </div>
          )}
          <p className="font-headline-sm text-[14px] text-on-surface mb-1">
            {isUploading ? 'Uploading...' : 'Click to upload image'}
          </p>
          <p className="font-code-sm text-[11px] text-on-surface-variant">
            SVG, PNG, JPG or GIF (max. 2MB)
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
            className="hidden"
          />
        </div>
      )}
    </div>
  )
}

function Trash2Icon() {
  return <X size={20} />
}