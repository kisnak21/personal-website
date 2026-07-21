import { getTagClassName } from '../data/projectsData.js'

const ProjectFileCard = ({ project, index }) => {
  return (
    <div className='bg-surface-container border border-outline-variant overflow-hidden flex flex-col group hover:border-primary transition-all duration-300'>
      <div className='h-32 bg-surface-container-highest relative'>
        <div className='absolute top-2 left-2 flex gap-1'>
          <div className='terminal-header-dot bg-[#FF5F56] opacity-60'></div>
          <div className='terminal-header-dot bg-[#FFBD2E] opacity-60'></div>
          <div className='terminal-header-dot bg-[#27C93F] opacity-60'></div>
        </div>
        <div className='w-full h-full flex items-center justify-center'>
          <span className='material-symbols-outlined text-[48px] text-tertiary/20'>
            {project.icon}
          </span>
        </div>
        <div className='absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity'></div>
      </div>

      <div className='p-4 flex-1 flex flex-col'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='font-headline-sm text-headline-sm text-on-surface'>
            {project.title}
          </h3>
          <span className='font-code-sm text-code-sm text-tertiary'>
            #{String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <p className='text-on-surface-variant font-body-md text-body-md mb-4 flex-1'>
          {project.description}
        </p>
        <div className='flex flex-wrap gap-2 mb-4'>
          {project.tech_stack.map((tech, i) => (
            <span
              key={tech}
              className={`px-2 py-0.5 border font-label-caps text-[10px] rounded ${getTagClassName(i)}`}
            >
              {tech.toUpperCase()}
            </span>
          ))}
        </div>
        <div className='flex gap-4 border-t border-outline-variant pt-4'>
          {project.demo_url && (
            <a
              href={project.demo_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:text-primary-container flex items-center gap-1 font-code-sm text-code-sm transition-colors'
            >
              <span className='material-symbols-outlined text-[16px]'>
                play_circle
              </span>
              Demo
            </a>
          )}
          <a
            href={project.github_url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-on-surface-variant hover:text-on-surface flex items-center gap-1 font-code-sm text-code-sm transition-colors'
          >
            <span className='material-symbols-outlined text-[16px]'>
              terminal
            </span>
            Source
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectFileCard
