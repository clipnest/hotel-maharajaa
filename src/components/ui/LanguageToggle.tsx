'use client'

import { useStore } from '@/lib/store'

export function LanguageToggle() {
  const { lang, setLang } = useStore()
  const isHi = lang === 'hi'

  return (
    <button
      onClick={() => setLang(isHi ? 'en' : 'hi')}
      aria-label={isHi ? 'Switch to English' : 'हिंदी में बदलें'}
      className="flex items-center gap-1 bg-surface border border-white/10 rounded-pill px-2.5 py-1.5 text-xs font-semibold text-cream hover:border-ember/40 transition-all duration-200"
    >
      {isHi ? 'EN' : 'हिं'}
    </button>
  )
}
