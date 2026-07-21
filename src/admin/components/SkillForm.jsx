import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSkill, updateSkill } from '../../api/skills.js'

export const SkillForm = ({ skill = null, onSuccess, onCancel }) => {
  const queryClient = useQueryClient()
  const isEditing = !!skill

  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend',
    proficiency: 'intermediate',
    color: 'primary',
    sort_order: 0,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || '',
        category: skill.category || 'frontend',
        proficiency: skill.proficiency || 'intermediate',
        color: skill.color || 'primary',
        sort_order: skill.sort_order || 0,
      })
    }
  }, [skill])

  const mutation = useMutation({
    mutationFn: (data) => isEditing ? updateSkill(skill.id, data) : createSkill(data),
    onSuccess: (result) => {
      if (result.error) {
        setError(result.error.message || 'An error occurred saving the skill')
      } else {
        queryClient.invalidateQueries(['skills'])
        onSuccess?.()
      }
    },
    onError: (err) => {
      setError(err.message || 'An error occurred')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name) {
      setError('Name is required')
      return
    }
    mutation.mutate(formData)
  }

  const colorOptions = [
    { value: 'primary', label: 'Primary (Green)', bg: 'bg-primary' },
    { value: 'secondary', label: 'Secondary (Yellow)', bg: 'bg-secondary' },
    { value: 'tertiary', label: 'Tertiary (Red)', bg: 'bg-tertiary' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded font-code-sm text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block font-code-sm text-code-sm text-on-surface-variant mb-1">Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-bg-primary border border-outline-variant rounded text-on-surface focus:border-primary focus:outline-none"
            placeholder="e.g. React.js"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-code-sm text-code-sm text-on-surface-variant mb-1">Category</label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-bg-primary border border-outline-variant rounded text-on-surface focus:border-primary focus:outline-none appearance-none"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="tooling">Tooling</option>
            </select>
          </div>

          <div>
            <label className="block font-code-sm text-code-sm text-on-surface-variant mb-1">Proficiency</label>
            <select
              value={formData.proficiency}
              onChange={e => setFormData({ ...formData, proficiency: e.target.value })}
              className="w-full px-4 py-2 bg-bg-primary border border-outline-variant rounded text-on-surface focus:border-primary focus:outline-none appearance-none"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-code-sm text-code-sm text-on-surface-variant mb-2">Color Theme</label>
            <div className="flex gap-4">
              {colorOptions.map(option => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    value={option.value}
                    checked={formData.color === option.value}
                    onChange={e => setFormData({ ...formData, color: e.target.value })}
                    className="hidden"
                  />
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 smooth-transition ${
                    formData.color === option.value ? 'border-on-surface' : 'border-transparent hover:border-outline-variant'
                  }`}>
                    <div className={`w-4 h-4 rounded-full ${option.bg}`} />
                  </div>
                </label>
              ))}
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
          {isEditing ? 'Save Changes' : 'Create Skill'}
        </button>
      </div>
    </form>
  )
}