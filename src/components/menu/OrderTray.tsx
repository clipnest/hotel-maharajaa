'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { buildWhatsAppOrderMessage } from '@/lib/utils/whatsapp'

export function OrderTray() {
  const {
    lang, cart, setQty, removeItem, clearCart,
    orderMeta, setOrderMeta, trayOpen, setTrayOpen,
    cartTotal, cartCount,
  } = useStore()

  const total = cartTotal()
  const count = cartCount()
  const [copied, setCopied] = useState(false)

  const waUrl = buildWhatsAppOrderMessage(cart, orderMeta, lang)

  function handleSend() {
    window.gtag?.('event','whatsapp_order',{ item_count: count, order_value: total })
    if (waUrl) window.open(waUrl, '_blank', 'noopener,noreferrer')
    else {
      // Fallback: copy order text
      handleCopy()
    }
  }

  function handleCopy() {
    const text = cart.map(i => `${i.name} x${i.qty} — ₹${i.price * i.qty}`).join('\n')
      + `\nTotal: ₹${total}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (!trayOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-smoke/70 backdrop-blur-sm"
        onClick={() => setTrayOpen(false)}
        aria-hidden="true"
      />

      {/* Tray */}
      <div
        role="dialog"
        aria-label={lang === 'hi' ? 'आपका ऑर्डर' : 'Your Order'}
        aria-modal="true"
        className="fixed bottom-0 left-0 right-0 z-50 md:right-0 md:left-auto md:top-0 md:bottom-0 md:w-96 glass border-t md:border-t-0 md:border-l border-white/10 flex flex-col max-h-[85vh] md:max-h-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="font-display text-xl text-cream">
            🛒 {lang === 'hi' ? 'आपका ऑर्डर' : 'Your Order'}
          </h2>
          <button
            onClick={() => setTrayOpen(false)}
            aria-label="Close order tray"
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-cream"
          >✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-10 text-muted">
              <div className="text-4xl mb-3">🍽️</div>
              <p className="text-sm">
                {lang === 'hi' ? 'अभी कुछ नहीं है। कुछ डिश जोड़ें!' : 'Nothing here yet. Add some dishes!'}
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <span className={[
                  'w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5',
                  item.diet === 'veg' ? 'bg-veg' : 'bg-nonveg',
                ].join(' ')} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-cream text-sm font-medium truncate">
                    {lang === 'hi' && item.nameHi ? item.nameHi : item.name}
                  </p>
                  <p className="text-muted text-xs">₹{item.price} each</p>
                </div>
                {/* Qty stepper */}
                <div className="flex items-center gap-1 border border-white/10 rounded-pill overflow-hidden">
                  <button
                    onClick={() => setQty(item.id, item.qty - 1)}
                    className="w-7 h-7 text-muted hover:text-cream flex items-center justify-center text-sm"
                    aria-label={`Decrease ${item.name} quantity`}
                  >−</button>
                  <span className="text-cream text-sm font-semibold w-5 text-center">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.id, item.qty + 1)}
                    className="w-7 h-7 text-muted hover:text-cream flex items-center justify-center text-sm"
                    aria-label={`Increase ${item.name} quantity`}
                  >+</button>
                </div>
                <span className="text-cream text-sm font-bold w-16 text-right">
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer (form + send) */}
        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-white/10 space-y-4">
            {/* Name */}
            <input
              type="text"
              value={orderMeta.name}
              onChange={e => setOrderMeta({ name: e.target.value })}
              placeholder={lang === 'hi' ? 'आपका नाम' : 'Your name'}
              className="w-full bg-raised border border-white/10 rounded-card px-4 py-2.5 text-sm text-cream placeholder-muted focus:border-ember outline-none transition-colors"
            />

            {/* Order type */}
            <div className="flex gap-2">
              {(['Dine-in','Pickup'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setOrderMeta({ type })}
                  className={[
                    'flex-1 rounded-pill py-2 text-sm font-medium border transition-all',
                    orderMeta.type === type
                      ? 'bg-ember border-ember text-smoke'
                      : 'bg-surface border-white/10 text-muted hover:text-cream',
                  ].join(' ')}
                >
                  {type === 'Dine-in'
                    ? (lang === 'hi' ? 'डाइन-इन' : 'Dine-in')
                    : (lang === 'hi' ? 'पिकअप' : 'Pickup')}
                </button>
              ))}
            </div>

            {/* Note */}
            <textarea
              value={orderMeta.note}
              onChange={e => setOrderMeta({ note: e.target.value })}
              placeholder={lang === 'hi' ? 'कोई विशेष निर्देश…' : 'Any special instructions…'}
              rows={2}
              className="w-full bg-raised border border-white/10 rounded-card px-4 py-2.5 text-sm text-cream placeholder-muted focus:border-ember outline-none transition-colors resize-none"
            />

            {/* Total */}
            <div className="flex justify-between text-cream font-bold text-lg">
              <span>{lang === 'hi' ? 'कुल' : 'Total'}</span>
              <span>₹{total}</span>
            </div>

            {/* Send */}
            <button
              onClick={handleSend}
              className="w-full bg-veg text-smoke font-bold rounded-pill py-3 text-sm flex items-center justify-center gap-2 shadow-glow-veg hover:scale-105 transition-transform"
            >
              💬 {lang === 'hi' ? 'WhatsApp पर ऑर्डर भेजें' : 'Send Order on WhatsApp'}
            </button>

            {/* Copy fallback */}
            <button
              onClick={handleCopy}
              className="w-full text-muted text-xs hover:text-cream text-center transition-colors"
            >
              {copied ? '✓ Copied!' : (lang === 'hi' ? 'ऑर्डर टेक्स्ट कॉपी करें' : 'Copy order text')}
            </button>

            {/* Clear */}
            <button
              onClick={clearCart}
              className="w-full text-muted text-xs hover:text-nonveg text-center transition-colors"
            >
              {lang === 'hi' ? 'ऑर्डर साफ़ करें' : 'Clear order'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}
