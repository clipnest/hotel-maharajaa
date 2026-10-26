'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'

export default function NotFound() {
  const { lang } = useStore()

  return (
    <main className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
      <div className="max-w-md w-full text-center bg-surface rounded-card p-10 border border-white/10 shadow-glow-ember">
        <div className="text-7xl mb-4 animate-float">🍲</div>
        <div className="font-display text-6xl text-ember font-bold mb-2">404</div>
        <h1 className="font-display text-2xl text-cream mb-3">
          {lang === 'hi' ? 'तवा खाली है! (पेज नहीं मिला)' : 'The Plate is Empty!'}
        </h1>
        <p className="text-muted text-sm mb-8 leading-relaxed">
          {lang === 'hi'
            ? 'जो पेज आप ढूँढ रहे हैं वह शायद किचन से बाहर चला गया है या मौजूद नहीं है।'
            : 'Looks like this dish got eaten or the page you are looking for took a detour on the highway.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 bg-ember text-smoke font-bold rounded-pill px-6 py-3 text-sm glow-ember hover:scale-105 transition-transform"
          >
            🍛 {lang === 'hi' ? 'मेनू देखें' : 'Check The Menu'}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-cream rounded-pill px-6 py-3 text-sm hover:border-ember hover:text-ember transition-colors"
          >
            🏠 {lang === 'hi' ? 'होम पर जाएँ' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </main>
  )
}
