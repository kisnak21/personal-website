'use client'

import { useAdmin } from '@/context/AdminContext'
import { useProjectsAdmin, useNotesAdmin, useSkillsAdmin } from '@/hooks/useAdminQueries'
import { FolderGit2, Code2, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { user } = useAdmin()

  const { data: projects, isLoading: projectsLoading } = useProjectsAdmin()
  const { data: skills, isLoading: skillsLoading } = useSkillsAdmin()
  const { data: notes, isLoading: notesLoading } = useNotesAdmin()

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='font-headline-md text-headline-md text-primary mb-2'>Dashboard</h1>
        <p className='font-body-md text-body-md text-on-surface-variant'>
          Welcome back, {user?.name || 'Admin'}
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-surface-container border border-outline-variant rounded-lg p-6 flex flex-col h-full'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='p-3 bg-primary/10 text-primary rounded-lg'>
              <FolderGit2 size={24} />
            </div>
            <div>
              <h2 className='font-headline-sm text-headline-sm text-on-surface'>Projects</h2>
              <p className='font-code-sm text-code-sm text-on-surface-variant'>
                {projectsLoading ? 'Loading...' : `${projects?.length || 0} total projects`}
              </p>
            </div>
          </div>
          <div className='mt-auto'>
            <Link
              href='/admin/projects'
              className='inline-flex items-center gap-2 text-primary font-label-caps text-label-caps hover:underline'
            >
              Manage Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className='bg-surface-container border border-outline-variant rounded-lg p-6 flex flex-col h-full'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='p-3 bg-secondary/10 text-secondary rounded-lg'>
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className='font-headline-sm text-headline-sm text-on-surface'>Notes</h2>
              <p className='font-code-sm text-code-sm text-on-surface-variant'>
                {notesLoading ? 'Loading...' : `${notes?.length || 0} total notes`}
              </p>
            </div>
          </div>
          <div className='mt-auto'>
            <Link
              href='/admin/notes'
              className='inline-flex items-center gap-2 text-primary font-label-caps text-label-caps hover:underline'
            >
              Manage Notes <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className='bg-surface-container border border-outline-variant rounded-lg p-6 flex flex-col h-full'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='p-3 bg-tertiary/10 text-tertiary rounded-lg'>
              <Code2 size={24} />
            </div>
            <div>
              <h2 className='font-headline-sm text-headline-sm text-on-surface'>Skills</h2>
              <p className='font-code-sm text-code-sm text-on-surface-variant'>
                {skillsLoading ? 'Loading...' : `${skills?.length || 0} total skills`}
              </p>
            </div>
          </div>
          <div className='mt-auto'>
            <Link
              href='/admin/skills'
              className='inline-flex items-center gap-2 text-tertiary font-label-caps text-label-caps hover:underline'
            >
              Manage Skills <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
