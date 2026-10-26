'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { business } from '@/lib/data/business'
import { OpenNowBadge } from '@/components/ui/OpenNowBadge'

export function ContactContent() {
  const { lang } = useStore()
  const [mapLoaded, setMapLoaded] = useState(false)
  const [form, setForm]           = useState({ name: '', phone: '', message: '' })
  const [sent, setSent]           = useState(false)
  const [todayName, setTodayName] = useState('')

  useEffect(() => {
    setTodayName(new Date().toLocaleString('en-US', { weekday: 'long' }))
  }, [])

  const embedUrl = `https://maps.google.com/maps?q=${business.geo.lat},${business.geo.lng}&z=16&output=embed`
  const mapsUrl  = `https://maps.google.com/?q=${business.geo.lat},${business.geo.lng}`

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: POST to serverless endpoint
    window.gtag?.('event','contact_submit',{})
    setSent(true)
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-2">
            {lang === 'hi' ? 'संपर्क करें' : 'Find Us'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-4">
            {lang === 'hi' ? 'भूखे आइए।' : 'Come Hungry.'}
          </h1>
          <div className="flex justify-center">
            <OpenNowBadge />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-surface rounded-card p-6 border border-white/10">
              <h2 className="text-cream font-semibold mb-3 flex items-center gap-2 font-display text-xl">
                📍 {lang === 'hi' ? 'पता' : 'Address'}
              </h2>
              <address className="not-italic text-muted leading-relaxed">
                {business.address.full}
              </address>
              <div className="flex gap-3 mt-4">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.gtag?.('event','directions_tap',{page:'contact'})}
                  className="flex items-center gap-2 bg-ember text-smoke font-bold rounded-pill px-5 py-2 text-sm glow-ember hover:scale-105 transition-transform"
                >
                  📍 {lang === 'hi' ? 'रास्ता दिखाएँ' : 'Get Directions'}
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="bg-surface rounded-card p-6 border border-white/10">
              <h2 className="text-cream font-semibold mb-4 font-display text-xl">
                📞 {lang === 'hi' ? 'संपर्क करें' : 'Contact'}
              </h2>
              <div className="space-y-3">
                <a
                  href={`tel:${business.contact.phone}`}
                  onClick={() => window.gtag?.('event','call_tap',{page:'contact'})}
                  className="flex items-center gap-3 text-cream hover:text-ember transition-colors"
                >
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="text-xs text-muted">{lang === 'hi' ? 'फ़ोन' : 'Phone'}</p>
                    <p className="font-medium">{business.contact.phone}</p>
                  </div>
                </a>
                <a
                  href={`https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent('Namaste Hotel Maharajaa! I would like to enquire about table reservation / food order.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-cream hover:text-veg transition-colors"
                >
                  <span className="text-xl">💬</span>
                  <div>
                    <p className="text-xs text-muted">WhatsApp</p>
                    <p className="font-medium">{business.contact.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${business.contact.email}`}
                  className="flex items-center gap-3 text-cream hover:text-ember transition-colors"
                >
                  <span className="text-xl">✉️</span>
                  <div>
                    <p className="text-xs text-muted">{lang === 'hi' ? 'ईमेल' : 'Email'}</p>
                    <p className="font-medium">{business.contact.email}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-surface rounded-card p-6 border border-white/10">
              <h2 className="text-cream font-semibold mb-4 font-display text-xl">
                🕐 {lang === 'hi' ? 'खुलने का समय' : 'Opening Hours'}
              </h2>
              <div className="space-y-2">
                {business.hours.map((h) => {
                  const isToday = todayName === h.day
                  return (
                    <div
                      key={h.day}
                      className={[
                        'flex justify-between py-1.5 border-b border-white/5 text-sm',
                        isToday ? 'text-cream font-semibold' : 'text-muted',
                      ].join(' ')}
                    >
                      <span className="flex items-center gap-2">
                        {isToday && <span className="w-1.5 h-1.5 rounded-full bg-veg flex-shrink-0" />}
                        {h.day}
                      </span>
                      <span>{h.closed ? (lang === 'hi' ? 'बंद' : 'Closed') : `${h.open} – ${h.close}`}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right — map + form */}
          <div className="space-y-8">
            {/* Map */}
            <div className="relative rounded-card overflow-hidden bg-raised border border-white/10 h-72">
              {mapLoaded ? (
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hotel Maharajaa on Google Maps"
                />
              ) : (
                <button
                  onClick={() => setMapLoaded(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-raised hover:bg-surface transition-colors w-full"
                >
                  <span className="text-5xl">🗺️</span>
                  <span className="text-muted text-sm">
                    {lang === 'hi' ? 'मानचित्र लोड करें' : 'Tap to load map'}
                  </span>
                </button>
              )}
            </div>

            {/* Short enquiry form */}
            <div className="bg-surface rounded-card p-6 border border-white/10">
              <h2 className="font-display text-xl text-cream mb-5">
                {lang === 'hi' ? 'संदेश भेजें' : 'Send a Message'}
              </h2>
              {sent ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-veg font-semibold">
                    {lang === 'hi' ? 'संदेश भेज दिया गया! जल्द ही संपर्क करेंगे।' : 'Message sent! We\'ll get back to you soon.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <input type="text" name="_hp" className="hidden" tabIndex={-1} aria-hidden="true" />

                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder={lang === 'hi' ? 'आपका नाम *' : 'Your Name *'}
                    className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream placeholder-muted focus:border-ember outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    required
                    pattern="[6-9]\d{9}"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder={lang === 'hi' ? 'फ़ोन नंबर *' : 'Phone Number *'}
                    className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream placeholder-muted focus:border-ember outline-none transition-colors"
                  />
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder={lang === 'hi' ? 'आपका संदेश *' : 'Your Message *'}
                    className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream placeholder-muted focus:border-ember outline-none transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-ember text-smoke font-bold rounded-pill py-3 text-sm glow-ember hover:scale-105 transition-transform"
                  >
                    {lang === 'hi' ? 'संदेश भेजें' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}
