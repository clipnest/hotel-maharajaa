'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { business } from '@/lib/data/business'

const FAQ_GROUPS: {
  group: string
  groupHi: string
  items: { q: string; qHi: string; a: string; aHi: string }[]
}[] = [
  {
    group: 'Timings',
    groupHi: 'समय',
    items: [
      {
        q: 'What are your opening hours?',
        qHi: 'खुलने का समय क्या है?',
        a: 'We are open 7 days a week. Please check the Contact page for the full schedule, as hours may vary on festivals.',
        aHi: 'हम सप्ताह में 7 दिन खुले रहते हैं। पूरे शेड्यूल के लिए संपर्क पृष्ठ देखें।',
      },
      {
        q: 'Are you open late at night?',
        qHi: 'क्या आप देर रात तक खुले रहते हैं?',
        a: 'Yes, we serve until late most nights. The exact closing time is shown on the website and updated live on our Google Business Profile.',
        aHi: 'हाँ, हम अधिकांश रातों में देर तक परोसते हैं।',
      },
    ],
  },
  {
    group: 'Veg & Non-Veg',
    groupHi: 'वेज और नॉन-वेज',
    items: [
      {
        q: 'Is the veg food prepared separately from non-veg?',
        qHi: 'क्या वेज खाना नॉन-वेज से अलग बनाया जाता है?',
        a: 'Yes, we take great care to prepare and serve vegetarian and non-vegetarian food separately. If you have specific concerns, please let us know when ordering.',
        aHi: 'हाँ, हम वेज और नॉन-वेज खाने को अलग-अलग बनाते हैं।',
      },
      {
        q: 'How are veg dishes marked on the menu?',
        qHi: 'मेनू पर वेज व्यंजन कैसे चिह्नित हैं?',
        a: 'All dishes are marked with a green dot (veg) or red dot (non-veg) following the FSSAI standard, both on our website and in the restaurant.',
        aHi: 'सभी व्यंजन FSSAI मानक के अनुसार हरे बिंदु (वेज) या लाल बिंदु (नॉन-वेज) से चिह्नित हैं।',
      },
    ],
  },
  {
    group: 'Ordering & Delivery',
    groupHi: 'ऑर्डर और डिलीवरी',
    items: [
      {
        q: 'How do I place an order?',
        qHi: 'ऑर्डर कैसे करें?',
        a: 'Use the website Menu page to build your order, then tap "Send Order on WhatsApp". We will confirm your order by reply. You can also call us directly.',
        aHi: 'वेबसाइट के मेनू पृष्ठ पर अपना ऑर्डर बनाएँ, फिर "WhatsApp पर ऑर्डर भेजें" पर टैप करें।',
      },
      {
        q: 'Do you offer home delivery?',
        qHi: 'क्या आप होम डिलीवरी देते हैं?',
        a: 'Please call or WhatsApp us to check current delivery availability and radius. Dine-in and pickup are always available.',
        aHi: 'वर्तमान डिलीवरी उपलब्धता जानने के लिए कॉल या WhatsApp करें।',
      },
      {
        q: 'Can I order online and pay?',
        qHi: 'क्या मैं ऑनलाइन ऑर्डर करके भुगतान कर सकता हूँ?',
        a: 'Currently we accept orders via WhatsApp and payment is made at the restaurant or on delivery. Online payment is not yet available.',
        aHi: 'वर्तमान में ऑनलाइन भुगतान उपलब्ध नहीं है। भुगतान रेस्तराँ में या डिलीवरी पर होता है।',
      },
    ],
  },
  {
    group: 'Reservations',
    groupHi: 'आरक्षण',
    items: [
      {
        q: 'Can I reserve a table?',
        qHi: 'क्या मैं टेबल बुक कर सकता हूँ?',
        a: 'Yes, you can reserve a table via the Order & Reserve page on this website, or by calling us. We recommend reservations for groups of 6+.',
        aHi: 'हाँ, वेबसाइट के ऑर्डर पृष्ठ से या कॉल करके टेबल बुक कर सकते हैं।',
      },
    ],
  },
  {
    group: 'Catering',
    groupHi: 'कैटरिंग',
    items: [
      {
        q: 'Do you offer catering for parties and events?',
        qHi: 'क्या आप पार्टियों के लिए कैटरिंग देते हैं?',
        a: 'Yes! We cater for birthdays, corporate events, family functions and more. Visit the Catering page or call us to get a quote.',
        aHi: 'हाँ! जन्मदिन, कॉर्पोरेट इवेंट, पारिवारिक समारोह — सभी के लिए कैटरिंग उपलब्ध है।',
      },
    ],
  },
  {
    group: 'Parking',
    groupHi: 'पार्किंग',
    items: [
      {
        q: 'Is parking available?',
        qHi: 'क्या पार्किंग उपलब्ध है?',
        a: 'Please ask us directly or see the Contact page for parking details specific to our location.',
        aHi: 'पार्किंग की जानकारी के लिए सीधे पूछें या संपर्क पृष्ठ देखें।',
      },
    ],
  },
]

export function FAQContent() {
  const { lang } = useStore()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-2">FAQ</p>
          <h1 className="font-display text-4xl text-cream">
            {lang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल' : 'Frequently Asked Questions'}
          </h1>
        </div>

        <div className="space-y-6">
          {FAQ_GROUPS.map((group) => (
            <div key={group.group}>
              <h2 className="text-ember text-sm font-semibold uppercase tracking-widest mb-3">
                {lang === 'hi' ? group.groupHi : group.group}
              </h2>
              <div className="space-y-2">
                {group.items.map((item, i) => {
                  const id = `${group.group}-${i}`
                  const isOpen = open === id
                  return (
                    <div key={id} className="bg-surface rounded-card border border-white/10 overflow-hidden">
                      <button
                        onClick={() => {
                          setOpen(isOpen ? null : id)
                          window.gtag?.('event','faq_open',{question_id: id})
                        }}
                        className="w-full flex items-center justify-between px-5 py-4 text-left text-cream font-medium hover:text-ember transition-colors"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${id}`}
                      >
                        <span className="text-sm">{lang === 'hi' ? item.qHi : item.q}</span>
                        <span className={`text-ember transition-transform duration-300 ml-4 flex-shrink-0 ${isOpen ? 'rotate-45' : ''}`}>
                          +
                        </span>
                      </button>
                      {isOpen && (
                        <div id={`faq-panel-${id}`} className="px-5 pb-5 text-muted text-sm leading-relaxed">
                          {lang === 'hi' ? item.aHi : item.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center bg-surface rounded-card p-8 border border-white/10">
          <p className="text-cream font-semibold mb-4">
            {lang === 'hi' ? 'और सवाल हैं?' : 'Still have questions?'}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={`tel:${business.contact.phone}`}
              className="flex items-center gap-2 border border-cream/30 text-cream rounded-pill px-5 py-2 text-sm hover:border-ember hover:text-ember transition-all"
            >
              📞 {lang === 'hi' ? 'कॉल करें' : 'Call us'}
            </a>
            <a
              href={`https://wa.me/${business.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-veg/20 border border-veg/40 text-veg rounded-pill px-5 py-2 text-sm hover:bg-veg/30 transition-all"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}
