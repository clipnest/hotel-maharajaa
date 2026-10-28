'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useStore } from '@/lib/store'
import { asset } from '@/lib/utils/asset'

type Category = 'all' | 'food' | 'dining' | 'menu'

interface GalleryItem {
  id: number
  src: string
  category: Category
  titleEn: string
  titleHi: string
  descEn: string
  descHi: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: '/images/restaurant/img_01.jpg',
    category: 'dining',
    titleEn: 'Hotel Maharajaa Restaurant Night View',
    titleHi: 'हॉटेल महाराजा - रात्रीचे मनमोहक दृश्य',
    descEn: 'Highway frontage at Gurewadi Phata, Sinnar with welcoming entrance and spacious parking.',
    descHi: 'गुरेवाडी फाटा, सिन्नर महामार्गावरील भव्य प्रवेशद्वार आणि प्रशस्त पार्किंग.',
  },
  {
    id: 2,
    src: '/images/restaurant/img_02.jpg',
    category: 'food',
    titleEn: 'Maharajaa Special Non-Veg Thali',
    titleHi: 'महाराजा स्पेशल नॉन-व्हेज थाळी',
    descEn: 'Authentic Maharashtrian Kala Masala Chicken, hand-patted Jowar Bhakris, Boiled Egg, Rassa soup & fragrant rice.',
    descHi: 'खास गावरान चवीचे काळा मसाला चिकन, गरमागरम बाजरी-ज्वारी भाकरी, अंडी, तर्रीदार रस्सा आणि भात.',
  },
  {
    id: 3,
    src: '/images/restaurant/img_03.jpg',
    category: 'food',
    titleEn: 'Signature Kala Masala Chicken Sukka',
    titleHi: 'झणझणीत काळा मसाला चिकन सुक्का',
    descEn: 'Slow-roasted desi spices cooked to perfection with tender chicken pieces and fresh coriander.',
    descHi: 'घाटावरच्या पारंपरिक मसाल्यात परतलेला रसरशीत आणि चवदार चिकन सुक्का.',
  },
  {
    id: 4,
    src: '/images/restaurant/img_06.jpg',
    category: 'dining',
    titleEn: 'Family Dining Hall',
    titleHi: 'स्वच्छ आणि प्रशस्त फॅमिली डायनिंग हॉल',
    descEn: 'Hygienic, air-cooled family seating section suitable for large family groups and highway travellers.',
    descHi: 'कुटुंबासह निवांत जेवणासाठी स्वच्छ, हवेशीर आणि आरामदायी बैठक व्यवस्था.',
  },
  {
    id: 5,
    src: '/images/restaurant/img_05.jpg',
    category: 'food',
    titleEn: 'Sizzling Paneer Butter Masala',
    titleHi: 'सिझलिंग पनीर बटर मसाला',
    descEn: 'Soft malai paneer cubes simmered in a rich, buttery tomato gravy, served smoking hot on a sizzler plate.',
    descHi: 'मऊ मलाई पनीरची मखमली बटर ग्रेव्ही, सिझलर प्लेटवर गरमागरम सर्व्ह केली जाते.',
  },
  {
    id: 6,
    src: '/images/restaurant/img_08.jpg',
    category: 'food',
    titleEn: 'Special Sea Fish Thali',
    titleHi: 'महाराजा स्पेशल फिश थाळी',
    descEn: 'Fresh whole fried fish, coconut fish curry rassa, coastal chutney, piping hot bhakri and steamed rice.',
    descHi: 'ताजा कुरकुरीत मासा, नारळाच्या दुधाचा चवदार फिश रस्सा, चटणी आणि गरमागरम भाकरी.',
  },
  {
    id: 7,
    src: '/images/restaurant/img_11.jpg',
    category: 'food',
    titleEn: 'Crispy Rava Fish Fry Platter',
    titleHi: 'कुरकुरीत रवा फिश फ्राय',
    descEn: 'Marinated in coastal spices with a crunchy golden rava coating, served with lemon wedges and onions.',
    descHi: 'सिन्नरमधील सर्वोत्तम सीफूड - रवा कोटेड कुरकुरीत फिश फ्राय, कांदा आणि लिंबासोबत.',
  },
  {
    id: 8,
    src: '/images/restaurant/img_09.jpg',
    category: 'food',
    titleEn: 'Paneer Kolhapuri Handi',
    titleHi: 'मसालेदार पनीर कोल्हापुरी हांडी',
    descEn: 'Fiery red chilli spiced handi gravy infused with fresh whole garam masalas and farm cottage cheese.',
    descHi: 'पारंपरिक हांडीमध्ये तयार केलेली झणझणीत तांबडी पनीर भाजी.',
  },
  {
    id: 9,
    src: '/images/restaurant/img_10.jpg',
    category: 'food',
    titleEn: 'Shahi Malai Kofta Sizzler',
    titleHi: 'शाही मलाई कोफ्ता',
    descEn: 'Delicate stuffed cottage cheese dumplings immersed in a creamy cashew and saffron gravy.',
    descHi: 'काजू आणि मलईच्या शाही ग्रेव्हीमध्ये मऊ कोफ्ते - शाकाहारी खवय्यांची पहिली पसंती.',
  },
  {
    id: 10,
    src: '/images/restaurant/img_07.jpg',
    category: 'menu',
    titleEn: 'Official Restaurant Menu Card Cover',
    titleHi: 'हॉटेल महाराजा अधिकृत मेनू कार्ड',
    descEn: 'Showing verified contact: 7447857456, logo and address at Gurewadi Phata, Sinnar.',
    descHi: 'अधिकृत संपर्क क्रमांक: 7447857456, लोगो आणि पत्ता गुरेवाडी फाटा, सिन्नर.',
  },
  {
    id: 11,
    src: '/images/restaurant/img_04.jpg',
    category: 'menu',
    titleEn: 'Original Restaurant Menu & Tariff Card',
    titleHi: 'मूळ मेनू आणि दर सूची',
    descEn: 'Original menu sheet featuring hot beverages, roasted papads, veg soups, salads and starters.',
    descHi: 'हॉटेल महाराजाचे मूळ मेनू पान - चहा, सूप, पापड, कोशिंबीर आणि स्टार्टर्स.',
  },
]

