'use client'

import { useStore } from '@/lib/store'

export function ThemeToggle() {
  const { theme, setTheme } = useStore()
  const isDay = theme === 'day'

  return (
    <button
      onClick={() => setTheme(isDay ? 'night' : 'day')}
      aria-label={isDay ? 'Switch to Night Dhaba theme' : 'Switch to Day Dhaba theme'}
      title={isDay ? 'Night Dhaba' : 'Day Dhaba'}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-surface border border-white/10 text-lg hover:border-ember/40 transition-all duration-200"
    >
      {isDay ? '🌙' : '☀️'}
    </button>
  )
}
