import type { Metadata } from 'next'
import ContactClient from '@/components/ContactClient'
import { seoData } from '@/content/seoData'

export const metadata: Metadata = {
  title: seoData.contact.title,
  description: seoData.contact.description,
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
