'use client'

import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NoteImageUploader } from './NoteImageUploader'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { useProjectsAdmin } from '@/hooks/useAdminQueries'
import type { Note } from '@/lib/types'

const CHEAT_SHEET = [
  { label: 'Heading 1 / Judul Utama', syntax: '# Judul Artikel' },
  { label: 'Heading 2 / Subjudul', syntax: '## Subjudul' },
  { label: 'Heading 3 / Poin Kecil', syntax: '### Poin Kecil' },
  { label: 'Tebal (Bold)', syntax: '**Teks tebal**' },
  { label: 'Miring (Italic)', syntax: '*Teks miring*' },
  { label: 'Link URL', syntax: '[Teks Link](https://contoh.com)' },
  { label: 'List Angka', syntax: '1. Item satu\n2. Item dua' },
  { label: 'List Bullet', syntax: '- Item pertama\n- Item kedua' },
  { label: 'Code Block (Syntax Highlight)', syntax: '```js\nconst x = 10;\n```' },
  { label: 'Kutipan (Quote)', syntax: '> Catatan penting...' }
]

interface NoteFormProps {
  note?: Note | null
  onSuccess?: () => void
  onCancel?: () => void
}

export function NoteForm({ note = null, onSuccess, onCancel }: NoteFormProps) {
  const queryClient = useQueryClient()
  const isEditing = !!note
  const { data: projects = [] } = useProjectsAdmin()

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    cover_image_alt: '',
    project_id: '',
    tags: [] as string[],
    published: false,
    sort_order: 0
  })
  const [tagInput, setTagInput] = useState('')
  const [error, setError] = useState('')
  const [showCheatSheet, setShowCheatSheet] = useState(false)
  const [activeTab, setActiveTab] = useState<'edit' | 'split' | 'preview'>('split')

  useEffect(() => {
    if (note) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: note.title || '',
        slug: note.slug || '',
        excerpt: note.excerpt || '',
        content: note.content || '',
        cover_image_url: note.cover_image_url || '',
        cover_image_alt: note.cover_image_alt || '',
        project_id: note.project_id || '',
        tags: note.tags || [],
        published: !!note.published,
        sort_order: note.sort_order || 0
      })
    }
  }, [note])

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

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (('key' in e && e.key === 'Enter') || e.type === 'click') {
      e.preventDefault()
      const tag = tagInput.trim()
      if (tag && !formData.tags.includes(tag)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
        setTagInput('')
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }))
  }

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const payload = { ...data, project_id: data.project_id || null }
      const url = isEditing ? `/api/admin/notes/${note.id}` : '/api/admin/notes'
      const method = isEditing ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to save note')
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notes'] })
      queryClient.invalidateQueries({ queryKey: ['notes'] }) // for public pages revalidation cache hint
      onSuccess?.()
    },
    onError: (err: Error) => setError(err.message)
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.slug || !formData.content) {
      setError('Title, slug, and content are required')
      return
    }
    mutation.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='bg-surface-container p-6 rounded-lg border border-outline space-y-6'>
      <div className='flex justify-between items-center border-b border-outline-variant pb-4'>
        <h2 className='font-headline-sm text-headline-sm text-primary'>
          {isEditing ? 'Edit Note' : 'Create New Note'}
        </h2>
        <button
          type='button'
          onClick={() => setShowCheatSheet(!showCheatSheet)}
          className='flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary border border-secondary/30 rounded text-xs font-code-sm hover:bg-secondary/20 transition-colors'
        >
          <span className='material-symbols-outlined text-[16px]'>help</span>
          {showCheatSheet ? 'Tutup Cheat Sheet' : 'Markdown Cheat Sheet'}
        </button>
      </div>

      {error && <div className='bg-error/10 border border-error text-error p-3 rounded text-sm'>{error}</div>}

      {showCheatSheet && (
        <div className='bg-surface-container-highest p-4 rounded border border-secondary/40 text-xs space-y-3'>
          <div className='font-bold text-secondary flex items-center justify-between'>
            <span>Panduan Singkat Penulisan Markdown</span>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar'>
            {CHEAT_SHEET.map((item, i) => (
              <div key={i} className='bg-surface p-2 rounded border border-outline-variant flex flex-col gap-1'>
                <span className='text-on-surface font-semibold'>{item.label}</span>
                <code className='bg-surface-container text-secondary px-1.5 py-0.5 rounded font-code-sm select-all whitespace-pre-wrap'>
                  {item.syntax}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className='block font-label-caps text-xs font-semibold text-on-surface mb-1'>Title *</label>
          <input
            type='text'
            value={formData.title}
            onChange={handleTitleChange}
            required
            className='w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary'
          />
        </div>
        <div>
          <label className='block font-label-caps text-xs font-semibold text-on-surface mb-1'>Slug *</label>
          <input
            type='text'
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            required
            className='w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface font-code-sm focus:outline-none focus:border-primary'
          />
        </div>
        <div>
          <label className='block font-label-caps text-xs font-semibold text-on-surface mb-1'>Project Relasi (Opsional)</label>
          <select
            value={formData.project_id}
            onChange={(e) => setFormData(prev => ({ ...prev, project_id: e.target.value }))}
            className='w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary'
          >
            <option value=''>-- Tanpa Project --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className='block font-label-caps text-xs font-semibold text-on-surface mb-1'>Sort Order</label>
          <input
            type='number'
            value={formData.sort_order}
            onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
            className='w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary'
          />
        </div>
      </div>

      <div>
        <label className='block font-label-caps text-xs font-semibold text-on-surface mb-1'>Excerpt / Ringkasan</label>
        <textarea
          rows={2}
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          className='w-full bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary'
        />
      </div>

      <div>
        <label className='block font-label-caps text-xs font-semibold text-on-surface mb-1'>Tags (Tekan Enter)</label>
        <div className='flex gap-2 mb-2'>
          <input
            type='text'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className='flex-1 bg-surface border border-outline-variant rounded px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary'
          />
          <button type='button' onClick={handleAddTag} className='bg-surface-variant hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded text-sm'>Add</button>
        </div>
        <div className='flex flex-wrap gap-1.5'>
          {formData.tags.map(tag => (
            <span key={tag} className='bg-primary/10 text-primary border border-primary/20 font-label-caps text-xs px-2.5 py-1 rounded flex items-center gap-1.5'>
              #{tag}
              <button type='button' onClick={() => removeTag(tag)} className='hover:text-error'><span className='material-symbols-outlined text-[14px]'>close</span></button>
            </span>
          ))}
        </div>
      </div>

      <NoteImageUploader
        slug={formData.slug}
        currentImage={formData.cover_image_url}
        altText={formData.cover_image_alt}
        onAltTextChange={(text) => setFormData(prev => ({ ...prev, cover_image_alt: text }))}
        onImageUpload={(url) => setFormData(prev => ({ ...prev, cover_image_url: url }))}
        onImageDelete={() => setFormData(prev => ({ ...prev, cover_image_url: '' }))}
      />

      <div className='border border-outline-variant rounded overflow-hidden'>
        <div className='bg-surface-container-high px-4 py-2 border-b border-outline-variant flex items-center justify-between'>
          <label className='font-label-caps text-xs font-semibold text-on-surface'>Markdown Content *</label>
          <div className='flex gap-1 bg-surface rounded p-0.5 border border-outline-variant'>
            <button type='button' onClick={() => setActiveTab('edit')} className={`px-3 py-1 rounded text-xs font-code-sm ${activeTab === 'edit' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Edit</button>
            <button type='button' onClick={() => setActiveTab('split')} className={`hidden md:block px-3 py-1 rounded text-xs font-code-sm ${activeTab === 'split' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Split</button>
            <button type='button' onClick={() => setActiveTab('preview')} className={`px-3 py-1 rounded text-xs font-code-sm ${activeTab === 'preview' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Preview</button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 min-h-[450px]'>
          <div className={`${activeTab === 'preview' ? 'hidden' : 'block'} ${activeTab === 'edit' ? 'md:col-span-2' : ''} border-r border-outline-variant flex flex-col`}>
            <textarea
              rows={18}
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              required
              className='w-full h-full bg-surface p-4 text-sm font-code-sm text-on-surface focus:outline-none resize-none custom-scrollbar'
            />
          </div>

          <div className={`${activeTab === 'edit' ? 'hidden' : 'block'} ${activeTab === 'preview' ? 'md:col-span-2' : ''} bg-surface-container-lowest p-6 overflow-y-auto max-h-[550px] custom-scrollbar`}>
            <div className='markdown-content text-sm'>
              {formData.content ? <MarkdownRenderer content={formData.content} /> : <span className='text-on-surface-variant/40 italic'>Preview...</span>}
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between pt-4 border-t border-outline-variant'>
        <label className='flex items-center space-x-2 cursor-pointer select-none'>
          <input
            type='checkbox'
            checked={formData.published}
            onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
            className='rounded bg-surface border-outline-variant text-primary h-4 w-4'
          />
          <span className='font-label-caps text-sm text-on-surface'>Published</span>
        </label>

        <div className='flex gap-3'>
          {onCancel && (
            <button type='button' onClick={onCancel} disabled={mutation.isPending} className='px-4 py-2 rounded border border-outline text-on-surface-variant hover:bg-surface-variant text-sm font-medium'>Cancel</button>
          )}
          <button type='submit' disabled={mutation.isPending} className='bg-primary hover:bg-primary-container text-on-primary font-medium px-6 py-2 rounded text-sm flex items-center space-x-2'>
            {mutation.isPending ? 'Saving...' : isEditing ? 'Update Note' : 'Create Note'}
          </button>
        </div>
      </div>
    </form>
  )
}
