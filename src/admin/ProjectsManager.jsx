import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProjects, deleteProject } from '../api/projects.js'
import { ProjectForm } from './components/ProjectForm.jsx'
import { Plus, Pencil, Trash2, Check, X, GripVertical } from 'lucide-react'

export default function ProjectsManager() {
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', 'all'],
    queryFn: () => getProjects({ all: true }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects'])
    },
  })

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isEditing) {
    return (
      <div className="bg-surface-container border border-outline-variant rounded-lg p-6">
        <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
          {currentProject ? 'Edit Project' : 'Create New Project'}
        </h2>
        <ProjectForm 
          project={currentProject} 
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary mb-2">Manage Projects</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Create, update, and reorder your portfolio projects.
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentProject(null)
            setIsEditing(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded font-label-caps text-label-caps hover:opacity-90 smooth-transition"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className="bg-surface-container border border-outline-variant rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-on-surface-variant font-code-sm">Loading projects...</div>
        ) : projects?.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant font-code-sm">No projects found. Create one!</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high border-b border-outline-variant">
                <th className="p-4 font-code-sm text-[12px] text-on-surface-variant font-normal">Order</th>
                <th className="p-4 font-code-sm text-[12px] text-on-surface-variant font-normal">Project</th>
                <th className="p-4 font-code-sm text-[12px] text-on-surface-variant font-normal">Status</th>
                <th className="p-4 font-code-sm text-[12px] text-on-surface-variant font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((project) => (
                <tr key={project.id} className="border-b border-outline-variant hover:bg-surface-container-high smooth-transition group">
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-on-surface-variant cursor-grab">
                      <GripVertical size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-code-sm text-code-sm">{project.sort_order}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-headline-sm text-[14px] text-on-surface">{project.title}</div>
                    <div className="font-code-sm text-[11px] text-tertiary">/{project.slug}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {project.published ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-500/10 text-green-500 font-label-caps text-[10px]">
                          <Check size={12} /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 font-label-caps text-[10px]">
                          <X size={12} /> Draft
                        </span>
                      )}
                      {project.featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-primary/10 text-primary font-label-caps text-[10px]">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setCurrentProject(project)
                          setIsEditing(true)
                        }}
                        className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded smooth-transition"
                        title="Edit Project"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-on-surface-variant hover:text-red-500 hover:bg-red-500/10 rounded smooth-transition"
                        title="Delete Project"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}