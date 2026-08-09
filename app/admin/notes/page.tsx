'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotesAdmin } from '@/hooks/useAdminQueries'
import { NoteForm } from '@/components/admin/NoteForm'
import { Plus, Pencil, Trash2, Search, ExternalLink, Calendar } from 'lucide-react'
import { useToast } from '@/context/ToastContext'

export default function NotesManagerPage() {
  const queryClient = useQueryClient()
  const { success: toastSuccess, error: toastError } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [selectedNote, setSelectedNote] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPublished, setFilterPublished] = useState('all')

  const { data: notes = [], isLoading, error } = useNotesAdmin()

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/notes/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to delete note')
      }
      return true
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notes'] })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      toastSuccess('Note deleted')
    },
    onError: (err: Error) => toastError(err.message)
  })

  const handleEdit = (note: any) => {
    setSelectedNote(note)
    setIsEditing(true)
  }

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete note "${title}"?`)) {
      deleteMutation.mutate(id)
    }
  }

  const handleFormSuccess = () => {
    setIsEditing(false)
    setSelectedNote(null)
    toastSuccess('Note saved')
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    if (!matchesSearch) return false
    if (filterPublished === 'published') return note.published
    if (filterPublished === 'draft') return !note.published
    return true
  })

  if (isEditing) {
    return (
      <NoteForm
        note={selectedNote}
        onSuccess={handleFormSuccess}
        onCancel={() => { setIsEditing(false); setSelectedNote(null) }}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-headline-md text-on-surface">Notes & Blog Manager</h1>
          <p className="text-sm font-body-md text-on-surface-variant mt-1">Write, manage, and publish developer notes.</p>
        </div>
        <button
          onClick={() => { setSelectedNote(null); setIsEditing(true) }}
          className="bg-primary hover:bg-primary-container text-on-primary font-medium px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={18} />
          <span>New Note</span>
        </button>
      </div>

      {error && <div className="bg-error/10 border border-error text-error p-4 rounded-lg">Failed to load notes</div>}

      {!isLoading && (
        <div className="flex flex-col sm:flex-row gap-4 bg-surface-container p-4 rounded-lg border border-outline">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search by title, slug, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>
          <select
            value={filterPublished}
            onChange={(e) => setFilterPublished(e.target.value)}
            className="bg-surface border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-on-surface-variant">Loading notes...</div>
      ) : filteredNotes.length === 0 ? (
        <div className="bg-surface-container border border-outline-variant rounded-lg p-12 text-center">
          <p className="text-on-surface-variant">No notes found.</p>
        </div>
      ) : (
        <div className="bg-surface-container border border-outline-variant rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-high text-on-surface-variant font-label-caps text-xs">
                  <th className="p-4">Article</th>
                  <th className="p-4">Project</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm text-on-surface font-body-md">
                {filteredNotes.map((note) => (
                  <tr key={note.id} className="hover:bg-surface-variant/50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold line-clamp-1">{note.title}</div>
                      <div className="text-xs text-on-surface-variant font-code-sm flex items-center gap-2 mt-1">
                        <span>/{note.slug}</span>
                        <span className="flex items-center gap-1 text-tertiary">
                          <Calendar size={12} />
                          {new Date(note.created_at).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      {note.projects ? (
                        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-code-sm">
                          {note.projects.title}
                        </span>
                      ) : (
                        <span className="text-on-surface-variant/40 text-xs">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-label-caps ${
                        note.published
                          ? 'bg-secondary/10 text-secondary border border-secondary/30'
                          : 'bg-on-surface-variant/10 text-on-surface-variant border border-on-surface-variant/20'
                      }`}>
                        {note.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center space-x-2">
                        {note.published && (
                          <a href={`/notes/${note.slug}`} target="_blank" rel="noreferrer" className="p-1.5 text-on-surface-variant hover:text-primary rounded hover:bg-surface">
                            <ExternalLink size={16} />
                          </a>
                        )}
                        <button onClick={() => handleEdit(note)} className="p-1.5 text-on-surface-variant hover:text-primary rounded hover:bg-surface">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(note.id, note.title)} className="p-1.5 text-on-surface-variant hover:text-error rounded hover:bg-surface">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
