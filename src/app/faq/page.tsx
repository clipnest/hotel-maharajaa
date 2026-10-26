import { Metadata } from 'next'
import { FAQContent } from './FAQContent'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: `FAQ | Hotel Maharajaa Dhaba in ${business.city}`,
  description: `Answers about timings, veg and non-veg food, reservations, catering and delivery at Hotel Maharajaa.`,
}

export default function FAQPage() {
  return <FAQContent />
}
