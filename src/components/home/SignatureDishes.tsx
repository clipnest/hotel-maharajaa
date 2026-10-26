'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'
import { signatureDishes } from '@/lib/data/menu'
import { DishCard } from '@/components/menu/DishCard'
import { useScrollReveal } from '@/lib/utils/useScrollReveal'

export function SignatureDishes() {
  const { lang } = useStore()
  const ref = useScrollReveal()

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" aria-label="Signature Dishes">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div ref={ref} className="reveal mb-10 flex items-end justify-between">
          <div>
            <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-2">
              {lang === 'hi' ? 'भीड़ की पसंद' : 'Crowd Favourites'}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-cream">
              {lang === 'hi' ? 'हमारे बेस्टसेलर' : 'Our Bestsellers'}
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden sm:flex items-center gap-1 text-ember text-sm font-medium hover:gap-2 transition-all"
          >
            {lang === 'hi' ? 'पूरा मेनू' : 'Full Menu'} →
          </Link>
        </div>

        {/* Horizontal scroll carousel */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {signatureDishes.map((dish, i) => (
            <div
              key={dish.id}
              className="snap-start flex-shrink-0 w-64 md:w-72"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <DishCard dish={dish} compact />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/menu" className="text-ember text-sm font-medium">
            {lang === 'hi' ? 'पूरा मेनू देखें →' : 'See full menu →'}
          </Link>
        </div>
      </div>
    </section>
  )
}