const FILTER_LABELS: Record<Category, { en: string; hi: string }> = {
  all:    { en: 'All Photos (11)', hi: 'सर्व फोटो (११)' },
  food:   { en: 'Dhaba Dishes', hi: 'चवदार पदार्थ' },
  dining: { en: 'Ambiance & Venue', hi: 'हॉल आणि परिसर' },
  menu:   { en: 'Original Menu Cards', hi: 'मूळ मेनू कार्ड' },
}

export function GalleryContent() {
  const { lang } = useStore()
  const [filter, setFilter] = useState<Category>('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = GALLERY_ITEMS.filter((i) => filter === 'all' || i.category === filter)
  const lbItem = lightbox !== null ? GALLERY_ITEMS.find((i) => i.id === lightbox) : null

  function closeLightbox() {
    setLightbox(null)
  }

  function navigate(dir: 1 | -1) {
    if (lightbox === null) return
    const idx = filtered.findIndex((i) => i.id === lightbox)
    const newIdx = (idx + dir + filtered.length) % filtered.length
    setLightbox(filtered[newIdx].id)
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-hero mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-2">
            {lang === 'hi' ? 'हॉटेल महाराजा फोटो गॅलरी' : 'Hotel Maharajaa Photo Gallery'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-cream">
            {lang === 'hi' ? 'खऱ्या चवीची आणि परिसराची एक झलक' : 'A Glimpse of Authentic Flavours'}
          </h1>
          <p className="text-muted text-sm mt-3 max-w-xl mx-auto">
            {lang === 'hi'
              ? 'गुरेवाडी फाटा, सिन्नर येथील प्रत्यक्ष हॉटेल, जेवणाची थाळी आणि अस्सल गावरान पदार्थांची छायाचित्रे.'
              : 'Direct photographs from our Sinnar kitchen, dining ambiance, special thalis, and real menu cards.'}
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 justify-center mb-8 flex-wrap">
          {(Object.keys(FILTER_LABELS) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat)
                window.gtag?.('event', 'gallery_filter', { category: cat })
              }}
              className={[
                'rounded-pill px-4 py-2 text-xs sm:text-sm font-medium transition-all cursor-pointer',
                filter === cat
                  ? 'bg-ember text-smoke font-bold shadow-lg shadow-orange-950/40'
                  : 'bg-surface border border-white/10 text-muted hover:text-cream hover:border-white/30',
              ].join(' ')}
            >
              {lang === 'hi' ? FILTER_LABELS[cat].hi : FILTER_LABELS[cat].en}
            </button>
          ))}
        </div>

        {/* Grid of real photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setLightbox(item.id)
                window.gtag?.('event', 'lightbox_open', { item_id: item.id })
              }}
              className="group relative bg-surface border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:border-ember/60 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                <img
                  src={asset(item.src)}
                  alt={item.titleEn}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 text-amber-400 border border-amber-400/30 backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-cream text-base group-hover:text-ember transition-colors line-clamp-1">
                  {lang === 'hi' ? item.titleHi : item.titleEn}
                </h3>
                <p className="text-muted text-xs mt-1.5 line-clamp-2 leading-relaxed">
                  {lang === 'hi' ? item.descHi : item.descEn}
                </p>
                <div className="mt-3 flex items-center text-xs text-ember font-medium">
                  <span>{lang === 'hi' ? 'मोठे करून पहा' : 'Click to view full photo'}</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lbItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lbItem.titleEn}
        >
          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(-1)
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-stone-900/80 border border-white/20 rounded-full flex items-center justify-center text-cream hover:bg-ember hover:text-smoke z-20 text-lg transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            ←
          </button>

          {/* Image & details card */}
          <div
            className="max-w-4xl w-full max-h-[90vh] bg-surface border border-white/20 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[65vh] overflow-hidden">
              <img
                src={asset(lbItem.src)}
                alt={lbItem.titleEn}
                className="max-h-[65vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>
            <div className="p-4 sm:p-5 bg-surface border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-ember/20 text-ember border border-ember/30">
                    {lbItem.category}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl text-cream">
                    {lang === 'hi' ? lbItem.titleHi : lbItem.titleEn}
                  </h3>
                </div>
                <p className="text-muted text-xs sm:text-sm">
                  {lang === 'hi' ? lbItem.descHi : lbItem.descEn}
                </p>
              </div>
              <a
                href={asset(lbItem.src)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-2 text-xs font-semibold rounded-pill bg-white/10 hover:bg-white/20 text-cream border border-white/20 transition-all"
              >
                {lang === 'hi' ? 'मूळ फोटो पहा' : 'View High Res'}
              </a>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(1)
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-stone-900/80 border border-white/20 rounded-full flex items-center justify-center text-cream hover:bg-ember hover:text-smoke z-20 text-lg transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            →
          </button>

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 bg-stone-900/80 border border-white/20 rounded-full flex items-center justify-center text-cream hover:bg-red-600 z-20 text-base transition-colors cursor-pointer"
            aria-label="Close photo preview"
          >
            ✕
          </button>
        </div>
      )}
    </main>
  )
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
