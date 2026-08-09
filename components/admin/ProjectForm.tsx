'use client'

import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ImageUploader } from './ImageUploader'
import type { Project } from '@/lib/types'

const materialIcons = [
  { name: 'code' }, { name: 'explore' }, { name: 'folder_special' }, 
  { name: 'folder_open' }, { name: 'data_object' }, { name: 'auto_stories' },
  { name: 'checklist' }, { name: 'browser_updated' }, { name: 'desktop_access_disabled' }, 
  { name: 'cloud_download' }, { name: 'layers' }, { name: 'storage' }, 
  { name: 'web' }, { name: 'laptop' }, { name: 'desktop' }, { name: 'phone' }, { name: 'tablet' }
]

interface ProjectFormProps {
  project?: Project | null
  onSuccess?: () => void
  onCancel?: () => void
}

export function ProjectForm({ project = null, onSuccess, onCancel }: ProjectFormProps) {
  const queryClient = useQueryClient()
  const isEditing = !!project

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    tech_stack: [] as string[],
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: !isEditing ? generateSlug(title) : prev.slug
    }))
  }

  const handleAddTech = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (('key' in e && e.key === 'Enter') || e.type === 'click') {
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

  const removeTech = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tech_stack: prev.tech_stack.filter(t => t !== techToRemove)
    }))
  }

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const url = isEditing ? `/api/admin/projects/${project.id}` : '/api/admin/projects'
      const method = isEditing ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to save project')
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      onSuccess?.()
    },
    onError: (err: Error) => {
      setError(err.message)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.slug || !formData.description) {
      setError('Title, slug, and description are required')
      return
    }
    mutation.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container p-6 rounded-lg border border-outline space-y-6">
      <h2 className="font-headline-sm text-headline-sm text-primary">
        {isEditing ? 'Edit Project' : 'Create New Project'}
      </h2>

      {error && (
        <div className="bg-error/10 border border-error text-error p-3 rounded text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-label-caps text-xs font-semibold text-on-surface mb-1">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            required
            className="w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block font-label-caps text-xs font-semibold text-on-surface mb-1">
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            required
            className="w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface font-code-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block font-label-caps text-xs font-semibold text-on-surface mb-1">
            Icon (Material Symbol)
          </label>
          <select
            value={formData.icon}
            onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
            className="w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
          >
            {materialIcons.map(icon => (
              <option key={icon.name} value={icon.name}>{icon.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-label-caps text-xs font-semibold text-on-surface mb-1">
            Sort Order
          </label>
          <input
            type="number"
            value={formData.sort_order}
            onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
            className="w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block font-label-caps text-xs font-semibold text-on-surface mb-1">
            GitHub URL
          </label>
          <input
            type="url"
            value={formData.github_url}
            onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
            className="w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block font-label-caps text-xs font-semibold text-on-surface mb-1">
            Demo URL
          </label>
          <input
            type="url"
            value={formData.demo_url}
            onChange={(e) => setFormData(prev => ({ ...prev, demo_url: e.target.value }))}
            className="w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block font-label-caps text-xs font-semibold text-on-surface mb-1">
          Description *
        </label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
          className="w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block font-label-caps text-xs font-semibold text-on-surface mb-1">
          Tech Stack (Tekan Enter)
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={handleAddTech}
            placeholder="e.g., React, Next.js, PostgreSQL"
            className="flex-1 bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="bg-surface-variant hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded text-sm"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {formData.tech_stack.map(tech => (
            <span key={tech} className="bg-primary/10 text-primary border border-primary/20 font-label-caps text-xs px-2.5 py-1 rounded flex items-center gap-1.5">
              {tech}
              <button
                type="button"
                onClick={() => removeTech(tech)}
                className="hover:text-error"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </span>
          ))}
        </div>
      </div>

      <ImageUploader
        slug={formData.slug}
        currentImage={formData.screenshot_url}
        altText={formData.screenshot_alt}
        onAltTextChange={(text) => setFormData(prev => ({ ...prev, screenshot_alt: text }))}
        onImageUpload={(url) => setFormData(prev => ({ ...prev, screenshot_url: url }))}
        onImageDelete={() => setFormData(prev => ({ ...prev, screenshot_url: '' }))}
      />

      <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
        <div className="flex gap-4">
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="rounded bg-surface border-outline-variant text-primary h-4 w-4"
            />
            <span className="font-label-caps text-sm text-on-surface">Featured</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="rounded bg-surface border-outline-variant text-primary h-4 w-4"
            />
            <span className="font-label-caps text-sm text-on-surface">Published</span>
          </label>
        </div>

        <div className="flex gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded border border-outline text-on-surface-variant hover:bg-surface-variant text-sm font-medium"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-primary hover:bg-primary-container text-on-primary font-medium px-6 py-2 rounded text-sm flex items-center space-x-2"
          >
            {mutation.isPending ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </div>
    </form>
  )
}
