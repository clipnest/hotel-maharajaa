'use client'

import { useState, useMemo, useCallback } from 'react'
import { useStore } from '@/lib/store'
import { menu, categories } from '@/lib/data/menu'
import { business } from '@/lib/data/business'
import { DishCard } from '@/components/menu/DishCard'
import { OrderTray } from '@/components/menu/OrderTray'

export default function MenuPage() {
  const { lang, diet, setTrayOpen } = useStore()
  const count = useStore(s => s.cartCount())

  const [search, setSearch]           = useState('')
  const [activeCat, setActiveCat]     = useState<string>('all')
  const [maxSpice, setMaxSpice]       = useState<number>(5)

  const filtered = useMemo(() => {
    return menu.filter(d => {
      if (diet === 'veg'    && d.diet !== 'veg')    return false
      if (diet === 'nonveg' && d.diet !== 'nonveg') return false
      if (activeCat !== 'all' && d.category !== activeCat) return false
      if (d.spice > maxSpice) return false
      if (search) {
        const q = search.toLowerCase()
        if (!d.nameEn.toLowerCase().includes(q) && !(d.nameHi?.includes(q))) return false
      }
      return true
    })
  }, [diet, activeCat, maxSpice, search])

  const reset = useCallback(() => {
    setSearch('')
    setActiveCat('all')
    setMaxSpice(5)
  }, [])

  return (
    <main className="min-h-screen pt-20">
      {/* Sticky menu header */}
      <div className="sticky top-16 z-30 bg-smoke/90 backdrop-blur border-b border-white/10">
        <div className="max-w-container mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">🔍</span>
              <input
                type="search"
                value={search}
                onChange={e => { setSearch(e.target.value); window.gtag?.('event','menu_search',{query: e.target.value}) }}
                placeholder={lang === 'hi' ? 'व्यंजन खोजें…' : 'Search dishes…'}
                className="w-full bg-surface border border-white/10 rounded-pill pl-9 pr-4 py-2 text-sm text-cream placeholder-muted focus:border-ember outline-none transition-colors"
                aria-label="Search menu items"
              />
            </div>

            {/* Spice filter */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-muted text-xs">{lang === 'hi' ? 'तीखापन' : 'Spice'}:</span>
              <input
                type="range" min={1} max={5} value={maxSpice}
                onChange={e => setMaxSpice(Number(e.target.value))}
                className="w-20 accent-ember"
                aria-label={`Maximum spice level: ${maxSpice}`}
              />
              <span className="text-ember text-xs w-5">{maxSpice}🌶️</span>
            </div>

            {/* Cart button */}
            {count > 0 && (
              <button
                onClick={() => { setTrayOpen(true); window.gtag?.('event','order_tray_open',{}) }}
                className="flex items-center gap-2 bg-veg text-smoke font-bold rounded-pill px-4 py-2 text-sm flex-shrink-0 shadow-glow-veg"
              >
                🛒 {count} · {lang === 'hi' ? 'ऑर्डर देखें' : 'View Order'}
              </button>
            )}
          </div>

          {/* Category rail */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => { setActiveCat('all'); window.gtag?.('event','menu_category_click',{cat:'all'}) }}
              className={[
                'flex-shrink-0 rounded-pill px-3 py-1 text-xs font-medium transition-all',
                activeCat === 'all'
                  ? 'bg-ember text-smoke'
                  : 'bg-surface border border-white/10 text-muted hover:text-cream',
              ].join(' ')}
            >
              {lang === 'hi' ? 'सभी' : 'All'}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCat(cat.id); window.gtag?.('event','menu_category_click',{cat: cat.id}) }}
                className={[
                  'flex-shrink-0 rounded-pill px-3 py-1 text-xs font-medium transition-all whitespace-nowrap',
                  activeCat === cat.id
                    ? 'bg-ember text-smoke'
                    : 'bg-surface border border-white/10 text-muted hover:text-cream',
                ].join(' ')}
              >
                {lang === 'hi' ? cat.labelHi : cat.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dish grid */}
      <div className="max-w-container mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl md:text-4xl text-cream">
            {lang === 'hi' ? 'महाराजा मेनू' : 'The Maharajaa Menu'}
          </h1>
          <span className="text-muted text-sm">
            {filtered.length} {lang === 'hi' ? 'व्यंजन' : 'dishes'}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🍽️</div>
            <p className="text-muted mb-4">
              {lang === 'hi' ? 'कोई व्यंजन मेल नहीं खाता।' : 'No dishes match your filters.'}
            </p>
            <button onClick={reset} className="text-ember text-sm hover:underline">
              {lang === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(dish => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}

        {/* Allergen note */}
        <div className="mt-12 p-4 bg-surface border border-white/10 rounded-card text-sm text-muted">
          ⚠️ {lang === 'hi'
            ? 'कृपया ऑर्डर करते समय किसी भी एलर्जी के बारे में बताएँ। FSSAI लाइसेंस नंबर: ' + business.fssai
            : `Please tell us about allergies when ordering. FSSAI Licence: ${business.fssai}`}
        </div>
      </div>

      {/* Order Tray (slide-up) */}
      <OrderTray />
    </main>
  )
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

