'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { business } from '@/lib/data/business'
import { useStore } from '@/lib/store'

export function Footer() {
  const { lang } = useStore()
  const [year, setYear] = useState(2026)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  const quickLinks = [
    { href: '/menu',     en: 'Menu',     hi: 'मेनू' },
    { href: '/order',    en: 'Order',    hi: 'ऑर्डर' },
    { href: '/catering', en: 'Catering', hi: 'कैटरिंग' },
    { href: '/faq',      en: 'FAQ',      hi: 'FAQ' },
    { href: '/reviews',  en: 'Reviews',  hi: 'समीक्षाएँ' },
  ]

  const exploreLinks = [
    { href: '/highway-dhaba-nashik-pune', en: 'Nashik-Pune Highway Dhaba', hi: 'नाशिक-पुणे हायवे ढाबा' },
    { href: '/specialities',              en: 'Kala Masala & Thalis',       hi: 'काळा मसाला व थाळी' },
    { href: '/family-dining-sinnar',      en: 'Family Restaurant Sinnar',   hi: 'फॅमिली रेस्टॉरंट सिन्नर' },
    { href: '/gallery',                   en: 'Photo Gallery (11 Photos)', hi: 'फोटो गॅलरी' },
    { href: '/about',                     en: 'Our Story',                  hi: 'आमची गोष्ट' },
  ]

  const legalLinks = [
    { href: '/privacy-policy', en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
    { href: '/terms',          en: 'Terms of Use',   hi: 'उपयोग की शर्तें' },
  ]

  return (
    <footer className="bg-surface border-t border-white/10 pt-16 pb-8">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl text-cream mb-2 font-bold">
              <span className="text-ember">Hotel</span> Maharajaa
            </div>
            <p className="text-muted text-sm mb-4 leading-relaxed">
              {lang === 'hi' ? business.taglineHi : business.tagline}
            </p>
            <p className="text-xs text-muted/80 mb-4 leading-relaxed">
              Serving highway travellers, pilgrims, and local families at Gurewadi Phata, Sinnar (NH 60).
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {business.social.instagram && (
                <a href={business.social.instagram} target="_blank" rel="noopener noreferrer"
                   aria-label="Instagram" className="w-9 h-9 bg-raised rounded-full flex items-center justify-center text-muted hover:text-ember transition-colors">
                  <InstagramIcon />
                </a>
              )}
              {business.social.facebook && (
                <a href={business.social.facebook} target="_blank" rel="noopener noreferrer"
                   aria-label="Facebook" className="w-9 h-9 bg-raised rounded-full flex items-center justify-center text-muted hover:text-ember transition-colors">
                  <FacebookIcon />
                </a>
              )}
              {business.social.youtube && (
                <a href={business.social.youtube} target="_blank" rel="noopener noreferrer"
                   aria-label="YouTube" className="w-9 h-9 bg-raised rounded-full flex items-center justify-center text-muted hover:text-ember transition-colors">
                  <YouTubeIcon />
                </a>
              )}
            </div>
          </div>

          {/* Explore & Highway Guides (SEO) */}
          <div>
            <h3 className="text-cream font-bold mb-4 text-xs uppercase tracking-widest">
              {lang === 'hi' ? 'विशेष दालन व मार्गदर्शक' : 'Specialities & Highway'}
            </h3>
            <ul className="space-y-2">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted hover:text-ember text-sm transition-colors">
                    {lang === 'hi' ? l.hi : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-cream font-bold mb-4 text-xs uppercase tracking-widest">
              {lang === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted hover:text-cream text-sm transition-colors">
                    {lang === 'hi' ? l.hi : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-cream font-bold mb-4 text-xs uppercase tracking-widest">
              {lang === 'hi' ? 'संपर्क व पत्ता' : 'Contact & Location'}
            </h3>
            <address className="not-italic space-y-1.5 text-xs sm:text-sm text-muted">
              <p className="text-cream font-medium">Gurewadi Phata, Nashik-Pune Highway</p>
              <p>Sinnar, Nashik — 422103</p>
              <p className="pt-1">
                <a href={`tel:${business.contact.phone}`} className="text-ember font-bold hover:underline">
                  📞 {business.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`https://wa.me/${business.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-veg font-semibold hover:underline"
                >
                  💬 WhatsApp: {business.contact.phone}
                </a>
              </p>
            </address>

            <div className="mt-4 border-t border-white/10 pt-3 text-xs text-muted">
              <span className="text-cream font-semibold block mb-0.5">🕐 Daily Dining Hours:</span>
              <span>11:00 AM – 11:30 PM (All 7 Days)</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {year} Hotel Maharajaa (हॉटेल महाराजा). Authentic Veg & Non-Veg Dhaba, Sinnar.</p>
          <div className="flex flex-wrap gap-4 items-center">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-cream transition-colors">
                {lang === 'hi' ? l.hi : l.en}
              </Link>
            ))}
            <span className="text-muted/50">|</span>
            <span>
              {lang === 'hi' ? 'FSSAI लाइसेंस' : 'FSSAI'}: {business.fssai}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>© {year} Hotel Maharajaa.</span>
            <span className="text-muted/50">·</span>
            <span>
              {lang === 'hi'
                ? '❤️ के साथ Revox द्वारा बनाया गया'
                : 'Made with ❤️ by Revox'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}
function YouTubeIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  )
}
