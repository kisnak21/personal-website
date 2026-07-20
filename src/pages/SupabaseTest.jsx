import { useState, useEffect } from 'react'
import { getProjects } from '../api/projects.js'
import { getSkills, getSiteSettings } from '../api/skills.js'

export default function SupabaseTest() {
  const [projects, setProjects] = useState(null)
  const [skills, setSkills] = useState(null)
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const [projectsResult, skillsResult, settingsResult] = await Promise.all([
          getProjects(),
          getSkills(),
          getSiteSettings(),
        ])

        if (projectsResult.error) throw new Error(`Projects: ${projectsResult.error.message}`)
        if (skillsResult.error) throw new Error(`Skills: ${skillsResult.error.message}`)
        if (settingsResult.error) throw new Error(`Settings: ${settingsResult.error.message}`)

        setProjects(projectsResult.data)
        setSkills(skillsResult.data)
        setSettings(settingsResult.data)
      } catch (err) {
        setError(err.message)
        console.error('Supabase test error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-8 font-mono">
        <h1 className="text-2xl mb-4 text-primary">Supabase Connection Test</h1>
        <p className="text-secondary">Loading data from Supabase...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 font-mono">
        <h1 className="text-2xl mb-4 text-primary">Supabase Connection Test</h1>
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded">
          <p className="text-red-500 font-bold">Error:</p>
          <p className="text-red-400">{error}</p>
        </div>
        <div className="mt-4 text-sm text-tertiary">
          <p>Make sure you have:</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Updated your .env file with real Supabase keys</li>
            <li>Run the migration SQL in Supabase Dashboard → SQL Editor</li>
            <li>Created the storage bucket (if needed)</li>
          </ol>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 font-mono">
      <h1 className="text-2xl mb-6 text-primary">✓ Supabase Connection Test</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl text-secondary mb-2">Projects ({projects?.length || 0})</h2>
          <div className="bg-bg-secondary p-4 rounded border border-primary/20">
            <pre className="text-sm text-tertiary overflow-x-auto">
              {JSON.stringify(projects, null, 2)}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-secondary mb-2">Skills ({skills?.length || 0})</h2>
          <div className="bg-bg-secondary p-4 rounded border border-primary/20">
            <pre className="text-sm text-tertiary overflow-x-auto">
              {JSON.stringify(skills, null, 2)}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-secondary mb-2">Site Settings</h2>
          <div className="bg-bg-secondary p-4 rounded border border-primary/20">
            <pre className="text-sm text-tertiary overflow-x-auto">
              {JSON.stringify(settings, null, 2)}
            </pre>
          </div>
        </section>

        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded">
          <p className="text-green-500 font-bold">✓ All API connections working!</p>
          <p className="text-green-400 text-sm mt-1">
            You can now proceed to Phase 2 (API Service Layer) or integrate this data into your pages.
          </p>
        </div>
      </div>
    </div>
  )
}
