const tagPalette = [
  'border-primary/30 bg-primary/5 text-primary',
  'border-secondary/30 bg-secondary/5 text-secondary',
  'border-tertiary/30 bg-tertiary/5 text-tertiary',
]

export const getTagClassName = (index) => tagPalette[index % tagPalette.length]

export const projects = [
  {
    id: 'buildfolio',
    title: 'Buildfolio',
    description:
      'A developer-focused platform to discover projects, share ideas, and build a portfolio. Inspired by GitHub Explore, Product Hunt, and Dev.to — focused entirely on developer project showcases.',
    techStack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Redux Toolkit',
      'Axios',
      'MockAPI.io',
    ],
    icon: 'explore',
    github: 'https://github.com/kisnak21/buildfolio-react',
    demo: 'https://buildfolio-react.vercel.app/',
    featured: true,
  },
  {
    id: 'teachflow',
    title: 'TeachFlow',
    description:
      'A SaaS application for teachers to manage classes, students, attendance, assignments, and lesson plans — with AI-powered lesson plan generation.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'Auth.js',
      'Groq API',
    ],
    icon: 'auto_stories',
    github: 'https://github.com/kisnak21/teachflow',
    demo: 'https://teachflow-eight.vercel.app/',
    featured: true,
  },
  {
    id: 'todo-list',
    title: 'ToDo List',
    description:
      'A simple, no-framework task manager built with vanilla HTML, CSS, and JavaScript.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    icon: 'checklist',
    github: 'https://github.com/kisnak21/todo-list',
    demo: 'https://todo-list-six-dun-21.vercel.app/',
    featured: false,
  },
]
