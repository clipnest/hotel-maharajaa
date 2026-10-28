'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'
import { asset } from '@/lib/utils/asset'

const TEASER_PHOTOS = [
  {
    src: '/images/restaurant/img_02.jpg',
    labelEn: 'Maharajaa Special Non-Veg Thali',
    labelHi: 'महाराजा स्पेशल नॉन-व्हेज थाळी',
    category: 'Special Thali',
  },
  {
    src: '/images/restaurant/img_03.jpg',
    labelEn: 'Kala Masala Chicken Sukka',
    labelHi: 'काळा मसाला चिकन सुक्का',
    category: 'House Special',
  },
  {
    src: '/images/restaurant/img_05.jpg',
    labelEn: 'Sizzling Paneer Butter Masala',
    labelHi: 'सिझलिंग पनीर बटर मसाला',
    category: 'Veg Delight',
  },
  {
    src: '/images/restaurant/img_08.jpg',
    labelEn: 'Special Sea Fish Thali',
    labelHi: 'स्पेशल फिश थाळी',
    category: 'Seafood',
  },
  {
    src: '/images/restaurant/img_01.jpg',
    labelEn: 'Hotel Maharajaa Night View',
    labelHi: 'हॉटेल महाराजा रात्रीचे दृश्य',
    category: 'Highway Dhaba',
  },
  {
    src: '/images/restaurant/img_06.jpg',
    labelEn: 'Family Dining Ambiance',
    labelHi: 'फॅमिली डायनिंग हॉल',
    category: 'Dine-In',
  },
]

export function GalleryTeaser() {
  const { lang } = useStore()

  return (
    <section className="py-20 bg-raised/20" aria-label="Photo gallery preview">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-2">
              {lang === 'hi' ? 'फोटो गॅलरी' : 'Real Dhaba Photos'}
            </p>
            <h2 className="font-display text-3xl text-cream">
              {lang === 'hi' ? 'ढाब्याची अस्सल चव आणि वातावरण' : 'Peek Inside the Dhaba'}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-ember text-sm font-semibold hover:underline hidden sm:flex items-center gap-1"
          >
            {lang === 'hi' ? 'सर्व ११ फोटो पहा →' : 'See all 11 photos →'}
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {TEASER_PHOTOS.map((item, i) => (
            <Link
              key={i}
              href="/gallery"
              className="group relative aspect-[4/3] rounded-card overflow-hidden border border-white/10 hover:border-ember/60 transition-all shadow-md"
              aria-label={`View photo: ${item.labelEn}`}
            >
              <img
                src={asset(item.src)}
                alt={item.labelEn}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-0.5">
                  {item.category}
                </span>
                <span className="text-cream text-xs sm:text-sm font-semibold line-clamp-1 group-hover:text-ember transition-colors">
                  {lang === 'hi' ? item.labelHi : item.labelEn}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link href="/gallery" className="text-ember text-sm font-semibold hover:underline">
            {lang === 'hi' ? 'सर्व ११ फोटो पहा →' : 'See all 11 photos →'}
          </Link>
        </div>
      </div>
    </section>
  )
}
