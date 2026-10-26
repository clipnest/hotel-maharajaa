import { Metadata } from 'next'
import { GalleryContent } from './GalleryContent'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: `Photo Gallery | Hotel Maharajaa Dhaba ${business.city}`,
  description: `Photos of dishes, the dining area and the kitchen at Hotel Maharajaa in ${business.city}. See what is waiting for you.`,
}

export default function GalleryPage() {
  return <GalleryContent />
}
