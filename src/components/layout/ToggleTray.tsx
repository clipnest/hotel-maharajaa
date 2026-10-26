'use client'

import { useStore } from '@/lib/store'
import { DietToggle } from '@/components/ui/DietToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'

/**
 * Toggle Tray — a floating glass pill on desktop (bottom-left)
 * with all global toggles: Diet, Theme, Language, Reduce Motion, Sound.
 */
export function ToggleTray() {
  const { lang, reduceMotion, toggleReduceMotion, soundOn, toggleSound } = useStore()

  return (
    <div
      className="fixed bottom-6 left-4 z-40 hidden lg:flex flex-col gap-2 glass rounded-2xl p-3 border border-white/10"
      aria-label="Global toggle tray"
    >
      <DietToggle size="sm" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
        <button
          onClick={toggleReduceMotion}
          aria-label={reduceMotion ? 'Enable animations' : 'Reduce motion'}
          title={reduceMotion ? 'Enable animations' : 'Reduce motion'}
          className={[
            'w-9 h-9 flex items-center justify-center rounded-full border text-sm transition-all',
            reduceMotion
              ? 'bg-raised border-turmeric/50 text-turmeric'
              : 'bg-surface border-white/10 text-muted hover:border-white/30',
          ].join(' ')}
        >
          {reduceMotion ? '🐢' : '✨'}
        </button>
        <button
          onClick={toggleSound}
          aria-label={soundOn ? 'Mute sizzle sound' : 'Enable sizzle sound'}
          title={soundOn ? 'Mute sound' : 'Enable sound (off by default)'}
          className={[
            'w-9 h-9 flex items-center justify-center rounded-full border text-sm transition-all',
            soundOn
              ? 'bg-raised border-ember/50 text-ember'
              : 'bg-surface border-white/10 text-muted hover:border-white/30',
          ].join(' ')}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>
      </div>
    </div>
  )
}
