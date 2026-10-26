import { Metadata } from 'next'
import Link from 'next/link'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: 'Specialities & Signature Thalis | Hotel Maharajaa Sinnar',
  description:
    'Taste the famous Kala Masala Chicken Sukka, Special Non-Veg Thali, Fresh Seafood Fish Thali, and royal Paneer Handis at Hotel Maharajaa, Sinnar on Nashik-Pune Highway.',
  keywords: [
    'kala masala chicken sinnar',
    'best non veg thali sinnar',
    'fish thali nashik highway',
    'surmai rava fry sinnar',
    'specialities hotel maharajaa',
    'bhakri and rassa restaurant',
    'paneer butter masala sizzler',
    'maharashtrian dhaba specialties',
  ],
  alternates: {
    canonical: '/specialities',
  },
}

export default function SpecialitiesPage() {
  const specialities = [
    {
      name: 'Maharajaa Special Non-Veg Thali',
      nameHi: 'महाराजा स्पेशल नॉन-व्हेज थाळी',
      tag: 'Most Popular Thali',
      tagColor: 'bg-nonveg text-smoke',
      img: '/images/restaurant/img_02.jpg',
      price: '₹280',
      desc: 'The ultimate Maharashtrian non-veg feast: rich Kala Masala Chicken, bowl of spicy aromatic Rassa (soup), boiled egg, 2 freshly patted hot Jowar or Bajra Bhakris, and steamed rice.',
      keywords: 'Authentic Gaoran Chicken • Unlimited Rassa • Hot Bhakri',
    },
    {
      name: 'Signature Kala Masala Chicken Sukka',
      nameHi: 'काळा मसाला चिकन सुक्का',
      tag: 'House Masterpiece',
      tagColor: 'bg-ember text-smoke',
      img: '/images/restaurant/img_03.jpg',
      price: '₹280',
      desc: 'Tender bone-in chicken slow-roasted in hand-pounded blackened Maharashtrian spices, roasted coconut, garlic, and fresh coriander. Juicy, intense, and deeply flavourful.',
      keywords: 'Traditional Khandeshi & Nashik Spices • Real Clay Tandoor',
    },
    {
      name: 'Special Sea Fish Thali & Rava Fry',
      nameHi: 'महाराजा स्पेशल फिश थाळी व रवा फ्राय',
      tag: 'Fresh Coastal Catch',
      tagColor: 'bg-info text-smoke',
      img: '/images/restaurant/img_08.jpg',
      price: '₹280',
      desc: 'Fresh whole fish (Surmai / Bangda) marinated in fiery coastal masalas and crisp rava fried to golden crunch. Served with coconut-infused fish rassa, spicy chutney, hot Bhakri, and rice.',
      keywords: 'Crisp Golden Rava Fry • Fresh Daily Catch • Coastal Rassa',
    },
    {
      name: 'Sizzling Paneer Butter Masala & Handis',
      nameHi: 'सिझलिंग पनीर बटर मसाला व हांडी',
      tag: 'Pure Veg Royalty',
      tagColor: 'bg-veg text-smoke',
      img: '/images/restaurant/img_05.jpg',
      price: '₹240',
      desc: 'Melt-in-mouth cottage cheese cubes simmered in a velvety tomato-cashew makhani gravy, served smoking hot on a sizzling cast iron platter. Prepared strictly in our pure-veg kitchen.',
      keywords: 'Rich Cashew Cream • Separate Veg Kitchen • Sizzler Platter',
    },
    {
      name: 'Crispy Surmai & Bangda Fish Fry Platter',
      nameHi: 'कुरकुरीत सुरमई व बांगडा फिश फ्राय',
      tag: 'Seafood Lovers Delight',
      tagColor: 'bg-turmeric text-smoke',
      img: '/images/restaurant/img_11.jpg',
      price: '₹280',
      desc: 'Marinated in coastal lemon-chilli-garlic paste with a crunchy semolina crust. Served with crisp sliced red onions, green chillies, and freshly squeezed lemon.',
      keywords: 'Whole Fish • Crunchy Crust • Made to Order',
    },
    {
      name: 'Paneer Kolhapuri Handi & Shahi Malai Kofta',
      nameHi: 'पनीर कोल्हापुरी हांडी व मलाई कोफ्ता',
      tag: 'Chef Recommendation',
      tagColor: 'bg-turmeric text-smoke',
      img: '/images/restaurant/img_09.jpg',
      price: '₹250',
      desc: 'Fiery red chilli tempered Kolhapuri gravy cooked in authentic earthen clay handi, paired with delicate royal cashew malai koftas for a balanced vegetarian banquet.',
      keywords: 'Traditional Clay Handi • Rich Royal Gravies • Fresh Paneer',
    },
  ]

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted mb-6 flex items-center gap-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-cream">Home</Link>
          <span>/</span>
          <span className="text-ember">Signature Specialities</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-pill bg-ember/20 border border-ember/40 text-ember text-xs font-bold uppercase tracking-wider mb-3">
            Hotel Maharajaa Signature Creations
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream font-extrabold tracking-tight leading-tight">
            Our Famous <span className="text-ember">Dhaba Specialities</span>
          </h1>
          <p className="text-muted text-base sm:text-lg mt-4 leading-relaxed">
            Crafted with traditional recipes from Sinnar and the Western Ghats. Discover the signature dishes that highway travellers and local families return for week after week.
          </p>
        </div>

        {/* Specialities Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {specialities.map((item, i) => (
            <div
              key={i}
              className="bg-surface rounded-2xl overflow-hidden border border-white/10 hover:border-ember/40 hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
                <img
                  src={item.img}
                  alt={`${item.name} at Hotel Maharajaa Sinnar`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.tagColor}`}>
                  {item.tag}
                </span>
                <span className="absolute bottom-4 right-4 text-cream font-extrabold text-2xl drop-shadow">
                  {item.price}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-display text-2xl text-cream font-bold group-hover:text-ember transition-colors">
                    {item.name}
                  </h2>
                  <p className="text-amber-400/90 text-sm font-medium mt-0.5 mb-3">
                    {item.nameHi}
                  </p>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div>
                  <div className="text-xs text-muted/80 font-semibold mb-4 border-t border-white/10 pt-3">
                    ✨ {item.keywords}
                  </div>
                  <a
                    href={`https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent(`Hi Hotel Maharajaa! I would like to order the ${item.name} (${item.price}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-pill bg-ember text-smoke font-bold py-3 text-sm glow-ember hover:scale-[1.02] transition-transform"
                  >
                    💬 Order on WhatsApp ({item.price})
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="bg-raised/40 rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
          <h3 className="font-display text-3xl text-cream font-bold mb-3">
            Want to Browse the Full 45+ Item Menu?
          </h3>
          <p className="text-muted text-sm max-w-xl mx-auto mb-6">
            From hot tandoori tikkas and garlic naans to refreshing sweet lassis and desserts, see our full interactive menu with live dietary filters.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/menu"
              className="rounded-pill bg-ember text-smoke font-bold px-8 py-3.5 text-sm glow-ember hover:scale-105 transition-all"
            >
              📖 View Full Digital Menu
            </Link>
            <a
              href={`tel:${business.contact.phone}`}
              className="rounded-pill border border-cream/30 text-cream font-bold px-8 py-3.5 text-sm hover:border-ember hover:text-ember transition-all"
            >
              📞 Call for Table Reservations
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
