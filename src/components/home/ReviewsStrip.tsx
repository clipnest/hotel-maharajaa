'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'
import { business } from '@/lib/data/business'

const REVIEWS = [
  { name: 'Rohit M.',  rating: 5, text: 'Best dal makhani I\'ve had outside a highway dhaba. The thali is incredible value.', textHi: 'हाईवे ढाबे के बाहर सबसे अच्छी दाल मखनी। थाली अविश्वसनीय है।' },
  { name: 'Sunita P.', rating: 5, text: 'Veg options are clearly marked and the food is fresh. My family loved the paneer tikka!', textHi: 'वेज विकल्प स्पष्ट रूप से दर्शाए गए हैं और खाना ताज़ा है। परिवार को पनीर टिक्का बहुत पसंद आई!' },
  { name: 'Imran K.',  rating: 4, text: 'Open late, easy to find, parking space. The mutton curry hit the spot after a long drive.', textHi: 'देर रात तक खुला, ढूँढना आसान, पार्किंग है। लंबी ड्राइव के बाद मटन करी ने मन मोह लिया।' },
  { name: 'Priya T.',  rating: 5, text: 'Ordered for my office team of 12. Everything came hot, on time. Will order again!', textHi: 'ऑफिस की 12 लोगों की टीम के लिए ऑर्डर किया। सब गर्म और समय पर मिला।' },
]

export function ReviewsStrip() {
  const { lang } = useStore()

  return (
    <section className="py-20" aria-label="Customer reviews">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-2">
              {lang === 'hi' ? 'ग्राहकों की राय' : 'What Diners Say'}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-cream">
              {lang === 'hi' ? 'भूखे स्थानीय लोगों का प्यार' : 'Loved by hungry locals'}
            </h2>
          </div>
          <Link href="/reviews" className="hidden sm:block text-ember text-sm font-medium hover:underline">
            {lang === 'hi' ? 'सभी समीक्षाएँ →' : 'All reviews →'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-surface rounded-card p-5 border border-white/10 hover:border-ember/20 hover:shadow-glow-ember transition-all duration-300 flex flex-col"
            >
              <div className="flex mb-3" aria-label={`${r.rating} stars`}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i} className="text-turmeric text-sm">★</span>
                ))}
              </div>
              <p className="text-muted text-sm leading-relaxed flex-1 italic">
                "{lang === 'hi' ? r.textHi : r.text}"
              </p>
              <p className="text-cream text-sm font-semibold mt-4">— {r.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={business.googleReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-turmeric/50 text-turmeric font-semibold rounded-pill px-6 py-2.5 text-sm hover:bg-turmeric/10 transition-all"
            onClick={() => window.gtag?.('event','review_cta_click',{})}
          >
            ⭐ {lang === 'hi' ? 'Google Review दें' : 'Leave a Google Review'}
          </a>
          <Link href="/reviews" className="text-ember text-sm hover:underline sm:hidden">
            {lang === 'hi' ? 'सभी समीक्षाएँ →' : 'All reviews →'}
          </Link>
        </div>
      </div>
    </section>
  )
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}
