'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { OpenNowBadge } from '@/components/ui/OpenNowBadge'
import { business } from '@/lib/data/business'
import dynamic from 'next/dynamic'

// Lazy-load the 3D rotating Maharaja emblem scene
const MaharajaScene = dynamic(() => import('@/components/three/MaharajaScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 rounded-full border-2 border-turmeric/30 animate-pulse" />
    </div>
  ),
})

const SPICE_ICONS = ['🌶️','🌶️','🌶️','🌶️','🌶️']

export function HeroSection() {
  const { lang, reduceMotion } = useStore()
  const heroRef = useRef<HTMLElement>(null)

  const text = {
    h1:   lang === 'hi' ? 'असली ढाबा स्वाद,' : 'Asli Dhaba Swaad,',
    h1b:  lang === 'hi' ? 'सीधा आग से।' : 'Seedha Aag Se.',
    sub:  lang === 'hi'
      ? 'धुएँदार तंदूर। धीमी आँच पर पकी दाल। वेज और नॉन-वेज, गरमागरम परोसा जाता है।'
      : 'Smoky tandoor. Slow-cooked dal. Veg and non-veg, served hot all day.',
    cta1: lang === 'hi' ? 'WhatsApp पर ऑर्डर करें' : 'Order on WhatsApp',
    cta2: lang === 'hi' ? 'मेनू देखें' : 'See the Menu',
    rating: lang === 'hi' ? 'लोकप्रिय ढाबा' : 'Your favourite dhaba',
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Dark smoke gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-smoke via-[#1a0f08] to-smoke z-0" />

      {/* Ember gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(255,107,26,.18),transparent_60%)] z-0" />

      {/* 3D Rotating Maharaja 360° Text & Emblem Scene */}
      {!reduceMotion && (
        <div className="hidden lg:flex absolute right-4 xl:right-16 top-1/2 -translate-y-1/2 w-[460px] xl:w-[540px] h-[460px] xl:h-[540px] z-10 items-center justify-center pointer-events-auto">
          <MaharajaScene />
        </div>
      )}

      {/* Static ember pattern (fallback / mobile bg) */}
      <div className="absolute inset-0 z-0 opacity-30 lg:opacity-0"
        style={{ background: 'radial-gradient(ellipse at 80% 60%, rgba(255,107,26,.3), transparent 50%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-hero mx-auto px-4 sm:px-8 pt-28 pb-20 w-full">
        <div className="max-w-xl">
          {/* Open-now badge + rating chip */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <OpenNowBadge />
            <div className="flex items-center gap-1.5 bg-surface/80 backdrop-blur border border-white/10 rounded-pill px-3 py-1 text-xs text-muted">
              ⭐ 4.5 · <span>{text.rating}</span>
            </div>
          </div>

          {/* H1 */}
          <h1 className="font-display font-black text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.05] tracking-tight text-cream mb-2">
            {text.h1}
          </h1>
          <h1 className="font-display font-black text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.05] tracking-tight text-ember mb-6">
            {text.h1b}
          </h1>

          {/* Sub */}
          <p className="text-muted text-lg leading-relaxed mb-8 max-w-md">
            {text.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent('Namaste Hotel Maharajaa! I would like to place an order / book a table.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-ember text-smoke font-bold rounded-pill px-7 py-3.5 text-base glow-ember animate-glow-breathe hover:scale-105 transition-transform"
              onClick={() => window?.gtag?.('event','hero_cta_click',{cta:'whatsapp'})}
            >
              <WhatsAppIcon className="w-5 h-5" />
              {text.cta1}
            </a>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 border border-cream/30 text-cream font-semibold rounded-pill px-7 py-3.5 text-base hover:border-ember hover:text-ember transition-all duration-300"
              onClick={() => window?.gtag?.('event','hero_cta_click',{cta:'menu'})}
            >
              {text.cta2} →
            </Link>
          </div>

          {/* Spice preview */}
          <div className="mt-10 flex items-center gap-2 text-sm text-muted">
            <span>{lang === 'hi' ? 'तीखापन से लेकर मीठे तक:' : 'From mild to fire:'}</span>
            <div className="flex" aria-label="Spice scale 1 to 5">
              {SPICE_ICONS.map((icon, i) => (
                <span key={i} className={i < 3 ? 'opacity-100' : 'opacity-30'} aria-hidden="true">
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-smoke to-transparent z-10 pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted text-xs animate-float">
        <span>{lang === 'hi' ? 'नीचे स्क्रॉल करें' : 'Scroll'}</span>
        <div className="w-5 h-9 rounded-pill border-2 border-muted/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-ember animate-bounce" />
        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// Extend window for gtag
declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}
