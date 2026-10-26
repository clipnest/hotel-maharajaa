import { Metadata } from 'next'
import { AboutContent } from './AboutContent'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: `Our Story | Hotel Maharajaa Dhaba in ${business.city}`,
  description: `The story behind Hotel Maharajaa: honest dhaba cooking, fresh tandoor and a warm welcome for every family in ${business.city}.`,
}

export default function AboutPage() {
  return <AboutContent />
}
