'use client'

import dynamic from 'next/dynamic'
import { useScrollReveal } from '@/lib/utils/useScrollReveal'
import { useStore } from '@/lib/store'

const Tandoor3DScene = dynamic(() => import('@/components/three/Tandoor3DScene'), {
  ssr: false,
  loading: () => <div className="text-4xl mb-2 text-center">🔥</div>,
})

const STATS = [
  { is3D: true, en: 'Fresh Clay Tandoor Daily', hi: 'दररोज ताजे मातीचे तंदूर', num: null },
  { icon: '🍛', en: 'Authentic Dhaba Dishes', hi: 'अस्सल ढाबा पदार्थ', num: 45 },
  { icon: '👨‍👩‍👧‍👦', en: 'Happy Families Welcomed', hi: 'तृप्त कुटुंबे', num: 10000 },
  { icon: '⭐', en: 'Google Highway Rating', hi: 'गुगल रेटिंग', num: 4.5 },
]

export function WhyMaharajaa() {
  const { lang } = useStore()
  const ref = useScrollReveal()

  return (
    <section className="py-20 md:py-28" aria-label="Why Maharajaa">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div ref={ref} className="reveal text-center mb-12">
          <p className="text-ember text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">
            {lang === 'hi' ? 'हॉटेल महाराजा का?' : 'Why Hotel Maharajaa?'}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-cream font-bold tracking-tight">
            {lang === 'hi'
              ? 'येथे जेवण म्हणजे — केवळ तृप्ती आणि आनंद.'
              : 'Real Fire. Authentic Taste. Family Hospitality.'}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="group bg-surface rounded-2xl p-6 text-center border border-white/10 hover:border-ember/40 hover:shadow-glow-ember transition-all duration-300 flex flex-col items-center justify-center min-h-[190px]"
            >
              {stat.is3D ? (
                <div className="w-full flex items-center justify-center">
                  <Tandoor3DScene />
                </div>
              ) : (
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {stat.icon}
                </div>
              )}

              {stat.num !== null && (
                <div className="font-display text-3xl font-extrabold text-ember mb-1">
                  {stat.num}+
                </div>
              )}
              <p className="text-muted text-xs sm:text-sm font-medium">
                {lang === 'hi' ? stat.hi : stat.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
