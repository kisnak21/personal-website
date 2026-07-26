import { useQuery } from '@tanstack/react-query'
import { getNotes, getNoteBySlug } from '../api/notes.js'

export const useNotes = (options = {}) => {
  return useQuery({
    queryKey: ['notes', options],
    queryFn: () => getNotes(options),
    select: (response) => response.data || [],
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    ...options,
  })
}

export const useNoteBySlug = (slug) => {
  return useQuery({
    queryKey: ['note', slug],
    queryFn: () => getNoteBySlug(slug),
    select: (response) => response.data,
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  })
}

export const useNotesByProject = (projectId) => {
  return useQuery({
    queryKey: ['notes', { projectId, published: true }],
    queryFn: () => getNotes({ projectId, published: true }),
    select: (response) => response.data || [],
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
  })
}
