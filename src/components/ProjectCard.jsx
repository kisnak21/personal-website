import { getTagClassName } from '../data/projectsData.js'

const ProjectCard = ({ project }) => {
  return (
    <div className='group bg-surface-container rounded-lg border border-outline-variant overflow-hidden smooth-transition project-card-glow cursor-pointer'>
      {project.screenshot_url && (
        <div className="w-full h-48 overflow-hidden border-b border-outline-variant relative">
          <img
            src={project.screenshot_url}
            alt={project.screenshot_alt || `${project.title} preview`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className='p-6 h-full flex flex-col'>
        <div className='mb-4 text-secondary group-hover:scale-110 smooth-transition origin-left'>
          <span className='material-symbols-outlined text-[40px]'>
            {project.icon}
          </span>
        </div>
        <h3 className='font-headline-sm text-headline-sm text-on-surface mb-2'>
          {project.title}
        </h3>
        <p className='text-on-surface-variant font-body-md text-body-md mb-4 flex-1'>
          {project.description}
        </p>
        <div className='flex flex-wrap gap-2 mb-6'>
          {project.tech_stack.map((tech, i) => (
            <span
              key={tech}
              className={`font-code-sm text-[11px] px-2 py-0.5 rounded border ${getTagClassName(i)}`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className='flex items-center gap-4'>
          <a
            href={project.github_url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 text-primary font-label-caps text-label-caps hover:underline'
          >
            View on GitHub
            <span className='material-symbols-outlined text-[16px]'>
              open_in_new
            </span>
          </a>
          {project.demo_url && (
            <a
              href={project.demo_url}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 text-secondary font-label-caps text-label-caps hover:underline'
            >
              Live Demo
              <span className='material-symbols-outlined text-[16px]'>
                open_in_new
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
