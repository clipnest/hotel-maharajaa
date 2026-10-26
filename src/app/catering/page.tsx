import { Metadata } from 'next'
import { CateringContent } from './CateringContent'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: `Catering & Party Orders | Hotel Maharajaa ${business.city}`,
  description: `Plan a party with Hotel Maharajaa catering in ${business.city}. Veg and non-veg menus, bulk orders and quick quotes.`,
}

export default function CateringPage() {
  return <CateringContent />
}
