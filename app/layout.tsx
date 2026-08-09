import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/context/ThemeContext'
import ToastProvider from '@/context/ToastContext'
import QueryProvider from '@/context/QueryProvider'
import { seoData } from '@/content/seoData'

import { AdminProvider } from '@/context/AdminContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body-md',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-code-sm',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kisnaknugroho.vercel.app'

export const metadata: Metadata = {
  title: {
    template: '%s | Kresna S. Portfolio',
    default: seoData.home.title,
  },
  description: seoData.home.description,
  keywords: seoData.home.keywords,
  authors: [{ name: 'Kresna S. Nugroho' }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Kresna S. Portfolio',
    title: seoData.home.title,
    description: seoData.home.description,
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@kresna_dev',
    title: seoData.home.title,
    description: seoData.home.description,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Kresna S. Nugroho',
      url: siteUrl,
      jobTitle: 'Full-Stack Developer & ICT Teacher',
      description: seoData.home.description,
      image: `${siteUrl}/avatar.jpg`,
      sameAs: [
        'https://github.com/kisnak21',
        'https://linkedin.com/in/kresnasatyanugroho',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: seoData.home.title,
      description: seoData.home.description,
      publisher: { '@id': `${siteUrl}/#person` },
      inLanguage: 'en',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Theme anti-FOUC script (default: dark, same as Vite version)
  const themeScript = `
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  `

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f0f0f" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-body-md text-body-md antialiased bg-background text-on-background custom-scrollbar`}>
        <ThemeProvider>
          <QueryProvider>
            <ToastProvider>
              <AdminProvider>
                {children}
              </AdminProvider>
            </ToastProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
