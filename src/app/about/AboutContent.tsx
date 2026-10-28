'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'
import { asset } from '@/lib/utils/asset'
import { useScrollReveal } from '@/lib/utils/useScrollReveal'

const CHAPTERS = [
  {
    icon: '🔥',
    en: {
      title: 'Highway Tradition',
      body: 'Located at Gurewadi Phata along the Nashik-Pune Highway in Sinnar, Hotel Maharajaa brings honest, authentic dhaba taste to families and road travellers. Cooked fresh, served steaming hot.',
    },
    hi: {
      title: 'हायवेची अस्सल चव',
      body: 'सिन्नरमधील नाशिक-पुणे हायवेवर गुरेवाडी फाटा येथे वसलेले हॉटेल महाराजा - अस्सल गावरान आणि ढाबा चवीसाठी ओळखले जाते. ताजे घटक, आगीवर शिजवलेले गरमागरम जेवण.',
    },
  },
  {
    icon: '🍛',
    en: {
      title: 'Two Parallel Kitchens',
      body: 'We respect every diner’s choice. Vegetarian paneer handis and veg thalis are prepared with strict separation from our renowned Kala Masala non-veg chicken and fresh seafood specials.',
    },
    hi: {
      title: 'स्वतंत्र स्वयंपाकघर',
      body: 'शाकाहारी आणि मांसाहारी दोन्ही खवय्यांची काळजी घेतली जाते. व्हेज पनीर हांडी व दाल तडका पूर्णपणे स्वतंत्र जागेत आणि काळा मसाला चिकन, मटण व सीफूड स्वतंत्र कढईत तयार होते.',
    },
  },
  {
    icon: '👨‍👩‍👧‍👦',
    en: {
      title: 'Warm Family Atmosphere',
      body: 'Our air-cooled, spacious family dining hall welcomes road travellers, weekend family outings, and local gathering feasts with prompt service and genuine hospitality.',
    },
    hi: {
      title: 'फॅमिलीसाठी उत्तम वातावरण',
      body: 'स्वच्छ, प्रशस्त आणि हवेशीर डायनिंग हॉलमध्ये कुटुंबासह आनंद घ्या. नाशिक-पुणे महामार्गावरील प्रवाशांसाठी एक विश्वासार्ह आणि समाधानकारक थांबा.',
    },
  },
]

const PROMISES = [
  { en: 'Fresh local ingredients sourced every morning', hi: 'दररोज सकाळी आणलेली ताजी भाजी आणि मसाले' },
  { en: 'Strict separate handling for veg and non-veg dishes', hi: 'शाकाहारी व मांसाहारी अन्नाची पूर्ण स्वतंत्र व्यवस्था' },
  { en: 'Generous thali portions with unlimited rassa', hi: 'भरपेट थाळी आणि गरमागरम चवदार रस्सा' },
  { en: 'Hand-patted Bhakris & piping hot tandoori rotis', hi: 'हाताने थापलेली गरमागरम भाकरी आणि तंदूर रोटी' },
]

export function AboutContent() {
  const { lang } = useStore()
  const ref1 = useScrollReveal()
  const ref2 = useScrollReveal()

  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Cinematic intro */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-b from-smoke to-raised/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(255,107,26,.15),transparent_60%)]" />
        <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-4">
            {lang === 'hi' ? 'हॉटेल महाराजा बद्दल' : 'About Hotel Maharajaa'}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-cream leading-tight mb-6">
            {lang === 'hi'
              ? 'तृप्त मन, स्वादिष्ट क्षण..!\nअस्सल चवीची परंपरा.'
              : 'Cooked with Fire.\nServed with Respect.'}
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {lang === 'hi'
              ? 'गुरेवाडी फाटा, सिन्नर (नाशिक-पुणे महामार्ग) — जिथे अस्सल ढाबा चव आणि आपुलकीचे आदरातिथ्य एकत्र येते.'
              : 'Gurewadi Phata, Sinnar (Nashik-Pune Highway) — where hearty dhaba recipes and genuine hospitality meet.'}
          </p>
        </div>
      </section>

      {/* Real Photos Grid: Venue & Dining */}
      <section className="max-w-container mx-auto px-4 sm:px-6 -mt-8 mb-16 relative z-20">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-white/10 relative h-72 shadow-xl group">
            <img
              src={asset('/images/restaurant/img_01.jpg')}
              alt="Hotel Maharajaa Highway Facade"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
              <span className="text-cream text-sm font-semibold">
                {lang === 'hi' ? 'हॉटेल महाराजा - महामार्गावरील दर्शनी भाग' : 'Hotel Maharajaa Highway Frontage'}
              </span>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 relative h-72 shadow-xl group">
            <img
              src={asset('/images/restaurant/img_06.jpg')}
              alt="Hotel Maharajaa Family Dining Hall"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
              <span className="text-cream text-sm font-semibold">
                {lang === 'hi' ? 'स्वच्छ व हवेशीर फॅमिली हॉल' : 'Hygienic Family Dining Hall'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-12">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <div ref={ref1} className="reveal grid md:grid-cols-3 gap-8">
            {CHAPTERS.map((c) => {
              const content = lang === 'hi' ? c.hi : c.en
              return (
                <div key={c.en.title} className="bg-surface rounded-card p-8 border border-white/10 hover:border-ember/40 transition-colors">
                  <div className="text-5xl mb-5">{c.icon}</div>
                  <h2 className="font-display text-2xl text-cream mb-3">{content.title}</h2>
                  <p className="text-muted leading-relaxed">{content.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Kitchen promises */}
      <section className="py-16 bg-raised/40">
        <div className="max-w-container mx-auto px-4 sm:px-6">
          <div ref={ref2} className="reveal">
            <h2 className="font-display text-3xl text-cream text-center mb-10">
              {lang === 'hi' ? 'आमची वचनबद्धता' : 'Our Dhaba Promises'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {PROMISES.map((p) => (
                <div key={p.en} className="flex items-center gap-3 bg-surface rounded-card p-4 border border-veg/20">
                  <span className="text-veg text-xl font-bold">✓</span>
                  <span className="text-cream text-sm font-medium">{lang === 'hi' ? p.hi : p.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 text-center">
        <p className="text-muted mb-6 text-lg">
          {lang === 'hi' ? 'सिन्नरला जाताना नक्की भेट द्या.' : 'Drop in next time you drive through Sinnar.'}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/menu"
            className="rounded-pill bg-ember text-smoke font-bold px-8 py-3.5 glow-ember hover:scale-105 transition-transform"
          >
            {lang === 'hi' ? 'मेनू पहा' : 'View Full Menu'}
          </Link>
          <a
            href="tel:+917447857456"
            className="rounded-pill border border-cream/30 text-cream px-8 py-3.5 hover:border-ember hover:text-ember transition-colors"
          >
            {lang === 'hi' ? 'कॉल करा (7447857456)' : 'Call +91 74478 57456'}
          </a>
        </div>
      </section>
    </main>
  )
}
