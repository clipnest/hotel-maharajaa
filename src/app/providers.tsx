'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'

/**
 * Providers — wraps the app in Zustand-aware side effects.
 * Applies theme and diet data-attributes to <html> on mount
 * and whenever preferences change.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const { theme, diet, reduceMotion } = useStore()

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('data-theme', theme === 'day' ? 'light' : 'dark')
    html.setAttribute('data-diet', diet)
    if (reduceMotion) {
      html.classList.add('reduce-motion')
    } else {
      html.classList.remove('reduce-motion')
    }
  }, [theme, diet, reduceMotion])

  // Honour OS preference on first load
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      useStore.getState().toggleReduceMotion()
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      // Only switch if user hasn't saved a preference
      const saved = localStorage.getItem('maharajaa-prefs')
      if (!saved || !JSON.parse(saved).theme) {
        useStore.getState().setTheme('day')
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
