import { Metadata } from 'next'
import Link from 'next/link'
import { business } from '@/lib/data/business'
import { asset } from '@/lib/utils/asset'

export const metadata: Metadata = {
  title: 'Best Dhaba on Nashik-Pune Highway | Hotel Maharajaa Sinnar',
  description:
    'Looking for the best dhaba on Nashik-Pune Highway? Hotel Maharajaa at Gurewadi Phata, Sinnar offers authentic Kala Masala Chicken, Fish Thali, Veg Handis, hot Bhakris, and ample family parking.',
  keywords: [
    'best dhaba on nashik pune highway',
    'highway dhaba near sinnar',
    'pune nashik highway food stop',
    'shirdi to pune highway restaurant',
    'hotel maharajaa sinnar',
    'gurewadi phata restaurant',
    'family restaurant nashik highway',
    'kala masala chicken highway',
    'highway dhaba with parking',
  ],
  alternates: {
    canonical: '/highway-dhaba-nashik-pune',
  },
}

export default function HighwayDhabaPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Hotel Maharajaa - Highway Dhaba',
    image: 'https://hotelmahara.jaa/images/restaurant/img_01.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.state,
      postalCode: business.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    telephone: business.contact.phone,
    servesCuisine: ['Maharashtrian', 'North Indian', 'Dhaba', 'Seafood'],
    priceRange: '₹150 - ₹500',
    hasMap: `https://maps.google.com/?q=${business.geo.lat},${business.geo.lng}`,
  }

  const highwayFeatures = [
    {
      title: 'Prime Highway Location (Gurewadi Phata)',
      desc: 'Situated right along the Nashik-Pune Highway (NH 60), just minutes from Sinnar bypass. No narrow interior detours — pull straight into our wide entrance.',
      icon: '🛣️',
    },
    {
      title: 'Spacious & Secure Vehicle Parking',
      desc: 'Generous parking area accommodating family SUVs, cars, and traveller groups. Safe, brightly lit, and easy highway re-entry.',
      icon: '🚗',
    },
    {
      title: 'Fast Highway Service For Travellers',
      desc: 'We know road travellers have schedules. Fresh tandoor rotis and steaming thalis served within minutes so you stay energized.',
      icon: '⚡',
    },
    {
      title: 'Clean Restrooms & Refreshment',
      desc: 'Hygienic washrooms and cool drinking water for weary pilgrims and long-distance drivers travelling between Shirdi, Nashik, and Pune.',
      icon: '✨',
    },
    {
      title: 'Separate Veg & Non-Veg Kitchens',
      desc: 'Complete peace of mind for mixed family groups. Dedicated prep zones and separate cookware for vegetarian and non-vegetarian fare.',
      icon: '🥘',
    },
    {
      title: 'Open Late Till 11:30 PM Daily',
      desc: 'Whether driving for a late-night highway return or early evening dinner, our clay tandoor stays fired up all week.',
      icon: '🌙',
    },
  ]

  return (
    <main className="min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted mb-6 flex items-center gap-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-cream">Home</Link>
          <span>/</span>
          <span className="text-ember">Nashik-Pune Highway Dhaba</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-pill bg-ember/20 border border-ember/40 text-ember text-xs font-bold uppercase tracking-wider mb-3">
            NH 60 • Gurewadi Phata, Sinnar
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream font-extrabold tracking-tight leading-tight">
            The Best Dhaba on <span className="text-ember">Nashik-Pune Highway</span>
          </h1>
          <p className="text-muted text-base sm:text-lg mt-4 leading-relaxed">
            Welcome to <strong>Hotel Maharajaa</strong>, the highway’s most trusted culinary stop. 
            Enjoy honest Maharashtrian Kala Masala Chicken, authentic Fish Thalis, rich Veg Handis, 
            and hand-patted Bhakris, cooked over real fire.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href={`https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent('Hi Hotel Maharajaa, we are on the Nashik-Pune Highway and would like to order food / check table availability.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill bg-ember text-smoke font-bold px-7 py-3.5 text-sm glow-ember hover:scale-105 transition-all"
            >
              💬 WhatsApp Order / Table Enquiries
            </a>
            <a
              href={`https://maps.google.com/?q=${business.geo.lat},${business.geo.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill border border-cream/30 text-cream font-bold px-7 py-3.5 text-sm hover:border-ember hover:text-ember transition-all"
            >
              📍 Get Highway Directions (Google Maps)
            </a>
          </div>
        </div>

        {/* Real Highway Facade Image Banner */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-white/10 relative h-72 sm:h-96 shadow-2xl group">
          <img
            src={asset('/images/restaurant/img_01.jpg')}
            alt="Hotel Maharajaa highway frontage at night on Nashik Pune Highway Sinnar"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              Live Highway View • Sinnar, Nashik
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-cream font-bold">
              Bright Roadside Presence & Safe Parking
            </h2>
            <p className="text-sm text-white/80 max-w-xl mt-1">
              Look for the lit orange sign of <strong>हॉटेल महाराजा</strong> at Gurewadi Phata. Pull in easily without traffic hassle.
            </p>
          </div>
        </div>

        {/* Why Highway Travellers Choose Us */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-cream font-bold">
              Why Travellers Stop at Hotel Maharajaa
            </h2>
            <p className="text-muted text-sm mt-2 max-w-xl mx-auto">
              From family road-trippers to Shirdi-Pune highway commuters, here is what makes us Sinnar’s preferred highway stop.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highwayFeatures.map((f, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl p-6 border border-white/10 hover:border-ember/40 hover:shadow-glow-ember transition-all"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-display text-xl text-cream font-bold mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Route context: Shirdi - Sinnar - Pune Highway corridor */}
        <div className="bg-raised/40 rounded-2xl p-8 border border-white/10 mb-16">
          <div className="max-w-3xl">
            <h3 className="font-display text-2xl sm:text-3xl text-cream font-bold mb-4">
              The Ideal Pit-Stop on the Shirdi • Nashik • Pune Route
            </h3>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-4">
              Driving along <strong>National Highway 60 (NH 60)</strong> between Pune and Nashik, or returning from a darshan at <strong>Shirdi Sai Baba Temple</strong>? Sinnar is the natural midway point of your journey.
            </p>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-6">
              Instead of mediocre food stalls or crowded highway plazas, <strong>Hotel Maharajaa</strong> provides a restful dining environment. Our food is cooked to order: tender chicken cooked in authentic Maharashtrian Kala Masala, golden fried Surmai and Bangda seafood thalis, hand-kneaded Jowar and Bajra Bhakris, and rich Paneer Handis with hot tandoori naan.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-amber-400">
              <span className="bg-surface px-3 py-1.5 rounded-full border border-white/10">✓ 25 Mins from Nashik City</span>
              <span className="bg-surface px-3 py-1.5 rounded-full border border-white/10">✓ 55 Mins from Shirdi</span>
              <span className="bg-surface px-3 py-1.5 rounded-full border border-white/10">✓ Right at Gurewadi Phata, Sinnar</span>
            </div>
          </div>
        </div>

        {/* Quick Menu Callout */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-surface rounded-2xl p-6 border border-veg/30 flex flex-col justify-between">
            <div>
              <span className="text-veg font-bold text-xs uppercase tracking-wider block mb-1">Pure Veg Highway Meals</span>
              <h4 className="font-display text-2xl text-cream font-bold mb-2">Vegetarian Highway Thali & Handis</h4>
              <p className="text-muted text-sm mb-4">
                Paneer Butter Masala, Paneer Kolhapuri Handi, Veg Malai Kofta, Yellow Dal Tadka, steaming Jeera Rice, and soft butter rotis.
              </p>
            </div>
            <Link href="/menu" className="text-veg text-sm font-bold hover:underline">
              View Veg Menu Options →
            </Link>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-nonveg/30 flex flex-col justify-between">
            <div>
              <span className="text-nonveg font-bold text-xs uppercase tracking-wider block mb-1">Authentic Non-Veg Feast</span>
              <h4 className="font-display text-2xl text-cream font-bold mb-2">Kala Masala Chicken & Seafood Thalis</h4>
              <p className="text-muted text-sm mb-4">
                Signature Chicken Sukka in rustic black spice masala, unlimited rassa soup, boiled egg, crispy whole Surmai/Bangda fry, and hot Bhakris.
              </p>
            </div>
            <Link href="/menu" className="text-nonveg text-sm font-bold hover:underline">
              View Non-Veg Menu Options →
            </Link>
          </div>
        </div>

        {/* Bottom CTA & NAP */}
        <div className="text-center bg-gradient-to-br from-surface to-raised rounded-2xl p-8 sm:p-12 border border-white/10">
          <h3 className="font-display text-3xl text-cream font-bold mb-3">
            Passing Through Sinnar? Pull In Today!
          </h3>
          <p className="text-muted text-sm max-w-xl mx-auto mb-6">
            Gurewadi Phata, Nashik-Pune Highway, Sinnar, Nashik — 422103.<br />
            Call us directly on <strong>+91 74478 57456</strong> for directions or order in advance for quick pickup!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`tel:${business.contact.phone}`}
              className="rounded-pill bg-ember text-smoke font-bold px-8 py-3.5 text-sm glow-ember hover:scale-105 transition-all"
            >
              📞 Call +91 74478 57456
            </a>
            <Link
              href="/menu"
              className="rounded-pill border border-cream/30 text-cream font-bold px-8 py-3.5 text-sm hover:border-ember hover:text-ember transition-all"
            >
              📖 Explore Full Menu & Prices
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
