import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'Kresna S. | Dev Portfolio Workspace',
  description = 'Kresna S. — ICT Teacher pivoting into full-stack development. React, Next.js, and Node.js projects, skills, and contact info.',
  image = '/og-image.png',
  url = 'https://kresna-portfolio.vercel.app',
  type = 'website',
  author = 'Kresna S. Nugroho',
  keywords = 'Kresna Nugroho, Full Stack Developer, ICT Teacher, React Developer, Next.js, Node.js, Web Development, Portfolio',
}) => {
  const fullTitle = title.includes('|')
    ? title
    : `${title} | Kresna S. Portfolio`
  const fullUrl = url.startsWith('http')
    ? url
    : `https://kresna-portfolio.vercel.app${url}`
  const fullImage = image.startsWith('http')
    ? image
    : `https://kresna-portfolio.vercel.app${image}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name='title' content={fullTitle} />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='author' content={author} />
      <link rel='canonical' href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content={type} />
      <meta property='og:url' content={fullUrl} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={fullImage} />
      <meta property='og:site_name' content='Kresna S. Portfolio' />
      <meta property='og:locale' content='en_US' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:url' content={fullUrl} />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={fullImage} />
      <meta name='twitter:creator' content='@kresna_dev' />

      {/* Additional Meta Tags */}
      <meta name='robots' content='index, follow' />
      <meta name='language' content='English' />
      <meta name='revisit-after' content='7 days' />
    </Helmet>
  )
}

export default SEO
