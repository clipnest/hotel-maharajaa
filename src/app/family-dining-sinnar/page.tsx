import { Metadata } from 'next'
import Link from 'next/link'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: 'Best Family Restaurant in Sinnar | Hotel Maharajaa',
  description:
    'Looking for a clean, spacious family restaurant in Sinnar? Hotel Maharajaa offers separate veg and non-veg sections, kid-friendly seating, clean restrooms, and ample parking at Gurewadi Phata.',
  keywords: [
    'family restaurant in sinnar',
    'best restaurant for family in sinnar',
    'family dining hall sinnar nashik',
    'pure veg and non veg family restaurant',
    'highway restaurant with clean washrooms',
    'safe family dining sinnar',
    'party hall restaurant sinnar',
  ],
  alternates: {
    canonical: '/family-dining-sinnar',
  },
}

export default function FamilyDiningPage() {
  const familyHighlights = [
    {
      title: 'Spacious & Hygienic Dining Hall',
      desc: 'Air-cooled, well-lit, and spotlessly clean dining seating designed specifically for large Indian families, grandparents, and toddlers.',
      icon: '🪑',
    },
    {
      title: '100% Respect for Dietary Preferences',
      desc: 'Strict separate preparation and cooking vessels for vegetarian items. Pure-veg family members can dine with complete confidence alongside non-veg lovers.',
      icon: '🥗',
    },
    {
      title: 'Kid-Friendly & Mild Meal Options',
      desc: 'From mild Dal Khichdi and Paneer Butter Masala to sweet malai lassi and hot butter rotis, our chefs customize spice levels for children.',
      icon: '👶',
    },
    {
      title: 'Prompt & Courteous Table Service',
      desc: 'Our staff ensures water, hot bhakris, and refills arrive promptly so your family can enjoy an uninterrupted meal together.',
      icon: '🤝',
    },
    {
      title: 'Convenient Safe Parking On-Site',
      desc: 'No stress of street parking or walking along the highway. Park safely inside our private compound directly in front of the entrance.',
      icon: '🅿️',
    },
    {
      title: 'Celebrations & Family Gatherings',
      desc: 'Planning a birthday, anniversary, or highway family meetup? We arrange dedicated group tables and pre-set thali menus with advanced booking.',
      icon: '🎉',
    },
  ]

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted mb-6 flex items-center gap-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-cream">Home</Link>
          <span>/</span>
          <span className="text-ember">Family Dining in Sinnar</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-pill bg-veg/20 border border-veg/40 text-veg text-xs font-bold uppercase tracking-wider mb-3">
            Family-First Hospitality • Sinnar, Nashik
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream font-extrabold tracking-tight leading-tight">
            The Preferred <span className="text-ember">Family Restaurant</span> in Sinnar
          </h1>
          <p className="text-muted text-base sm:text-lg mt-4 leading-relaxed">
            Dining out with family should never involve compromise. At <strong>Hotel Maharajaa</strong>, we welcome families with warm hospitality, separate veg & non-veg kitchens, and generous dhaba thalis that bring everyone together.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href={`https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent('Hi Hotel Maharajaa, I would like to reserve a family table for lunch/dinner.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill bg-ember text-smoke font-bold px-7 py-3.5 text-sm glow-ember hover:scale-105 transition-all"
            >
              📅 Reserve a Family Table via WhatsApp
            </a>
            <a
              href={`tel:${business.contact.phone}`}
              className="rounded-pill border border-cream/30 text-cream font-bold px-7 py-3.5 text-sm hover:border-ember hover:text-ember transition-all"
            >
              📞 Call Reception: +91 74478 57456
            </a>
          </div>
        </div>

        {/* Real Dining Hall Photo */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-white/10 relative h-72 sm:h-96 shadow-2xl group">
          <img
            src="/images/restaurant/img_06.jpg"
            alt="Family dining hall at Hotel Maharajaa Sinnar"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              Spacious Dining Hall • Gurewadi Phata, Sinnar
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-cream font-bold">
              Air-Cooled Comfort & Welcoming Ambiance
            </h2>
            <p className="text-sm text-white/80 max-w-xl mt-1">
              Hygienic seating arrangements with ample space between tables for complete family privacy and comfort.
            </p>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-cream font-bold">
              Designed for Family Peace of Mind
            </h2>
            <p className="text-muted text-sm mt-2 max-w-xl mx-auto">
              Why generations of families choose Hotel Maharajaa for weekend outings, celebrations, and highway stops.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyHighlights.map((item, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl p-6 border border-white/10 hover:border-veg/40 hover:shadow-glow-veg transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-xl text-cream font-bold mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu for Every Family Member */}
        <div className="bg-raised/40 rounded-2xl p-8 sm:p-12 border border-white/10 mb-16">
          <h3 className="font-display text-2xl sm:text-3xl text-cream font-bold text-center mb-8">
            Something Delicious for Every Family Member
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-surface rounded-xl p-5 border border-white/10">
              <span className="text-2xl block mb-2">👵👴</span>
              <h4 className="text-cream font-bold mb-1">For Grandparents & Elders</h4>
              <p className="text-muted text-xs leading-relaxed">
                Light yellow dal tadka, hand-kneaded hot Jowar bhakris, steaming basmati rice, and soothing buttermilk without excess oil or artificial colors.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-5 border border-white/10">
              <span className="text-2xl block mb-2">👨👩</span>
              <h4 className="text-cream font-bold mb-1">For Parents & Foodies</h4>
              <p className="text-muted text-xs leading-relaxed">
                Fiery Kala Masala Chicken Sukka, rich mutton rassa thali, Surmai fish fry, or sizzling Paneer Kolhapuri handi with garlic naans.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-5 border border-white/10">
              <span className="text-2xl block mb-2">👦👧</span>
              <h4 className="text-cream font-bold mb-1">For Kids & Teenagers</h4>
              <p className="text-muted text-xs leading-relaxed">
                Mild Paneer Butter Masala, roasted crispy papads, Jeera Rice, chicken kebabs, and chilled sweet cream lassi with gulab jamuns.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-br from-surface to-raised rounded-2xl p-8 sm:p-12 border border-white/10">
          <h3 className="font-display text-3xl text-cream font-bold mb-3">
            Planning a Family Dinner in Sinnar Tonight?
          </h3>
          <p className="text-muted text-sm max-w-xl mx-auto mb-6">
            Call or WhatsApp us to let our staff know your arrival time so we can have your table pre-arranged and warm!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent('Namaste Hotel Maharajaa! We are planning a family visit. Please let us know table availability.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill bg-veg text-smoke font-bold px-8 py-3.5 text-sm glow-veg hover:scale-105 transition-all"
            >
              💬 WhatsApp Family Booking
            </a>
            <Link
              href="/menu"
              className="rounded-pill border border-cream/30 text-cream font-bold px-8 py-3.5 text-sm hover:border-ember hover:text-ember transition-all"
            >
              📖 See Full Menu & Thali Prices
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
