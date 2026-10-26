'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { business } from '@/lib/data/business'

const EVENT_TYPES = ['Birthday Party','Corporate Lunch/Dinner','Wedding Function','Anniversary','Other']

export function CateringContent() {
  const { lang } = useStore()
  const [vegSplit, setVegSplit] = useState(50)  // % veg
  const [todayStr, setTodayStr] = useState('')
  const [form, setForm] = useState({
    name: '', phone: '', eventType: '', date: '', guests: '', area: '', note: '', _hp: ''
  })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setTodayStr(new Date().toISOString().split('T')[0])
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form._hp) return  // bot
    if (!form.name || !form.phone || !form.guests) {
      setError(lang === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill all required fields.')
      return
    }
    // TODO: POST to serverless endpoint
    window.gtag?.('event','catering_enquiry',{ guests: form.guests, event_type: form.eventType })
    setSent(true)
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="relative text-center py-20 mb-16 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-ember/10 to-smoke" />
          <div className="relative z-10">
            <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-3">
              {lang === 'hi' ? 'कैटरिंग और इवेंट्स' : 'Catering & Events'}
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-cream mb-4">
              {lang === 'hi' ? 'पार्टी का पूरा स्वाद' : 'Party Ka Poora Swaad'}
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {lang === 'hi'
                ? 'बड़ी टेबल। और भी बड़ा स्वाद। हम पकाएँ, आप जश्न मनाएँ।'
                : 'Big Table. Bigger Flavour. We cook, you celebrate.'}
            </p>
          </div>
        </div>

        {/* Packages */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: '🥘', title: lang === 'hi' ? 'वेज पार्टी' : 'Veg Party', desc: lang === 'hi' ? 'पनीर, दाल, सब्जी, रोटी — सब शामिल' : 'Paneer, dal, sabzi, roti — all included' },
            { icon: '🍗', title: lang === 'hi' ? 'नॉन-वेज पार्टी' : 'Non-Veg Party', desc: lang === 'hi' ? 'चिकन, मटन, तंदूरी — पूरी दावत' : 'Chicken, mutton, tandoori — the full feast' },
            { icon: '🎉', title: lang === 'hi' ? 'मिक्स पार्टी' : 'Mixed Party', desc: lang === 'hi' ? 'वेज और नॉन-वेज दोनों — हर कोई खुश' : 'Veg and non-veg — everyone\'s happy' },
          ].map(pkg => (
            <div key={pkg.title} className="bg-surface rounded-card p-8 text-center border border-white/10 hover:border-ember/30 hover:shadow-glow-ember transition-all">
              <div className="text-5xl mb-4">{pkg.icon}</div>
              <h2 className="font-display text-xl text-cream mb-2">{pkg.title}</h2>
              <p className="text-muted text-sm mb-4">{pkg.desc}</p>
              <p className="text-ember text-xs">{lang === 'hi' ? 'कोटेशन के लिए नीचे फॉर्म भरें' : 'Fill the form below for a quote'}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl text-cream mb-8">
            {lang === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', en: 'Fill the quote form below with your event details.', hi: 'नीचे फॉर्म में अपनी इवेंट जानकारी भरें।' },
              { step: '02', en: 'We call you within a few hours to discuss the menu and confirm pricing.', hi: 'हम कुछ घंटों में कॉल करके मेनू और कीमत पर चर्चा करते हैं।' },
              { step: '03', en: 'On the day, we arrive and serve everything fresh and hot.', hi: 'इवेंट के दिन हम पहुँचते हैं और सब ताज़ा-गरम परोसते हैं।' },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-ember/20 border border-ember/40 flex items-center justify-center text-ember font-bold text-sm mb-4">
                  {s.step}
                </div>
                <p className="text-muted text-sm">{lang === 'hi' ? s.hi : s.en}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl text-cream text-center mb-8">
            {lang === 'hi' ? 'कोटेशन लें' : 'Get a Quote'}
          </h2>

          {sent ? (
            <div className="text-center bg-surface rounded-card p-12 border border-veg/30">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-cream font-display text-2xl mb-2">
                {lang === 'hi' ? 'आपकी जानकारी मिली!' : 'Enquiry Received!'}
              </h3>
              <p className="text-muted">
                {lang === 'hi' ? 'हम जल्द ही संपर्क करेंगे।' : 'We\'ll get back to you within a few hours.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-surface rounded-card p-8 border border-white/10 space-y-5">
              {/* Honeypot */}
              <input type="text" name="_hp" value={form._hp} onChange={e => setForm(f=>({...f,_hp:e.target.value}))} className="hidden" tabIndex={-1} aria-hidden="true" />

              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                  placeholder={lang==='hi'?'आपका नाम *':'Your Name *'}
                  className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream placeholder-muted focus:border-ember outline-none transition-colors" />
                <input type="tel" required pattern="[6-9]\d{9}" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}
                  placeholder={lang==='hi'?'फ़ोन नंबर *':'Phone Number *'}
                  className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream placeholder-muted focus:border-ember outline-none transition-colors" />
              </div>

              <select value={form.eventType} onChange={e=>setForm(f=>({...f,eventType:e.target.value}))}
                className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream focus:border-ember outline-none transition-colors">
                <option value="">{lang==='hi'?'इवेंट का प्रकार':'Event Type'}</option>
                {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <div className="grid sm:grid-cols-2 gap-4">
                <input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}
                  min={todayStr}
                  className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream focus:border-ember outline-none transition-colors"
                  aria-label={lang==='hi'?'इवेंट की तारीख':'Event date'} />
                <input type="number" required min={10} value={form.guests} onChange={e=>setForm(f=>({...f,guests:e.target.value}))}
                  placeholder={lang==='hi'?'मेहमानों की संख्या *':'Number of Guests *'}
                  className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream placeholder-muted focus:border-ember outline-none transition-colors" />
              </div>

              {/* Veg/Non-Veg split slider */}
              <div>
                <label className="block text-muted text-sm mb-2">
                  {lang==='hi'?`वेज/नॉन-वेज अनुपात: ${vegSplit}% वेज, ${100-vegSplit}% नॉन-वेज`:`Veg/Non-Veg split: ${vegSplit}% Veg, ${100-vegSplit}% Non-Veg`}
                </label>
                <input type="range" min={0} max={100} value={vegSplit} onChange={e=>{setVegSplit(Number(e.target.value));window.gtag?.('event','catering_split_use',{value:e.target.value})}}
                  className="w-full accent-ember"
                  aria-label={`Veg/Non-veg split: ${vegSplit}% veg`} />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>🥦 {lang==='hi'?'100% वेज':'100% Veg'}</span>
                  <span>{lang==='hi'?'100% नॉन-वेज':'100% Non-Veg'} 🍗</span>
                </div>
              </div>

              <input type="text" value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))}
                placeholder={lang==='hi'?'इवेंट का स्थान / एरिया':'Event Area / Location'}
                className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream placeholder-muted focus:border-ember outline-none transition-colors" />

              <textarea rows={3} value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))}
                placeholder={lang==='hi'?'अतिरिक्त नोट…':'Additional notes…'}
                className="w-full bg-raised border border-white/10 rounded-card px-4 py-3 text-sm text-cream placeholder-muted focus:border-ember outline-none transition-colors resize-none" />

              {error && <p className="text-nonveg text-sm" role="alert">{error}</p>}

              <button type="submit"
                className="w-full bg-ember text-smoke font-bold rounded-pill py-3.5 text-sm glow-ember hover:scale-105 transition-transform">
                {lang==='hi'?'कोटेशन लें →':'Get a Quote →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}
