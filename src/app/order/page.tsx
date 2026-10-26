import { Metadata } from 'next'
import { OrderContent } from './OrderContent'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: `Order & Reserve a Table | Hotel Maharajaa`,
  description: `Order on WhatsApp or reserve a table at Hotel Maharajaa, ${business.city}. Quick, easy, no app needed.`,
}

export default function OrderPage() {
  return <OrderContent />
}
