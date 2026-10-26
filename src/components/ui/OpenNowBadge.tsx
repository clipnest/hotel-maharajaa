'use client'

import { useEffect, useState } from 'react'
import { getOpenStatus } from '@/lib/utils/openNow'
import { useStore } from '@/lib/store'

export function OpenNowBadge({ compact = false }: { compact?: boolean }) {
  const { lang } = useStore()
  const [status, setStatus] = useState<ReturnType<typeof getOpenStatus> | null>(null)

  useEffect(() => {
    const update = () => setStatus(getOpenStatus())
    update()
    // Re-check every minute
    const interval = setInterval(update, 60_000)
    return () => clearInterval(interval)
  }, [])

  if (!status) return null

  if (compact) {
    return (
      <div
        className={[
          'relative flex items-center gap-1.5 px-2 py-1 rounded-pill text-xs font-medium',
          status.isOpen
            ? 'bg-veg/20 text-veg border border-veg/30'
            : 'bg-surface text-muted border border-white/10',
        ].join(' ')}
        aria-label={lang === 'hi' ? status.labelHi : status.label}
        title={lang === 'hi' ? status.labelHi : status.label}
      >
        <span
          className={[
            'relative w-2 h-2 rounded-full flex-shrink-0',
            status.isOpen ? 'bg-veg open-pulse' : 'bg-muted',
          ].join(' ')}
          aria-hidden="true"
        />
        {status.isOpen
          ? (lang === 'hi' ? 'खुला' : 'Open')
          : (lang === 'hi' ? 'बंद' : 'Closed')
        }
      </div>
    )
  }

  return (
    <div
      className={[
        'flex items-center gap-2 px-3 py-1.5 rounded-pill text-sm font-medium',
        status.isOpen
          ? 'bg-veg/20 text-veg border border-veg/30'
          : 'bg-surface text-muted border border-white/10',
      ].join(' ')}
    >
      <span
        className={[
          'relative w-2.5 h-2.5 rounded-full',
          status.isOpen ? 'bg-veg open-pulse' : 'bg-muted',
        ].join(' ')}
        aria-hidden="true"
      />
      <span>{lang === 'hi' ? status.labelHi : status.label}</span>
    </div>
  )
}
