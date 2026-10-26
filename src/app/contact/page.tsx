import { Metadata } from 'next'
import { ContactContent } from './ContactContent'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: `Contact & Directions | Hotel Maharajaa ${business.city}`,
  description: `Find Hotel Maharajaa in ${business.city}: address, opening hours, phone, WhatsApp and one-tap directions.`,
}

export default function ContactPage() {
  return <ContactContent />
}
