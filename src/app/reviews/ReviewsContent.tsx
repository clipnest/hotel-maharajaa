'use client'

import { useStore } from '@/lib/store'
import { business } from '@/lib/data/business'

const ALL_REVIEWS = [
  { name: 'Rohit M.',     rating: 5, date: 'October 2026', text: 'Best dal makhani I\'ve had outside a highway dhaba. The thali is incredible value — rotis, dal, two sabzis, rice, raita and papad. I have no idea how they keep the quality consistent at this price.', textHi: 'हाईवे ढाबे के बाहर सबसे अच्छी दाल मखनी। इतनी कम कीमत पर इतनी अच्छी क्वालिटी, अविश्वसनीय है।' },
  { name: 'Sunita P.',    rating: 5, date: 'October 2026', text: 'Veg options are clearly marked and the food is fresh. My family loved the paneer tikka — smoky and perfectly marinated. Knew exactly which dishes my kids could eat.', textHi: 'वेज विकल्प स्पष्ट रूप से चिह्नित हैं और खाना ताज़ा है। परिवार को पनीर टिक्का बहुत पसंद आई!' },
  { name: 'Imran K.',     rating: 4, date: 'September 2026', text: 'Open late, easy to find, parking space available. The mutton curry hit the spot after a long drive. Will be a regular stop on my route.', textHi: 'देर रात तक खुला, ढूँढना आसान, पार्किंग है। लंबी ड्राइव के बाद मटन करी ने मन मोह लिया।' },
  { name: 'Priya T.',     rating: 5, date: 'October 2026', text: 'Ordered for my office team of 12 for lunch. Everything came hot, on time, and each dish was properly labelled veg/non-veg. Excellent service.', textHi: 'ऑफिस की 12 लोगों की टीम के लिए ऑर्डर किया। सब गर्म और समय पर मिला। शानदार सेवा।' },
  { name: 'Ankit S.',     rating: 5, date: 'September 2026', text: 'The butter chicken is genuinely one of the best in this area. Rich, creamy and the chicken is properly tender. Combined with garlic naan it\'s unbeatable.', textHi: 'बटर चिकन वाकई इस इलाके में सबसे अच्छा है। गार्लिक नान के साथ लाजवाब।' },
  { name: 'Kavya R.',     rating: 4, date: 'August 2026', text: 'Great for mixed groups — half our team is vegetarian. Everyone found something they loved. The chana masala and tandoori chicken were both excellent.', textHi: 'मिश्रित ग्रुप के लिए बढ़िया। छोले मसाला और तंदूरी चिकन दोनों लाजवाब थे।' },
]

export function ReviewsContent() {
  const { lang } = useStore()

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-2">
            {lang === 'hi' ? 'समीक्षाएँ' : 'Reviews'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-6">
            {lang === 'hi' ? 'भूखे स्थानीय लोगों का प्यार' : 'Loved by Hungry Locals'}
          </h1>

          {/* Rating summary */}
          <div className="inline-flex items-center gap-4 bg-surface rounded-card px-8 py-4 border border-white/10">
            <div className="text-5xl font-bold text-turmeric">4.5</div>
            <div className="text-left">
              <div className="flex text-turmeric text-xl">★★★★<span className="opacity-50">★</span></div>
              <p className="text-muted text-xs mt-1">
                {lang === 'hi' ? 'Google पर आधारित' : 'Based on Google reviews'}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {ALL_REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-surface rounded-card p-6 border border-white/10 hover:border-ember/20 hover:shadow-glow-ember transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-cream font-semibold text-sm">{r.name}</p>
                  <p className="text-muted text-xs">{r.date}</p>
                </div>
                <div className="flex" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < r.rating ? 'text-turmeric text-sm' : 'text-muted/30 text-sm'}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed flex-1 italic">
                "{lang === 'hi' ? r.textHi : r.text}"
              </p>
              <div className="flex items-center gap-1.5 mt-4 text-xs text-muted/60">
                <span>🌐</span> Google Review
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted mb-4">
            {lang === 'hi' ? 'आपका अनुभव कैसा था? हमें बताएँ।' : 'Had a meal here? Share your experience.'}
          </p>
          <a
            href={business.googleReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => window.gtag?.('event','review_cta_click',{})}
            className="inline-flex items-center gap-2 bg-turmeric text-smoke font-bold rounded-pill px-8 py-3 text-sm hover:scale-105 transition-transform"
          >
            ⭐ {lang === 'hi' ? 'Google Review दें' : 'Leave a Google Review'}
          </a>
        </div>
      </div>
    </main>
  )
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}
