'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useStore } from '@/lib/store'
import { menu } from '@/lib/data/menu'
import { DishCard } from '@/components/menu/DishCard'

const Handi3DScene = dynamic(() => import('@/components/three/Handi3DScene'), {
  ssr: false,
  loading: () => <div className="w-24 h-24 flex items-center justify-center text-4xl">🥘</div>,
})

export function VegNonVegSplit() {
  const { lang, setDiet } = useStore()
  const [expanded, setExpanded] = useState<'veg' | 'nonveg' | null>(null)

  const topVeg = menu.filter((d) => d.diet === 'veg' && d.popular).slice(0, 4)
  const topNonVeg = menu.filter((d) => d.diet === 'nonveg' && d.popular).slice(0, 4)

  function handleSide(side: 'veg' | 'nonveg') {
    setExpanded((prev) => (prev === side ? null : side))
    setDiet(side)
  }

  return (
    <section className="py-20 bg-raised/40 relative" aria-label="Veg and Non-Veg sections">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <p className="text-center text-muted text-xs sm:text-sm uppercase tracking-widest mb-2 font-bold">
          {lang === 'hi' ? 'दोन्ही खवय्यांसाठी' : 'One roof. Every taste.'}
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-cream text-center mb-10 font-bold tracking-tight">
          {lang === 'hi'
            ? 'दोन स्वतंत्र स्वयंपाकघरांची चव, एकाच टेबलावर.'
            : "Two kitchens' worth of flavour. One table."}
        </h2>

        {/* Split reveal with 3D models */}
        <div className="flex flex-col md:flex-row gap-5 rounded-2xl overflow-hidden">
          {/* Veg side with 3D Handi */}
          <div
            className={[
              'relative flex-1 min-h-[300px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border p-6 sm:p-8',
              expanded === 'veg'
                ? 'md:flex-[1.8] border-veg shadow-glow-veg bg-surface'
                : expanded === 'nonveg'
                ? 'md:flex-[0.5] border-white/10 opacity-70 bg-surface/50'
                : 'border-veg/30 hover:border-veg/70 hover:shadow-glow-veg bg-surface',
            ].join(' ')}
            onClick={() => handleSide('veg')}
            role="button"
            tabIndex={0}
            aria-label={`Show vegetarian menu${expanded === 'veg' ? ' (expanded)' : ''}`}
            onKeyDown={(e) => e.key === 'Enter' && handleSide('veg')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-veg/15 via-transparent to-smoke pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 bg-veg/20 border border-veg/40 text-veg rounded-pill px-3 py-1 text-xs sm:text-sm font-bold mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-veg" />
                    {lang === 'hi' ? 'शुद्ध शाकाहारी' : 'Pure Veg Kitchen'}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-cream font-bold">
                    {lang === 'hi' ? 'गावरान वेज मेजवानी' : 'Garden-Fresh & Handi Specialties'}
                  </h3>
                  <p className="text-muted text-sm mt-1 max-w-sm">
                    {lang === 'hi'
                      ? 'पनीर बटर मसाला, दाल तडका, गरमागरम बाजरी-ज्वारी भाकरी आणि वेज थाळी.'
                      : 'Paneer Handis, Dal Tadka, steaming hot Bhakris, and royal veg thalis.'}
                  </p>
                </div>
                {/* 3D Veg Handi Element */}
                <div className="shrink-0 pointer-events-none">
                  <Handi3DScene type="veg" />
                </div>
              </div>

              {expanded === 'veg' && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topVeg.map((d) => (
                    <DishCard key={d.id} dish={d} compact />
                  ))}
                </div>
              )}

              {expanded !== 'veg' && (
                <p className="mt-6 text-veg text-sm font-bold flex items-center gap-1">
                  <span>{lang === 'hi' ? 'व्हेज मेनू पाहण्यासाठी टॅप करा' : 'Tap to explore Veg dishes'}</span>
                  <span>→</span>
                </p>
              )}
            </div>
          </div>

          {/* Non-veg side with 3D Handi */}
          <div
            className={[
              'relative flex-1 min-h-[300px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border p-6 sm:p-8',
              expanded === 'nonveg'
                ? 'md:flex-[1.8] border-nonveg shadow-glow-nonveg bg-surface'
                : expanded === 'veg'
                ? 'md:flex-[0.5] border-white/10 opacity-70 bg-surface/50'
                : 'border-nonveg/30 hover:border-nonveg/70 hover:shadow-glow-nonveg bg-surface',
            ].join(' ')}
            onClick={() => handleSide('nonveg')}
            role="button"
            tabIndex={0}
            aria-label={`Show non-vegetarian menu${expanded === 'nonveg' ? ' (expanded)' : ''}`}
            onKeyDown={(e) => e.key === 'Enter' && handleSide('nonveg')}
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-nonveg/15 via-transparent to-smoke pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 bg-nonveg/20 border border-nonveg/40 text-nonveg rounded-pill px-3 py-1 text-xs sm:text-sm font-bold mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-nonveg" />
                    {lang === 'hi' ? 'स्पेशल नॉन-व्हेज' : 'Non-Veg & Seafood'}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-cream font-bold">
                    {lang === 'hi' ? 'अस्सल काळा मसाला चिकन व मटन' : 'Flame-Grilled & Kala Masala'}
                  </h3>
                  <p className="text-muted text-sm mt-1 max-w-sm">
                    {lang === 'hi'
                      ? 'झणझणीत काळा मसाला चिकन सुक्का, मटन रस्सा आणि कुरकुरीत सुरमई/बांगडा फ्राय.'
                      : 'Authentic Maharashtrian chicken sukka, mutton rassa, and crispy seafood fry.'}
                  </p>
                </div>
                {/* 3D Non-Veg Handi Element */}
                <div className="shrink-0 pointer-events-none">
                  <Handi3DScene type="nonveg" />
                </div>
              </div>

              {expanded === 'nonveg' && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topNonVeg.map((d) => (
                    <DishCard key={d.id} dish={d} compact />
                  ))}
                </div>
              )}

              {expanded !== 'nonveg' && (
                <p className="mt-6 text-nonveg text-sm font-bold flex items-center gap-1">
                  <span>{lang === 'hi' ? 'नॉन-व्हेज मेनू पाहण्यासाठी टॅप करा' : 'Tap to explore Non-Veg dishes'}</span>
                  <span>→</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
