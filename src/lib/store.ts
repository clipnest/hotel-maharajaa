/**
 * Global Zustand store for Hotel Maharajaa
 * Handles: diet mode, theme, language, motion, sound, cart
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type DietMode = 'both' | 'veg' | 'nonveg'
export type Theme = 'night' | 'day'
export type Lang = 'en' | 'hi'

export interface CartItem {
  id: string
  name: string
  nameHi?: string
  price: number
  qty: number
  diet: 'veg' | 'nonveg'
  category: string
}

export interface OrderMeta {
  type: 'Dine-in' | 'Pickup'
  name: string
  note: string
}

interface GlobalState {
  /* Toggles */
  diet: DietMode
  theme: Theme
  lang: Lang
  reduceMotion: boolean
  soundOn: boolean
  spiceLevel: number          // 1-5

  /* Cart */
  cart: CartItem[]
  orderMeta: OrderMeta
  trayOpen: boolean

  /* Actions */
  setDiet: (d: DietMode) => void
  setTheme: (t: Theme) => void
  setLang: (l: Lang) => void
  toggleReduceMotion: () => void
  toggleSound: () => void
  setSpiceLevel: (n: number) => void

  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: string) => void
  setQty: (id: string, qty: number) => void
  clearCart: () => void
  setOrderMeta: (meta: Partial<OrderMeta>) => void
  setTrayOpen: (open: boolean) => void

  /* Computed */
  cartTotal: () => number
  cartCount: () => number
}

export const useStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      diet: 'both',
      theme: 'night',
      lang: 'en',
      reduceMotion: false,
      soundOn: false,
      spiceLevel: 3,

      cart: [],
      orderMeta: { type: 'Dine-in', name: '', note: '' },
      trayOpen: false,

      setDiet: (diet) => {
        set({ diet })
        document.documentElement.setAttribute('data-diet', diet)
      },
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.setAttribute('data-theme', theme === 'day' ? 'light' : 'dark')
      },
      setLang: (lang) => set({ lang }),
      toggleReduceMotion: () => set((s) => ({ reduceMotion: !s.reduceMotion })),
      toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
      setSpiceLevel: (spiceLevel) => set({ spiceLevel }),

      addItem: (item) =>
        set((s) => {
          const existing = s.cart.find((c) => c.id === item.id)
          if (existing) {
            return { cart: s.cart.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c) }
          }
          return { cart: [...s.cart, { ...item, qty: 1 }] }
        }),
      removeItem: (id) => set((s) => ({ cart: s.cart.filter((c) => c.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          cart: qty <= 0
            ? s.cart.filter((c) => c.id !== id)
            : s.cart.map((c) => c.id === id ? { ...c, qty } : c),
        })),
      clearCart: () => set({ cart: [] }),
      setOrderMeta: (meta) => set((s) => ({ orderMeta: { ...s.orderMeta, ...meta } })),
      setTrayOpen: (trayOpen) => set({ trayOpen }),

      cartTotal: () => get().cart.reduce((sum, i) => sum + i.price * i.qty, 0),
      cartCount: () => get().cart.reduce((sum, i) => sum + i.qty, 0),
    }),
    {
      name: 'maharajaa-prefs',
      partialize: (s) => ({
        diet: s.diet,
        theme: s.theme,
        lang: s.lang,
        reduceMotion: s.reduceMotion,
        soundOn: s.soundOn,
      }),
    }
  )
)
