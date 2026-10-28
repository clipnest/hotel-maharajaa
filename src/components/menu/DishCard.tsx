'use client'

import { useStore } from '@/lib/store'
import { asset } from '@/lib/utils/asset'
import type { Dish } from '@/lib/data/menu'

interface DishCardProps {
  dish: Dish
  compact?: boolean
}

const SPICE_EMOJI = ['','🌶️','🌶️🌶️','🌶️🌶️🌶️','🌶️🌶️🌶️🌶️','🌶️🌶️🌶️🌶️🌶️']

export function DishCard({ dish, compact }: DishCardProps) {
  const { lang, addItem, cart, reduceMotion } = useStore()
  const { diet, soldOut, popular, spice, price } = dish

  const inCart = cart.find((c) => c.id === dish.id)
  const name = lang === 'hi' && dish.nameHi ? dish.nameHi : dish.nameEn
  const description = lang === 'hi' && dish.descriptionHi ? dish.descriptionHi : dish.description

  function handleAdd() {
    addItem({
      id: dish.id,
      name: dish.nameEn,
      nameHi: dish.nameHi,
      price: dish.price,
      diet: dish.diet,
      category: dish.category,
    })
    window.gtag?.('event','add_to_order',{ dish_id: dish.id, price })
  }

  return (
    <article
      className={[
        'group relative rounded-card overflow-hidden border transition-all duration-300',
        'bg-surface border-white/10',
        soldOut ? 'opacity-60' : '',
        !reduceMotion ? 'hover:shadow-glow-ember hover:-translate-y-1' : '',
      ].join(' ')}
      style={{
        ...(diet === 'veg'
          ? { borderColor: inCart ? 'rgba(76,192,90,.4)' : undefined }
          : { borderColor: inCart ? 'rgba(255,84,104,.4)' : undefined }),
      }}
    >
      {/* Photo placeholder / image */}
      <div className="relative h-44 bg-raised overflow-hidden">
        {dish.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(dish.photo)}
            alt={`${name} — ${diet === 'veg' ? 'Vegetarian' : 'Non-vegetarian'} dish at Hotel Maharajaa`}
            className={[
              'w-full h-full object-cover',
              !reduceMotion ? 'group-hover:scale-105 transition-transform duration-500' : '',
            ].join(' ')}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-raised to-smoke">
            {diet === 'veg' ? '🥘' : '🍗'}
          </div>
        )}

        {/* Sold out overlay */}
        {soldOut && (
          <div className="absolute inset-0 bg-smoke/80 flex items-center justify-center">
            <span className="text-muted text-sm font-semibold">
              {lang === 'hi' ? 'आज उपलब्ध नहीं' : 'Sold Out Today'}
            </span>
          </div>
        )}

        {/* Popular badge */}
        {popular && !soldOut && (
          <span className="absolute top-2 left-2 bg-turmeric text-smoke text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-pill">
            {lang === 'hi' ? 'लोकप्रिय' : 'Popular'}
          </span>
        )}

        {/* Diet marker (top-right) */}
        <span
          className={[
            'absolute top-2 right-2 w-5 h-5 rounded flex items-center justify-center border',
            diet === 'veg'
              ? 'bg-smoke border-veg'
              : 'bg-smoke border-nonveg',
          ].join(' ')}
          aria-label={diet === 'veg' ? 'Vegetarian' : 'Non-vegetarian'}
          title={diet === 'veg' ? 'Vegetarian' : 'Non-vegetarian'}
        >
          <span
            className={[
              'w-2.5 h-2.5 rounded-full',
              diet === 'veg' ? 'bg-veg' : 'bg-nonveg',
            ].join(' ')}
          />
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-lg text-cream leading-tight mb-1">{name}</h3>
        {!compact && (
          <p className="text-muted text-sm leading-relaxed mb-3 line-clamp-2">{description}</p>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-cream font-bold text-lg">₹{price}</span>
            <span className="text-[11px] text-muted" aria-label={`Spice level ${spice} of 5`}>
              {SPICE_EMOJI[spice]}
            </span>
          </div>

          {!soldOut && (
            <button
              onClick={handleAdd}
              className={[
                'rounded-pill px-4 py-1.5 text-sm font-semibold transition-all duration-200',
                inCart
                  ? 'bg-veg/20 border border-veg text-veg'
                  : 'bg-ember text-smoke hover:bg-ember/90',
              ].join(' ')}
              aria-label={`Add ${name} to order`}
            >
              {inCart
                ? `+${inCart.qty}`
                : (lang === 'hi' ? 'जोड़ें' : 'Add')}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}
