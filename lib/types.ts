export interface Project {
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  description: string
  tech_stack: string[]
  icon: string
  github_url?: string
  demo_url?: string
  featured: boolean
  screenshot_url?: string
  screenshot_alt?: string
  published: boolean
  sort_order: number
}

export interface Skill {
  id: string
  created_at: string
  updated_at: string
  name: string
  category: 'frontend' | 'backend' | 'tooling'
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  color: string
  sort_order: number
}

export interface Note {
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  excerpt?: string
  content: string
  cover_image_url?: string
  cover_image_alt?: string
  project_id?: string
  tags: string[]
  published: boolean
  sort_order: number
  projects?: {
    id: string
    title: string
    slug: string
    github_url?: string
    demo_url?: string
  }
}

export interface SiteSettings {
  [key: string]: string
}

export interface Session {
  id: string
  name: string
}
