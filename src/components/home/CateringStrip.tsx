'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'

export function CateringStrip() {
  const { lang } = useStore()

  return (
    <section className="py-16 relative overflow-hidden" aria-label="Catering">
      <div className="absolute inset-0 bg-gradient-to-r from-smoke via-ember/10 to-smoke" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,107,26,.12),transparent_60%)]" />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 text-center">
        <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-3">
          {lang === 'hi' ? 'कैटरिंग और इवेंट्स' : 'Catering & Events'}
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-cream mb-3">
          {lang === 'hi' ? 'पार्टी का पूरा स्वाद' : 'Party at home?'}
        </h2>
        <p className="text-muted text-lg max-w-lg mx-auto mb-8">
          {lang === 'hi'
            ? 'हम पकाएँ, आप जश्न मनाएँ। वेज और नॉन-वेज, बड़े ऑर्डर में।'
            : 'We cook, you celebrate. Veg and non-veg, in bulk orders for any occasion.'}
        </p>
        <Link
          href="/catering"
          className="inline-flex items-center gap-2 bg-ember text-smoke font-bold rounded-pill px-8 py-3.5 text-base glow-ember hover:scale-105 transition-transform animate-glow-breathe"
        >
          {lang === 'hi' ? 'कोटेशन लें →' : 'Get a Quote →'}
        </Link>
      </div>
    </section>
  )
}
