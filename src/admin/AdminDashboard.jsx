import { useAdmin } from '../context/AdminContext.jsx'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../api/projects.js'
import { getSkills } from '../api/skills.js'
import { FolderGit2, Code2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { user } = useAdmin()

  const { data: projectsResponse, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects', 'all'],
    queryFn: () => getProjects({ all: true }),
  })

  const { data: skillsResponse, isLoading: skillsLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: () => getSkills(),
  })

  const projects = projectsResponse?.data || []
  const skills = skillsResponse?.data || []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary mb-2">Dashboard</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Welcome back, {user?.name || 'Admin'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container border border-outline-variant rounded-lg p-6 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <FolderGit2 size={24} />
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Projects</h2>
              <p className="font-code-sm text-code-sm text-on-surface-variant">
                {projectsLoading ? 'Loading...' : `${projects?.length || 0} total projects`}
              </p>
            </div>
          </div>
          <div className="mt-auto">
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 text-primary font-label-caps text-label-caps hover:underline"
            >
              Manage Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="bg-surface-container border border-outline-variant rounded-lg p-6 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-secondary/10 text-secondary rounded-lg">
              <Code2 size={24} />
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Skills</h2>
              <p className="font-code-sm text-code-sm text-on-surface-variant">
                {skillsLoading ? 'Loading...' : `${skills?.length || 0} total skills`}
              </p>
            </div>
          </div>
          <div className="mt-auto">
            <Link
              to="/admin/skills"
              className="inline-flex items-center gap-2 text-secondary font-label-caps text-label-caps hover:underline"
            >
              Manage Skills <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}