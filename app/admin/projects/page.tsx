'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useProjectsAdmin } from '@/hooks/useAdminQueries'
import { ProjectForm } from '@/components/admin/ProjectForm'
import type { Project } from '@/lib/types'
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { useToast } from '@/context/ToastContext'

export default function ProjectsManagerPage() {
  const queryClient = useQueryClient()
  const { success: toastSuccess, error: toastError } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)

  const { data: projects = [], isLoading, error } = useProjectsAdmin()

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to delete project')
      }
      return true
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toastSuccess('Project deleted')
    },
    onError: (err: Error) => toastError(err.message)
  })

  const handleEdit = (project: Project) => {
    setCurrentProject(project)
    setIsEditing(true)
  }

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete project "${title}"?`)) {
      deleteMutation.mutate(id)
    }
  }

  const handleFormSuccess = () => {
    setIsEditing(false)
    setCurrentProject(null)
    toastSuccess('Project saved')
  }

  if (isEditing) {
    return (
      <ProjectForm
        project={currentProject}
        onSuccess={handleFormSuccess}
        onCancel={() => { setIsEditing(false); setCurrentProject(null) }}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-headline-md text-on-surface">Projects Manager</h1>
          <p className="text-sm font-body-md text-on-surface-variant mt-1">Manage portfolio projects.</p>
        </div>
        <button
          onClick={() => { setCurrentProject(null); setIsEditing(true) }}
          className="bg-primary hover:bg-primary-container text-on-primary font-medium px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={18} />
          <span>New Project</span>
        </button>
      </div>

      {error && <div className="bg-error/10 border border-error text-error p-4 rounded-lg">Failed to load projects</div>}

      {isLoading ? (
        <div className="text-center py-12 text-on-surface-variant">Loading projects...</div>
      ) : (
        <div className="bg-surface-container border border-outline-variant rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-high text-on-surface-variant font-label-caps text-xs">
                  <th className="p-4">Project</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm text-on-surface font-body-md">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-surface-variant/50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold">{project.title}</div>
                      <div className="text-xs text-on-surface-variant font-code-sm">/{project.slug}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-label-caps ${
                        project.published
                          ? 'bg-secondary/10 text-secondary border border-secondary/30'
                          : 'bg-on-surface-variant/10 text-on-surface-variant border border-on-surface-variant/20'
                      }`}>
                        {project.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center space-x-2">
                        {project.demo_url && (
                          <a href={project.demo_url} target="_blank" rel="noreferrer" className="p-1.5 text-on-surface-variant hover:text-primary rounded hover:bg-surface">
                            <ExternalLink size={16} />
                          </a>
                        )}
                        <button onClick={() => handleEdit(project)} className="p-1.5 text-on-surface-variant hover:text-primary rounded hover:bg-surface">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(project.id, project.title)} className="p-1.5 text-on-surface-variant hover:text-error rounded hover:bg-surface">
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
