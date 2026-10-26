'use client'

import { useStore } from '@/lib/store'

export function DietToggle({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { diet, setDiet, lang } = useStore()

  const options: { value: typeof diet; en: string; hi: string; color: string }[] = [
    { value: 'both',   en: 'Both',    hi: 'दोनों',     color: 'text-turmeric' },
    { value: 'veg',    en: 'Veg',     hi: 'वेज',       color: 'text-veg' },
    { value: 'nonveg', en: 'Non-Veg', hi: 'नॉन-वेज',   color: 'text-nonveg' },
  ]

  const glowMap: Record<typeof diet, string> = {
    both:   'shadow-glow-turmeric',
    veg:    'shadow-glow-veg',
    nonveg: 'shadow-glow-nonveg',
  }

  return (
    <div
      role="group"
      aria-label={lang === 'hi' ? 'आहार विकल्प' : 'Diet preference'}
      className={[
        'flex items-center bg-surface rounded-pill p-0.5 sm:p-1 border border-white/10 shrink-0 shadow-inner',
        size === 'sm' ? 'gap-0.5 text-[11px] sm:text-xs' : 'gap-1 text-sm',
      ].join(' ')}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setDiet(opt.value)}
          role="radio"
          aria-checked={diet === opt.value}
          className={[
            'rounded-pill font-medium transition-all duration-300 focus-visible:outline-turmeric cursor-pointer select-none',
            size === 'sm' ? 'px-2 py-1 sm:px-2.5 sm:py-1' : 'px-3 py-1.5',
            diet === opt.value
              ? `bg-raised ${opt.color} ${glowMap[opt.value]} font-bold`
              : 'text-muted hover:text-cream',
          ].join(' ')}
        >
          {/* Veg/Non-veg dot indicators */}
          {opt.value !== 'both' && (
            <span
              className={[
                'inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1 sm:mr-1.5 align-middle',
                opt.value === 'veg' ? 'bg-veg' : 'bg-nonveg',
              ].join(' ')}
              aria-hidden="true"
            />
          )}
          {lang === 'hi' ? opt.hi : opt.en}
        </button>
      ))}
    </div>
  )
}
