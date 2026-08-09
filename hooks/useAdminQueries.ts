import { useQuery } from '@tanstack/react-query'
import type { Project, Note, Skill } from '@/lib/types'

export function useProjectsAdmin() {
  return useQuery<Project[]>({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const res = await fetch('/api/admin/projects')
      if (!res.ok) throw new Error('Failed to fetch projects')
      return res.json()
    },
  })
}

export function useNotesAdmin() {
  return useQuery<Note[]>({
    queryKey: ['admin-notes'],
    queryFn: async () => {
      const res = await fetch('/api/admin/notes')
      if (!res.ok) throw new Error('Failed to fetch notes')
      return res.json()
    },
  })
}

export function useSkillsAdmin() {
  return useQuery<Skill[]>({
    queryKey: ['admin-skills'],
    queryFn: async () => {
      const res = await fetch('/api/admin/skills')
      if (!res.ok) throw new Error('Failed to fetch skills')
      return res.json()
    },
  })
}
