import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: {
    template: '%s | Kresna S. Portfolio',
    default: seoData.home.title,
  },
  description: seoData.home.description,
  keywords: seoData.home.keywords,
  authors: [{ name: 'Kresna S. Nugroho' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kresna-portfolio.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Kresna S. Portfolio',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@kresna_dev',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Theme anti-FOUC script
  const themeScript = `
    let theme = window.localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  `

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-on-surface custom-scrollbar`}>
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
