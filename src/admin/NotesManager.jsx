import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Edit2, Trash2, Search, ExternalLink, Calendar } from 'lucide-react'
import { useNotes } from '../hooks/useNotes.js'
import { deleteNote } from '../api/notes.js'
import { NoteForm } from './components/NoteForm.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function NotesManager() {
  const queryClient = useQueryClient()
  const { success: toastSuccess, error: toastError } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPublished, setFilterPublished] = useState('all') // 'all', 'published', 'draft'

  const { data: notes = [], isLoading, error } = useNotes({ all: true })

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'], exact: false })
      toastSuccess('Note deleted successfully')
    },
    onError: (err) => {
      toastError(err.message || 'Error deleting note')
    }
  })

  const handleCreateNew = () => {
    setSelectedNote(null)
    setIsEditing(true)
  }

  const handleEdit = (note) => {
    setSelectedNote(note)
    setIsEditing(true)
  }

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete note "${title}"?`)) {
      deleteMutation.mutate(id)
    }
  }

  const handleFormSuccess = () => {
    setIsEditing(false)
    setSelectedNote(null)
    toastSuccess(selectedNote ? 'Note updated successfully' : 'Note created successfully')
  }

  const handleFormCancel = () => {
    setIsEditing(false)
    setSelectedNote(null)
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    if (!matchesSearch) return false

    if (filterPublished === 'published') return note.published
    if (filterPublished === 'draft') return !note.published
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-headline-md text-on-surface">
            Notes & Blog Manager
          </h1>
          <p className="text-sm font-body-md text-on-surface-variant mt-1">
            Write, manage, and publish developer notes or learning logs.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleCreateNew}
            className="bg-primary hover:bg-primary-container text-on-primary font-medium px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span>New Note</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <NoteForm
          note={selectedNote}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <div className="space-y-4">
          {/* Filters & Search */}
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

            <div className="flex gap-2">
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
          </div>

          {/* Error / Loading State */}
          {error && (
            <div className="bg-error/10 border border-error text-error p-4 rounded-lg">
              Failed to load notes: {error.message}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12 text-on-surface-variant">
              Loading notes...
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="bg-surface-container border border-outline-variant rounded-lg p-12 text-center">
              <p className="text-on-surface-variant mb-4">No notes found matching criteria.</p>
              <button
                onClick={handleCreateNew}
                className="text-primary hover:underline text-sm font-medium"
              >
                Create your first note now
              </button>
            </div>
          ) : (
            /* Notes List Table */
            <div className="bg-surface-container border border-outline-variant rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant bg-surface-container-high text-on-surface-variant font-label-caps text-xs">
                      <th className="p-4">Article</th>
                      <th className="p-4">Project Relasi</th>
                      <th className="p-4">Tags</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant text-sm text-on-surface font-body-md">
                    {filteredNotes.map((note) => (
                      <tr key={note.id} className="hover:bg-surface-variant/50 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-on-surface line-clamp-1">{note.title}</div>
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
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {note.tags?.slice(0, 3).map((t) => (
                              <span key={t} className="bg-surface px-1.5 py-0.5 rounded border border-outline-variant font-label-caps text-[10px] text-on-surface-variant">
                                #{t}
                              </span>
                            ))}
                            {note.tags?.length > 3 && (
                              <span className="text-[10px] text-on-surface-variant self-center">+{note.tags.length - 3}</span>
                            )}
                          </div>
                        </td>

                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium font-label-caps inline-block ${
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
                              <a
                                href={`/notes/${note.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 text-on-surface-variant hover:text-primary rounded hover:bg-surface transition-colors"
                                title="View live article"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                            <button
                              onClick={() => handleEdit(note)}
                              className="p-1.5 text-on-surface-variant hover:text-primary rounded hover:bg-surface transition-colors"
                              title="Edit note"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(note.id, note.title)}
                              className="p-1.5 text-on-surface-variant hover:text-error rounded hover:bg-surface transition-colors"
                              title="Delete note"
                            >
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
      )}
    </div>
  )
}
