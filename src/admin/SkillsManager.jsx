import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSkills, deleteSkill } from '../api/skills.js'
import { SkillForm } from './components/SkillForm.jsx'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'

export default function SkillsManager() {
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [currentSkill, setCurrentSkill] = useState(null)
  const [activeCategory, setActiveCategory] = useState('frontend')

  const { data: skillsResponse, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: () => getSkills(),
  })

  const skills = skillsResponse?.data || []

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['skills'])
    },
  })

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isEditing) {
    return (
      <div className="bg-surface-container border border-outline-variant rounded-lg p-6">
        <h2 className="font-headline-sm text-headline-sm text-primary mb-6">
          {currentSkill ? 'Edit Skill' : 'Create New Skill'}
        </h2>
        <SkillForm 
          skill={currentSkill} 
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  const categories = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tooling', label: 'Tooling' },
  ]

  const filteredSkills = skills?.filter(s => s.category === activeCategory) || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary mb-2">Manage Skills</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Update your technical skills, proficiency levels, and categories.
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentSkill(null)
            setIsEditing(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded font-label-caps text-label-caps hover:opacity-90 smooth-transition"
        >
          <Plus size={16} />
          New Skill
        </button>
      </div>

      <div className="flex gap-2 border-b border-outline-variant">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 font-label-caps text-label-caps smooth-transition ${
              activeCategory === cat.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="bg-surface-container border border-outline-variant rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-on-surface-variant font-code-sm">Loading skills...</div>
        ) : filteredSkills.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant font-code-sm">No skills found in this category.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high border-b border-outline-variant">
                <th className="p-4 font-code-sm text-[12px] text-on-surface-variant font-normal">Order</th>
                <th className="p-4 font-code-sm text-[12px] text-on-surface-variant font-normal">Name</th>
                <th className="p-4 font-code-sm text-[12px] text-on-surface-variant font-normal">Proficiency</th>
                <th className="p-4 font-code-sm text-[12px] text-on-surface-variant font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map((skill) => (
                <tr key={skill.id} className="border-b border-outline-variant hover:bg-surface-container-high smooth-transition group">
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-on-surface-variant cursor-grab">
                      <GripVertical size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-code-sm text-code-sm">{skill.sort_order}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-headline-sm text-[14px] text-on-surface flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-${skill.color}`}></span>
                      {skill.name}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-code-sm text-[11px] text-tertiary px-2 py-0.5 border border-outline-variant rounded bg-surface-container-lowest">
                      {skill.proficiency}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setCurrentSkill(skill)
                          setIsEditing(true)
                        }}
                        className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded smooth-transition"
                        title="Edit Skill"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="p-2 text-on-surface-variant hover:text-red-500 hover:bg-red-500/10 rounded smooth-transition"
                        title="Delete Skill"
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