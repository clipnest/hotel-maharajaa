'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { DietToggle } from '@/components/ui/DietToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { OpenNowBadge } from '@/components/ui/OpenNowBadge'
import { business } from '@/lib/data/business'

const NAV_LINKS = [
  { href: '/',                          en: 'Home',         hi: 'होम' },
  { href: '/menu',                      en: 'Menu',         hi: 'मेनू' },
  { href: '/specialities',              en: 'Specialities', hi: 'खासियत' },
  { href: '/highway-dhaba-nashik-pune', en: 'Highway Stop', hi: 'हायवे ढाबा' },
  { href: '/family-dining-sinnar',      en: 'Family Hall',  hi: 'फॅमिली' },
  { href: '/gallery',                   en: 'Gallery',      hi: 'गॅलरी' },
  { href: '/contact',                   en: 'Contact',      hi: 'संपर्क' },
]

export function Header() {
  const { lang, cart, setTrayOpen } = useStore()
  const [scrolled, setScrolled]     = useState(false)
  const [hidden, setHidden]         = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const lastY = useRef(0)
  const cartCount = useStore((s) => s.cartCount())

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      setHidden(y > lastY.current && y > 200)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'header-scrolled shadow-lg' : 'bg-smoke/90 backdrop-blur-md border-b border-white/10',
          hidden   ? '-translate-y-full' : 'translate-y-0',
        ].join(' ')}
      >
        <div className="max-w-container mx-auto px-3 sm:px-6 flex items-center justify-between h-16 md:h-18 gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
            <span className="font-display text-lg sm:text-xl text-cream leading-none">
              <span className="text-ember">Hotel</span> Maharajaa
            </span>
          </Link>

          {/* Top Diet Toggle — Prominently placed on top for mobile and desktop */}
          <div className="flex-shrink-0">
            <DietToggle size="sm" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted hover:text-cream transition-colors duration-200"
              >
                {lang === 'hi' ? l.hi : l.en}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="hidden sm:block">
              <OpenNowBadge compact />
            </div>
            <ThemeToggle />
            <LanguageToggle />

            {/* Cart button (desktop & mobile) */}
            {cartCount > 0 && (
              <button
                onClick={() => setTrayOpen(true)}
                className="flex items-center gap-1 bg-veg/20 border border-veg/40 text-veg rounded-pill px-2.5 py-1 text-xs font-semibold hover:bg-veg/30 transition shadow-glow-veg"
                aria-label={`View order (${cartCount} items)`}
              >
                🛒 {cartCount}
              </button>
            )}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent('Hi Hotel Maharajaa, I would like to enquire / place an order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-ember text-smoke font-bold rounded-pill px-4 py-2 text-xs uppercase tracking-wider glow-ember hover:scale-105 transition-all duration-300"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {lang === 'hi' ? 'ऑर्डर' : 'WhatsApp'}
            </a>

            {/* Hamburger */}
            <button
              className="xl:hidden p-1.5 text-cream hover:text-ember transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} lang={lang} />
    </>
  )
}

function MobileMenu({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: 'en' | 'hi' }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div
      className={[
        'fixed inset-0 z-[60] bg-smoke/95 backdrop-blur-xl flex flex-col transition-all duration-500',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
      aria-modal="true"
      role="dialog"
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-display text-xl text-cream">
          <span className="text-ember">Hotel</span> Maharajaa
        </span>
        <button onClick={onClose} aria-label="Close menu" className="p-2 text-cream">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 flex flex-col justify-center px-8 gap-6" aria-label="Mobile navigation">
        {NAV_LINKS.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClose}
            className="font-display text-3xl text-cream hover:text-ember transition-colors"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {lang === 'hi' ? l.hi : l.en}
          </Link>
        ))}
      </nav>

      {/* Bottom action buttons */}
      <div className="px-6 pb-10 grid grid-cols-3 gap-3">
        <a
          href={`tel:${business.contact.phone}`}
          className="flex flex-col items-center gap-1 bg-surface rounded-card p-3 text-cream text-xs font-medium border border-white/10"
        >
          <span className="text-xl">📞</span>
          {lang === 'hi' ? 'कॉल' : 'Call'}
        </a>
        <a
          href={`https://wa.me/${business.contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 bg-veg/20 border border-veg/40 rounded-card p-3 text-veg text-xs font-medium"
        >
          <span className="text-xl">💬</span>
          WhatsApp
        </a>
        <a
          href={`https://maps.google.com/?q=${business.geo.lat},${business.geo.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 bg-surface rounded-card p-3 text-cream text-xs font-medium border border-white/10"
        >
          <span className="text-xl">📍</span>
          {lang === 'hi' ? 'रास्ता' : 'Directions'}
        </a>
      </div>
    </div>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
