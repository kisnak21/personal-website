// SEO metadata for each page
export const seoData = {
  home: {
    title: 'Home',
    description:
      'Kresna S. Nugroho - ICT Teacher pivoting into full-stack development. Exploring React, Next.js, Node.js, and distributed systems.',
    url: '/',
    keywords:
      'Kresna Nugroho, Full Stack Developer, Web Developer, React, Next.js, Node.js, Portfolio',
  },
  projects: {
    title: 'Projects',
    description:
      'Browse through my development projects showcasing React, Next.js, Node.js, and full-stack applications. From e-commerce platforms to AI-powered tools.',
    url: '/projects',
    keywords:
      'Web Development Projects, React Projects, Next.js Apps, Full Stack Projects, Portfolio Projects',
  },
  skills: {
    title: 'Skills',
    description:
      'Technical skills and expertise in modern web development: React, Next.js, TypeScript, Node.js, Tailwind CSS, MongoDB, PostgreSQL, and more.',
    url: '/skills',
    keywords:
      'Technical Skills, React Developer, Frontend Skills, Backend Skills, Full Stack Skills, Web Technologies',
  },
  contact: {
    title: 'Contact',
    description:
      'Get in touch with Kresna S. Nugroho for collaboration, job opportunities, or web development projects. Open to full-stack development roles.',
    url: '/contact',
    keywords:
      'Contact Developer, Hire Developer, Web Developer Contact, Job Opportunities, Collaboration',
  },
}

// Structured Data (JSON-LD) for rich snippets
export const generatePersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kresna S. Nugroho',
  url: 'https://kresna-portfolio.vercel.app',
  jobTitle: 'Full Stack Developer',
  description: 'ICT Teacher pivoting into full-stack development',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Computer System Engineering',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pontianak',
    addressCountry: 'ID',
  },
  sameAs: [
    'https://github.com/kisnak21',
    'https://linkedin.com/in/kresna-nugroho',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Web Development',
    'Full Stack Development',
  ],
})

export const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kresna S. Portfolio',
  url: 'https://kresna-portfolio.vercel.app',
  description:
    'Professional portfolio showcasing full-stack development projects and technical skills',
  author: {
    '@type': 'Person',
    name: 'Kresna S. Nugroho',
  },
})
