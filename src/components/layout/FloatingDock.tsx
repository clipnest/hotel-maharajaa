'use client'

import Link from 'next/link'
import { business } from '@/lib/data/business'

/**
 * Floating Action Dock — visible on mobile, always at the bottom.
 * Three round glow buttons: Call, WhatsApp, Directions.
 */
export function FloatingDock() {
  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 md:hidden flex items-center gap-3 glass rounded-pill px-4 py-2 shadow-glow-ember"
      aria-label="Quick actions"
    >
      <a
        href={`tel:${business.contact.phone}`}
        className="flex flex-col items-center gap-0.5 min-w-[56px]"
        aria-label="Call us"
      >
        <span className="w-10 h-10 flex items-center justify-center bg-surface rounded-full border border-white/10 text-xl hover:border-ember/40 transition-all">
          📞
        </span>
        <span className="text-[10px] text-muted">Call</span>
      </a>

      <a
        href={`https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent('Namaste Hotel Maharajaa! I would like to place an order / reserve a table.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 min-w-[56px]"
        aria-label="Order on WhatsApp"
      >
        <span className="w-12 h-12 flex items-center justify-center bg-veg/20 rounded-full border border-veg/40 text-2xl shadow-glow-veg hover:shadow-glow-veg transition-all animate-glow-breathe">
          💬
        </span>
        <span className="text-[10px] text-veg font-medium">WhatsApp</span>
      </a>

      <a
        href={`https://maps.google.com/?q=${business.geo.lat},${business.geo.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 min-w-[56px]"
        aria-label="Get directions"
      >
        <span className="w-10 h-10 flex items-center justify-center bg-surface rounded-full border border-white/10 text-xl hover:border-ember/40 transition-all">
          📍
        </span>
        <span className="text-[10px] text-muted">Directions</span>
      </a>
    </div>
  )
}
