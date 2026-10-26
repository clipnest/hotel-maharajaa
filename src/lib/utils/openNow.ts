/**
 * Open / closed computation for Hotel Maharajaa
 * All times in Asia/Kolkata (IST, UTC+5:30)
 */

import { business } from '../data/business'

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export interface OpenStatus {
  isOpen: boolean
  label: string            // e.g. "Open · Closes at 11:30 PM" or "Closed · Opens Mon at 8:00 AM"
  labelHi: string
  nextChange: string       // HH:MM 24-hr
}

export function getOpenStatus(): OpenStatus {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  const currentDay = DAYS[now.getDay()]
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const todayHours = business.hours.find((h) => h.day === currentDay)

  if (!todayHours || todayHours.closed) {
    // Find next open day
    const nextOpenDay = business.hours.find((h, idx) => {
      const dayOffset = (DAYS.indexOf(h.day) - now.getDay() + 7) % 7
      return dayOffset > 0 && !h.closed
    })
    const label = nextOpenDay
      ? `Closed · Opens ${nextOpenDay.day.slice(0,3)} at ${formatHM(nextOpenDay.open)}`
      : 'Closed today'
    return { isOpen: false, label, labelHi: 'आज बंद है', nextChange: '' }
  }

  const openMin  = toMinutes(todayHours.open)
  const closeMin = toMinutes(todayHours.close)

  // Handle past-midnight close (e.g. close 00:30 means next calendar day)
  const isPastMidnight = closeMin < openMin
  const adjustedClose  = isPastMidnight ? closeMin + 24 * 60 : closeMin
  const adjustedCurrent = isPastMidnight && currentMinutes < openMin
    ? currentMinutes + 24 * 60
    : currentMinutes

  const isOpen = adjustedCurrent >= openMin && adjustedCurrent < adjustedClose

  if (isOpen) {
    const closeDisplay = isPastMidnight && adjustedClose >= 24 * 60
      ? formatHM(todayHours.close) + ' (next day)'
      : formatHM(todayHours.close)
    return {
      isOpen: true,
      label: `Open · Closes at ${closeDisplay}`,
      labelHi: `खुला है · ${closeDisplay} तक`,
      nextChange: todayHours.close,
    }
  } else {
    // Closed right now — show when it opens (today or tomorrow)
    const opensToday = currentMinutes < openMin
    const label = opensToday
      ? `Closed · Opens today at ${formatHM(todayHours.open)}`
      : `Closed · Opens tomorrow at ${formatHM(todayHours.open)}`
    return {
      isOpen: false,
      label,
      labelHi: opensToday ? `बंद है · आज ${formatHM(todayHours.open)} बजे खुलेगा` : `बंद है · कल खुलेगा`,
      nextChange: todayHours.open,
    }
  }
}

function formatHM(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12  = h % 12 || 12
  return `${h12}:${String(m).padStart(2,'0')} ${ampm}`
}
