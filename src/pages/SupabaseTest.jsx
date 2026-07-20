import { useState, useEffect } from 'react'
import { getProjects } from '../api/projects.js'
import { getSkills, getSiteSettings } from '../api/skills.js'
import { verifyAdminKey } from '../api/auth.js'

export default function SupabaseTest() {
  const [projects, setProjects] = useState(null)
  const [skills, setSkills] = useState(null)
  const [settings, setSettings] = useState(null)
  const [adminTest, setAdminTest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const [projectsResult, skillsResult, settingsResult, adminResult] = await Promise.all([
          getProjects(),
          getSkills(),
          getSiteSettings(),
          verifyAdminKey('admin_key_2026_kresna_portfolio_secure_xyz789'),
        ])

        if (projectsResult.error) throw new Error(`Projects: ${projectsResult.error.message}`)
        if (skillsResult.error) throw new Error(`Skills: ${skillsResult.error.message}`)
        if (settingsResult.error) throw new Error(`Settings: ${settingsResult.error.message}`)

        setProjects(projectsResult.data)
        setSkills(skillsResult.data)
        setSettings(settingsResult.data)
        setAdminTest(adminResult)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-8 font-mono">
        <h1 className="text-2xl mb-4 text-primary">Supabase API Test</h1>
        <p className="text-secondary">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 font-mono">
        <h1 className="text-2xl mb-4 text-primary">Supabase API Test</h1>
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded">
          <p className="text-red-500 font-bold">Error:</p>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 font-mono">
      <h1 className="text-2xl mb-6 text-primary">Supabase API Test</h1>

      <div className="mb-4">
        {adminTest?.valid ? (
          <div className="bg-green-500/10 border border-green-500/30 p-3 rounded">
            <p className="text-green-500 font-bold">Admin Auth: OK</p>
            <p className="text-green-400 text-sm">Key: {adminTest.data?.name}</p>
          </div>
        ) : (
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
            <p className="text-yellow-500 font-bold">Admin Auth: FAILED</p>
            <p className="text-yellow-400 text-sm">{adminTest?.error}</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <section>
          <h2 className="text-lg text-secondary mb-1">Public Projects ({projects?.length || 0})</h2>
          <div className="bg-bg-secondary p-3 rounded border border-primary/20">
            <pre className="text-xs text-tertiary overflow-x-auto">
              {JSON.stringify(projects, null, 2)}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-lg text-secondary mb-1">Skills ({skills?.length || 0})</h2>
          <div className="bg-bg-secondary p-3 rounded border border-primary/20">
            <pre className="text-xs text-tertiary overflow-x-auto">
              {JSON.stringify(skills, null, 2)}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-lg text-secondary mb-1">Site Settings</h2>
          <div className="bg-bg-secondary p-3 rounded border border-primary/20">
            <pre className="text-xs text-tertiary overflow-x-auto">
              {JSON.stringify(settings, null, 2)}
            </pre>
          </div>
        </section>
      </div>
    </div>
  )
}