import { Metadata } from 'next'
import { ReviewsContent } from './ReviewsContent'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: `Customer Reviews | Hotel Maharajaa Dhaba ${business.city}`,
  description: `Read what diners say about Hotel Maharajaa in ${business.city}, then see the menu and order on WhatsApp.`,
}

export default function ReviewsPage() {
  return <ReviewsContent />
}
