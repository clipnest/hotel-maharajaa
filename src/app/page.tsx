import { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { SignatureDishes } from '@/components/home/SignatureDishes'
import { VegNonVegSplit } from '@/components/home/VegNonVegSplit'
import { WhyMaharajaa } from '@/components/home/WhyMaharajaa'
import { SpiceTeaser } from '@/components/home/SpiceTeaser'
import { ReviewsStrip } from '@/components/home/ReviewsStrip'
import { GalleryTeaser } from '@/components/home/GalleryTeaser'
import { VisitUs } from '@/components/home/VisitUs'
import { CateringStrip } from '@/components/home/CateringStrip'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: `Hotel Maharajaa | Best Dhaba on Nashik-Pune Highway, Sinnar`,
  description: `Authentic Maharashtrian Veg & Non-Veg Dhaba at Gurewadi Phata, Sinnar (Nashik-Pune Highway). Famous for Kala Masala Chicken, Fish Thali, Veg Handis, hot Bhakris, and ample family parking. Order on WhatsApp or call +91 74478 57456.`,
  keywords: [
    'best dhaba on nashik pune highway',
    'hotel maharajaa sinnar',
    'restaurants in sinnar nashik',
    'kala masala chicken sinnar',
    'highway dhaba near gurewadi phata',
    'fish thali sinnar',
    'pure veg restaurant sinnar',
    'shirdi to pune highway food stop',
  ],
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SignatureDishes />
      <VegNonVegSplit />
      <WhyMaharajaa />
      <SpiceTeaser />
      <ReviewsStrip />
      <GalleryTeaser />
      <VisitUs />
      <CateringStrip />
    </>
  )
}
