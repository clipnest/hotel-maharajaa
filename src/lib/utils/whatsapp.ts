/**
 * WhatsApp message builder for Hotel Maharajaa
 * Generates a pre-filled wa.me link with the full order summary.
 */
import { CartItem, OrderMeta } from '../store'
import { business } from '../data/business'

export function buildWhatsAppOrderMessage(
  cart: CartItem[],
  meta: OrderMeta,
  lang: 'en' | 'hi' = 'en'
): string {
  if (cart.length === 0) return ''

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const lines = cart.map((i) => `• ${lang === 'hi' && i.nameHi ? i.nameHi : i.name} x${i.qty} — ₹${i.price * i.qty}`)

  const body = lang === 'hi'
    ? [
        `🍽️ *नमस्ते! Hotel Maharajaa में ऑर्डर:*`,
        ``,
        ...lines,
        ``,
        `💰 *कुल: ₹${total}*`,
        `📋 *ऑर्डर टाइप:* ${meta.type === 'Dine-in' ? 'डाइन-इन' : 'पिकअप'}`,
        meta.name ? `👤 *नाम:* ${meta.name}` : '',
        meta.note ? `📝 *नोट:* ${meta.note}` : '',
      ].filter(Boolean).join('\n')
    : [
        `🍽️ *Hi! Order for Hotel Maharajaa:*`,
        ``,
        ...lines,
        ``,
        `💰 *Total: ₹${total}*`,
        `📋 *Order type:* ${meta.type}`,
        meta.name ? `👤 *Name:* ${meta.name}` : '',
        meta.note ? `📝 *Note:* ${meta.note}` : '',
      ].filter(Boolean).join('\n')

  const encoded = encodeURIComponent(body)
  const phone = (business.contact.whatsapp || '917447857456').replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encoded}`
}

export function buildWhatsAppReservationMessage(fields: {
  name: string
  phone: string
  date: string
  time: string
  guests: number
  note?: string
}): string {
  const body = [
    `🍽️ *Table Reservation – Hotel Maharajaa*`,
    ``,
    `👤 Name: ${fields.name}`,
    `📱 Phone: ${fields.phone}`,
    `📅 Date: ${fields.date}`,
    `🕐 Time: ${fields.time}`,
    `👥 Guests: ${fields.guests}`,
    fields.note ? `📝 Note: ${fields.note}` : '',
  ].filter(Boolean).join('\n')

  const encoded = encodeURIComponent(body)
  const phone = (business.contact.whatsapp || '917447857456').replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encoded}`
}
