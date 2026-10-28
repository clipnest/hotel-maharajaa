'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { business } from '@/lib/data/business'
import { asset } from '@/lib/utils/asset'
import { OpenNowBadge } from '@/components/ui/OpenNowBadge'

export function VisitUs() {
  const { lang } = useStore()
  const [mapLoaded, setMapLoaded] = useState(false)
  const [todayName, setTodayName] = useState('')

  useEffect(() => {
    setTodayName(new Date().toLocaleString('en-US', { weekday: 'long' }))
  }, [])

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Hotel Maharajaa veg & non veg Sinnar Nashik')}`
  const embedUrl = `https://maps.google.com/maps?q=${business.geo.lat},${business.geo.lng}&z=16&output=embed`

  return (
    <section className="py-20" aria-label="Location and hours">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-2">
            {lang === 'hi' ? 'गुरेवाडी फाटा, सिन्नर' : 'Gurewadi Phata, Sinnar'}
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-cream">
            {lang === 'hi' ? 'भूखे आइए, तृप्त होकर जाइए।' : 'Come Hungry. Leave Satisfied.'}
          </h2>
          <p className="text-muted mt-2">
            {lang === 'hi' ? 'नाशिक-पुणे महामार्गावर सहज उपलब्ध' : 'Conveniently located right on the Nashik-Pune Highway.'}
          </p>
        </div>

        {/* Real photo showcase banner */}
        <div className="mb-10 rounded-2xl overflow-hidden border border-white/10 relative h-64 sm:h-80 shadow-xl">
          <img
            src={asset('/images/restaurant/img_01.jpg')}
            alt="Hotel Maharajaa Restaurant Night View"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              {lang === 'hi' ? 'महामार्ग प्रवेशद्वार' : 'Highway Frontage & Parking'}
            </span>
            <h3 className="font-display text-xl sm:text-2xl text-cream font-bold">
              {business.name}
            </h3>
            <p className="text-sm text-white/80 max-w-xl mt-1">
              {business.address.street}, {business.address.locality}, {business.address.city}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <OpenNowBadge />
            </div>

            {/* Address */}
            <div>
              <h3 className="text-cream font-semibold mb-1 flex items-center gap-2">
                📍 {lang === 'hi' ? 'पत्ता' : 'Address'}
              </h3>
              <address className="not-italic text-muted text-sm leading-relaxed">
                {business.address.full}
              </address>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-cream font-semibold mb-2 flex items-center gap-2">
                🕐 {lang === 'hi' ? 'वेळ' : 'Hours'}
              </h3>
              <div className="space-y-1">
                {business.hours.map((h) => {
                  const isToday = todayName === h.day
                  return (
                    <div
                      key={h.day}
                      className={[
                        'flex justify-between text-sm',
                        isToday ? 'text-cream font-medium' : 'text-muted',
                      ].join(' ')}
                    >
                      <span>{h.day.slice(0, 3)}</span>
                      <span>{h.closed ? (lang === 'hi' ? 'बंद' : 'Closed') : `${h.open} – ${h.close}`}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="space-y-2">
              <div>
                <h3 className="text-cream font-semibold mb-1">📞 {lang === 'hi' ? 'थेट संपर्क' : 'Phone / Calling'}</h3>
                <a href={`tel:${business.contact.phone}`} className="text-ember hover:underline font-semibold text-lg">
                  {business.contact.phone}
                </a>
              </div>
              <div>
                <h3 className="text-cream font-semibold mb-1">💬 {lang === 'hi' ? 'व्हॉट्सॲप ऑर्डर व चौकशी' : 'WhatsApp Orders'}</h3>
                <a
                  href={`https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent('Namaste Hotel Maharajaa! I would like to inquire about table booking / food ordering.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-veg hover:underline font-semibold text-base inline-flex items-center gap-1.5"
                >
                  <span>Chat on WhatsApp ({business.contact.phone})</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-ember text-smoke font-bold rounded-pill px-5 py-2.5 text-sm glow-ember hover:scale-105 transition-transform"
                onClick={() => window.gtag?.('event', 'directions_tap', { page: 'home' })}
              >
                📍 {lang === 'hi' ? 'गुगल मॅप्सवर दिशा पहा' : 'Get Directions on Google Maps'}
              </a>
              <a
                href={`tel:${business.contact.phone}`}
                className="flex items-center gap-2 border border-cream/30 text-cream rounded-pill px-5 py-2.5 text-sm hover:border-ember hover:text-ember transition-all"
                onClick={() => window.gtag?.('event', 'call_tap', { page: 'home' })}
              >
                📞 {lang === 'hi' ? 'कॉल करा' : 'Call Directly'}
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="relative rounded-card overflow-hidden bg-raised border border-white/10 h-80 sm:h-96">
            {mapLoaded ? (
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Maharajaa location on Google Maps"
              />
            ) : (
              <button
                onClick={() => setMapLoaded(true)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-raised hover:bg-surface transition-colors cursor-pointer group"
                aria-label="Load interactive map"
              >
                <span className="text-5xl group-hover:scale-110 transition-transform">🗺️</span>
                <span className="text-cream font-medium text-sm">
                  {lang === 'hi' ? 'नकाशा लोड करा (Google Maps)' : 'Tap to load interactive map'}
                </span>
                <span className="text-ember text-xs underline font-semibold">
                  {lang === 'hi' ? 'थेट Google Maps उघडा' : 'Click to view location'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
