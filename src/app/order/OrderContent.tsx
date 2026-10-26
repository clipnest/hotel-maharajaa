'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { business } from '@/lib/data/business'
import { buildWhatsAppReservationMessage } from '@/lib/utils/whatsapp'

export function OrderContent() {
  const { lang } = useStore()
  const [showReserve, setShowReserve]   = useState(false)
  const [form, setForm]                  = useState({ name: '', phone: '', date: '', time: '19:00', guests: 2, note: '' })
  const [errors, setErrors]              = useState<Record<string,string>>({})
  const [todayStr, setTodayStr]          = useState('')

  useEffect(() => {
    setTodayStr(new Date().toISOString().split('T')[0])
  }, [])

  function validate() {
    const e: Record<string,string> = {}
    if (!form.name.trim())                      e.name = 'Name is required'
    if (!/^[6-9]\d{9}$/.test(form.phone))      e.phone = 'Enter a valid 10-digit mobile number'
    if (!form.date)                             e.date = 'Please select a date'
    else if (new Date(form.date) < new Date())  e.date = 'Date cannot be in the past'
    if (form.guests < 1 || form.guests > 30)    e.guests = 'Guests must be between 1 and 30'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleReserve(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const url = buildWhatsAppReservationMessage(form)
    window.gtag?.('event','reserve_submit',{ guests: form.guests, date: form.date })
    window.open(url, '_blank', 'noopener,noreferrer')
  }


  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-2">
            {lang === 'hi' ? 'ऑर्डर और बुकिंग' : 'Order & Reserve'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-3">
            {lang === 'hi' ? 'भूखे हैं? 3 टैप में ऑर्डर करें।' : 'Hungry? Order in 3 Taps.'}
          </h1>
        </div>

        {/* Three action cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Order Food */}
          <Link
            href="/menu"
            onClick={() => window.gtag?.('event','order_card_click',{card:'menu'})}
            className="group bg-surface rounded-card p-8 border border-ember/30 hover:border-ember hover:shadow-glow-ember transition-all duration-300 text-center"
          >
            <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">🍛</div>
            <h2 className="font-display text-2xl text-cream mb-2">
              {lang === 'hi' ? 'खाना ऑर्डर करें' : 'Order Food'}
            </h2>
            <p className="text-muted text-sm mb-6">
              {lang === 'hi' ? 'मेनू ब्राउज़ करें और WhatsApp पर ऑर्डर करें।' : 'Browse the menu and send your order on WhatsApp.'}
            </p>
            <span className="inline-flex items-center gap-2 bg-ember text-smoke font-bold rounded-pill px-6 py-2.5 text-sm group-hover:scale-105 transition-transform">
              {lang === 'hi' ? 'मेनू देखें →' : 'Browse Menu →'}
            </span>
          </Link>

          {/* Reserve a table */}
          <button
            onClick={() => setShowReserve(true)}
            className="group bg-surface rounded-card p-8 border border-turmeric/30 hover:border-turmeric hover:shadow-glow-turmeric transition-all duration-300 text-center w-full"
          >
            <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">📅</div>
            <h2 className="font-display text-2xl text-cream mb-2">
              {lang === 'hi' ? 'टेबल बुक करें' : 'Reserve a Table'}
            </h2>
            <p className="text-muted text-sm mb-6">
              {lang === 'hi' ? 'अपनी सीट पहले से बुक करें, WhatsApp से।' : 'Book your seat in advance via WhatsApp.'}
            </p>
            <span className="inline-flex items-center gap-2 border border-turmeric text-turmeric font-bold rounded-pill px-6 py-2.5 text-sm group-hover:bg-turmeric/10 transition-all">
              {lang === 'hi' ? 'अभी बुक करें →' : 'Reserve Now →'}
            </span>
          </button>

          {/* Call us */}
          <a
            href={`tel:${business.contact.phone}`}
            onClick={() => window.gtag?.('event','call_tap',{page:'order'})}
            className="group bg-surface rounded-card p-8 border border-veg/30 hover:border-veg hover:shadow-glow-veg transition-all duration-300 text-center"
          >
            <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">📞</div>
            <h2 className="font-display text-2xl text-cream mb-2">
              {lang === 'hi' ? 'कॉल करें' : 'Call Us'}
            </h2>
            <p className="text-muted text-sm mb-6">
              {lang === 'hi' ? 'सीधे हमसे बात करें।' : 'Talk to us directly.'}
            </p>
            <span className="inline-flex items-center gap-2 border border-veg text-veg font-bold rounded-pill px-6 py-2.5 text-sm group-hover:bg-veg/10 transition-all">
              {business.contact.phone}
            </span>
          </a>
        </div>

        {/* Reservation form modal */}
        {showReserve && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
            <div className="absolute inset-0 bg-smoke/80 backdrop-blur" onClick={() => setShowReserve(false)} />
            <div className="relative z-10 w-full max-w-lg glass rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-cream">
                  {lang === 'hi' ? 'टेबल बुक करें' : 'Reserve a Table'}
                </h2>
                <button onClick={() => setShowReserve(false)} className="text-muted hover:text-cream text-xl" aria-label="Close">✕</button>
              </div>

              <form onSubmit={handleReserve} className="space-y-4" noValidate>
                {/* Honeypot */}
                <input type="text" name="_hp" className="hidden" tabIndex={-1} aria-hidden="true" />

                <div>
                  <input
                    type="text" required value={form.name}
                    onChange={e => setForm(f => ({...f, name: e.target.value}))}
                    placeholder={lang === 'hi' ? 'आपका नाम *' : 'Your Name *'}
                    className={`w-full bg-raised border rounded-card px-4 py-3 text-sm text-cream placeholder-muted outline-none transition-colors ${errors.name ? 'border-nonveg' : 'border-white/10 focus:border-ember'}`}
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined}
                  />
                  {errors.name && <p id="name-err" className="text-nonveg text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="tel" required value={form.phone}
                    onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                    placeholder={lang === 'hi' ? 'फ़ोन नंबर *' : 'Phone Number *'}
                    className={`w-full bg-raised border rounded-card px-4 py-3 text-sm text-cream placeholder-muted outline-none transition-colors ${errors.phone ? 'border-nonveg' : 'border-white/10 focus:border-ember'}`}
                    aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-err' : undefined}
                  />
                  {errors.phone && <p id="phone-err" className="text-nonveg text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date" required value={form.date} min={todayStr}
                      onChange={e => setForm(f => ({...f, date: e.target.value}))}
                      className={`w-full bg-raised border rounded-card px-4 py-3 text-sm text-cream outline-none transition-colors ${errors.date ? 'border-nonveg' : 'border-white/10 focus:border-ember'}`}
                      aria-label="Reservation date"
                    />
                    {errors.date && <p className="text-nonveg text-xs mt-1">{errors.date}</p>}
                  </div>
                  <input
                    type="time" value={form.time}
                    onChange={e => setForm(f => ({...f, time: e.target.value}))}
                    className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream outline-none focus:border-ember transition-colors"
                    aria-label="Preferred time"
                  />
                </div>

                <div>
                  <input
                    type="number" required min={1} max={30} value={form.guests}
                    onChange={e => setForm(f => ({...f, guests: Number(e.target.value)}))}
                    placeholder={lang === 'hi' ? 'मेहमानों की संख्या *' : 'Number of Guests *'}
                    className={`w-full bg-raised border rounded-card px-4 py-3 text-sm text-cream placeholder-muted outline-none transition-colors ${errors.guests ? 'border-nonveg' : 'border-white/10 focus:border-ember'}`}
                  />
                  {errors.guests && <p className="text-nonveg text-xs mt-1">{errors.guests}</p>}
                </div>

                <textarea
                  rows={2} value={form.note}
                  onChange={e => setForm(f => ({...f, note: e.target.value}))}
                  placeholder={lang === 'hi' ? 'विशेष अनुरोध (वैकल्पिक)' : 'Special requests (optional)'}
                  className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream placeholder-muted outline-none focus:border-ember transition-colors resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-veg text-smoke font-bold rounded-pill py-3 text-sm flex items-center justify-center gap-2 shadow-glow-veg hover:scale-105 transition-transform"
                >
                  💬 {lang === 'hi' ? 'WhatsApp से बुक करें' : 'Reserve via WhatsApp'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Zomato / Swiggy */}
        {(business.social.zomato || business.social.swiggy) && (
          <div className="text-center mb-12">
            <p className="text-muted text-sm mb-4">{lang === 'hi' ? 'या इस पर ऑर्डर करें:' : 'Also available on:'}</p>
            <div className="flex justify-center gap-4">
              {business.social.zomato && (
                <a href={business.social.zomato} target="_blank" rel="noopener noreferrer"
                   className="px-6 py-2 bg-surface border border-white/10 rounded-pill text-sm text-cream hover:border-ember transition-colors">
                  Zomato
                </a>
              )}
              {business.social.swiggy && (
                <a href={business.social.swiggy} target="_blank" rel="noopener noreferrer"
                   className="px-6 py-2 bg-surface border border-white/10 rounded-pill text-sm text-cream hover:border-ember transition-colors">
                  Swiggy
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}
