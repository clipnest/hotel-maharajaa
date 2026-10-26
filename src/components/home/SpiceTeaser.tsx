'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useStore } from '@/lib/store'
import { menu } from '@/lib/data/menu'

const Spice3DScene = dynamic(() => import('@/components/three/Spice3DScene'), {
  ssr: false,
  loading: () => (
    <div className="h-48 flex items-center justify-center text-5xl animate-pulse">
      🌶️
    </div>
  ),
})

const SPICE_LABELS = [
  '',
  'Level 1: Mild & Fragrant 🌿',
  'Level 2: Gentle Warmth 🌶️',
  'Level 3: Medium Dhaba Heat 🌶️🌶️',
  'Level 4: Hot & Spicy 🌶️🌶️🌶️',
  'Level 5: Fire Kolhapuri Blast 🔥🌶️🌶️🌶️🌶️',
]
const SPICE_LABELS_HI = [
  '',
  '१. सौम्य आणि सुगंधित 🌿',
  '२. हलका तिखट 🌶️',
  '३. अस्सल ढाबा तिखट 🌶️🌶️',
  '४. झणझणीत तिखट 🌶️🌶️🌶️',
  '५. आग लावणारा कोल्हापुरी तिखट 🔥',
]

export function SpiceTeaser() {
  const { lang, spiceLevel, setSpiceLevel } = useStore()

  const filtered = menu.filter((d) => d.spice <= spiceLevel).slice(0, 6)

  return (
    <section className="py-20 bg-raised/30 relative overflow-hidden" aria-label="Spice level filter">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <p className="text-ember text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">
            {lang === 'hi' ? 'तीखेपणाचा ३D मिटर' : 'Interactive 3D Spice-O-Meter'}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-cream mb-2 font-bold tracking-tight">
            {lang === 'hi' ? 'किती आग सहन करू शकता?' : 'How much fire can you handle?'}
          </h2>
          <p className="text-muted text-sm sm:text-base font-medium">
            {lang === 'hi' ? SPICE_LABELS_HI[spiceLevel] : SPICE_LABELS[spiceLevel]}
          </p>
        </div>

        {/* Real-time Interactive 3D Chilli & Flame Element */}
        <div className="max-w-md mx-auto mb-4">
          <Spice3DScene level={spiceLevel} />
        </div>

        {/* Slider */}
        <div className="max-w-sm mx-auto mb-10">
          <input
            type="range"
            min={1}
            max={5}
            value={spiceLevel}
            onChange={(e) => {
              setSpiceLevel(Number(e.target.value))
              window.gtag?.('event', 'spice_slider_use', { level: e.target.value })
            }}
            className="w-full accent-ember cursor-pointer h-2 bg-raised rounded-lg appearance-none"
            aria-label={`Spice level: ${spiceLevel} of 5`}
          />
          <div className="flex justify-between text-xs text-muted mt-2 font-semibold">
            <span>🌿 {lang === 'hi' ? '१. सौम्य (Mild)' : '1. Mild'}</span>
            <span>🌶️ {lang === 'hi' ? '३. मध्यम' : '3. Medium'}</span>
            <span>🔥 {lang === 'hi' ? '५. अंगार (Fiery)' : '5. Fiery'}</span>
          </div>
        </div>

        {/* Matching dishes preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((d) => (
            <Link
              key={d.id}
              href="/menu"
              className="flex items-center gap-3 bg-surface rounded-card p-3 border border-white/10 hover:border-ember/40 hover:shadow-glow-ember transition-all"
            >
              <span
                className={[
                  'w-2.5 h-2.5 rounded-full flex-shrink-0',
                  d.diet === 'veg' ? 'bg-veg' : 'bg-nonveg',
                ].join(' ')}
              />
              <span className="text-cream text-sm font-semibold truncate">
                {lang === 'hi' && d.nameHi ? d.nameHi : d.nameEn}
              </span>
              <span className="ml-auto text-muted text-xs flex-shrink-0 font-medium">
                ₹{d.price}
              </span>
            </Link>
          ))}
        </div>

        <p className="text-center text-muted text-sm mt-8">
          {lang === 'hi'
            ? `${filtered.length} पदार्थ या तिखट पातळीसाठी`
            : `${filtered.length} dishes for your heat level`}
          {' · '}
          <Link href="/menu" className="text-ember hover:underline font-semibold">
            {lang === 'hi' ? 'संपूर्ण मेनू पहा →' : 'Browse full menu →'}
          </Link>
        </p>
      </div>
    </section>
  )
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
