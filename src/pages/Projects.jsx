import { projects as projectsList } from '../data/projectsData.js'
import JsonCodePanel from '../components/JsonCodePanel.jsx'
import ProjectFileCard from '../components/ProjectFileCard.jsx'

const Projects = () => {
  return (
    <>
      {/* Editor Tab Strip — full width, outside the padded container */}
      <div className='flex bg-surface-container-low border-b border-outline-variant h-10 items-center px-margin-mobile md:px-margin-desktop'>
        <div className='bg-surface px-4 h-full flex items-center gap-2 border-r border-outline-variant border-t-2 border-t-primary'>
          <span className='material-symbols-outlined text-primary text-[14px]'>
            data_object
          </span>
          <span className='font-code-sm text-code-sm text-primary'>
            projects.json
          </span>
          <span className='material-symbols-outlined text-[14px] hover:bg-surface-variant rounded cursor-pointer'>
            close
          </span>
        </div>
      </div>

      {/* Breadcrumbs — also full width */}
      <div className='px-margin-mobile md:px-margin-desktop py-2 flex items-center gap-2 text-on-surface-variant font-code-sm text-code-sm border-b border-outline-variant bg-surface-container-lowest/50'>
        <span>src</span>
        <span className='material-symbols-outlined text-[14px]'>
          chevron_right
        </span>
        <span>data</span>
        <span className='material-symbols-outlined text-[14px]'>
          chevron_right
        </span>
        <span className='text-on-surface'>projects.json</span>
      </div>

      {/* Constrained content area */}
      <div className='max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Mobile: collapsible raw JSON */}
          <details className='lg:hidden bg-surface-container-lowest border border-outline-variant rounded shadow-xl'>
            <summary className='cursor-pointer px-4 py-3 font-code-sm text-code-sm text-on-surface-variant flex items-center gap-2 select-none'>
              <span className='material-symbols-outlined text-[16px]'>
                code
              </span>
              View raw JSON
            </summary>
            <div className='p-6 font-code-sm text-code-sm overflow-x-auto custom-scrollbar'>
              <JsonCodePanel projects={projectsList} />
            </div>
          </details>

          {/* Desktop: always-visible code panel */}
          <div className='hidden lg:block lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded p-6 font-code-sm text-code-sm overflow-x-auto custom-scrollbar shadow-xl relative'>
            <div className='absolute top-3 right-3 flex gap-2'>
              <div className='terminal-header-dot bg-[#FF5F56]'></div>
              <div className='terminal-header-dot bg-[#FFBD2E]'></div>
              <div className='terminal-header-dot bg-[#27C93F]'></div>
            </div>
            <JsonCodePanel projects={projectsList} />
          </div>

          {/* Rendered cards panel */}
          <div className='lg:col-span-7 flex flex-col gap-6'>
            <div className='flex items-center justify-between'>
              <h2 className='font-headline-sm text-headline-sm text-primary'>
                Rendered Projects
              </h2>
              <div className='hidden md:flex gap-2'>
                <button
                  type='button'
                  aria-label='Grid view'
                  className='p-2 border border-outline-variant bg-surface-container hover:bg-surface-container-high rounded transition-colors'
                >
                  <span
                    className='material-symbols-outlined'
                    aria-hidden='true'
                  >
                    grid_view
                  </span>
                </button>
                <button
                  type='button'
                  aria-label='List view'
                  className='p-2 border border-outline-variant bg-surface-container hover:bg-surface-container-high rounded transition-colors'
                >
                  <span
                    className='material-symbols-outlined'
                    aria-hidden='true'
                  >
                    list
                  </span>
                </button>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {projectsList.map((project, i) => (
                <ProjectFileCard key={project.id} project={project} index={i} />
              ))}
              <div className='bg-surface-container border border-dashed border-outline-variant overflow-hidden flex flex-col items-center justify-center p-8 group hover:border-primary/50 cursor-pointer transition-all'>
                <span className='material-symbols-outlined text-[32px] text-on-surface-variant group-hover:text-primary transition-colors'>
                  add_circle
                </span>
                <span className='font-label-caps text-label-caps text-on-surface-variant mt-2 group-hover:text-primary'>
                  Append New Entry
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects
