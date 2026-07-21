import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProject, updateProject } from '../../api/projects.js'
import { ImageUploader } from './ImageUploader.jsx'

export const ProjectForm = ({ project = null, onSuccess, onCancel }) => {
  const queryClient = useQueryClient()
  const isEditing = !!project

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    tech_stack: [],
    icon: 'code',
    github_url: '',
    demo_url: '',
    featured: false,
    published: true,
    sort_order: 0,
    screenshot_url: '',
    screenshot_alt: '',
  })
  const [techInput, setTechInput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        slug: project.slug || '',
        description: project.description || '',
        tech_stack: project.tech_stack || [],
        icon: project.icon || 'code',
        github_url: project.github_url || '',
        demo_url: project.demo_url || '',
        featured: !!project.featured,
        published: project.published !== false,
        sort_order: project.sort_order || 0,
        screenshot_url: project.screenshot_url || '',
        screenshot_alt: project.screenshot_alt || '',
      })
    }
  }, [project])

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: !isEditing ? generateSlug(title) : prev.slug // auto-generate slug only on creation
    }))
  }

  const handleAddTech = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault()
      const tech = techInput.trim()
      if (tech && !formData.tech_stack.includes(tech)) {
        setFormData(prev => ({
          ...prev,
          tech_stack: [...prev.tech_stack, tech]
        }))
        setTechInput('')
      }
    }
  }

  const removeTech = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      tech_stack: prev.tech_stack.filter(t => t !== techToRemove)
    }))
  }

  const mutation = useMutation({
    mutationFn: (data) => isEditing ? updateProject(project.id, data) : createProject(data),
    onSuccess: (result) => {
      if (result.error) {
        setError(result.error.message || 'An error occurred saving the project')
      } else {
        queryClient.invalidateQueries(['projects'])
        onSuccess?.()
      }
    },
    onError: (err) => {
      setError(err.message || 'An error occurred')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.slug || !formData.description) {
      setError('Title, slug, and description are required')
      return
    }
    
    mutation.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded font-code-sm text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Core Info */}
        <div className="space-y-4">
          <div>
            <label className="block font-code-sm text-code-sm text-on-surface-variant mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 bg-bg-primary border border-outline-variant rounded text-on-surface focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-code-sm text-code-sm text-on-surface-variant mb-1">Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={e => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
              className="w-full px-4 py-2 bg-bg-primary border border-outline-variant rounded text-on-surface focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-code-sm text-code-sm text-on-surface-variant mb-1">Description *</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-bg-primary border border-outline-variant rounded text-on-surface focus:border-primary focus:outline-none min-h-[100px]"
              required
            />
          </div>

          <div>
            <label className="block font-code-sm text-code-sm text-on-surface-variant mb-1">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={handleAddTech}
                placeholder="e.g. React"
                className="flex-1 px-4 py-2 bg-bg-primary border border-outline-variant rounded text-on-surface focus:border-primary focus:outline-none"
              />
              <button 
                type="button"
                onClick={handleAddTech}
                className="px-4 py-2 bg-surface-variant text-on-surface rounded hover:bg-surface-container-high"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tech_stack.map(tech => (
                <span key={tech} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded font-code-sm text-[11px]">
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-500 material-symbols-outlined text-[14px]">
                    close
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Media & Settings */}
        <div className="space-y-4">
          <ImageUploader 
            slug={formData.slug}
            currentImage={formData.screenshot_url}
            altText={formData.screenshot_alt}
            onImageUpload={(url) => setFormData({ ...formData, screenshot_url: url })}
            onImageDelete={() => setFormData({ ...formData, screenshot_url: '' })}
            onAltTextChange={(text) => setFormData({ ...formData, screenshot_alt: text })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-code-sm text-code-sm text-on-surface-variant mb-1">Material Icon</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-tertiary">
                  {formData.icon}
                </span>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={e => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-bg-primary border border-outline-variant rounded text-on-surface focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-code-sm text-code-sm text-on-surface-variant mb-1">Sort Order</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-bg-primary border border-outline-variant rounded text-on-surface focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block font-code-sm text-code-sm text-on-surface-variant mb-1">GitHub URL</label>
              <input
                type="url"
                value={formData.github_url}
                onChange={e => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full px-4 py-2 bg-bg-primary border border-outline-variant rounded text-on-surface focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-code-sm text-code-sm text-on-surface-variant mb-1">Demo URL</label>
              <input
                type="url"
                value={formData.demo_url}
                onChange={e => setFormData({ ...formData, demo_url: e.target.value })}
                className="w-full px-4 py-2 bg-bg-primary border border-outline-variant rounded text-on-surface focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-6 pt-4 border-t border-outline-variant">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={e => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-bg-primary"
              />
              <span className="font-code-sm text-code-sm text-on-surface">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-bg-primary"
              />
              <span className="font-code-sm text-code-sm text-on-surface">Featured</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-outline-variant">
        <button
          type="button"
          onClick={onCancel}
          disabled={mutation.isPending}
          className="px-6 py-2 border border-outline-variant text-on-surface rounded font-label-caps hover:bg-surface-variant smooth-transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-6 py-2 bg-primary text-on-primary rounded font-label-caps hover:opacity-90 disabled:opacity-50 smooth-transition flex items-center gap-2"
        >
          {mutation.isPending && <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />}
          {isEditing ? 'Save Changes' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}