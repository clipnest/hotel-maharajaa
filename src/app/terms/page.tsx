import { Metadata } from 'next'
import Link from 'next/link'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: 'Terms of Use | Hotel Maharajaa',
  description: 'Terms for using the Hotel Maharajaa website, ordering and reservations.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-2">Legal</p>
          <h1 className="font-display text-4xl text-cream mb-3">Terms of Use</h1>
          <p className="text-muted text-sm">Last updated: 25 October 2026</p>
        </div>

        <div className="bg-surface rounded-card p-8 border border-white/10 space-y-6 text-muted text-sm leading-relaxed">
          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please refrain from using our online services.
            </p>
          </section>

          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">2. Menu, Pricing &amp; Availability</h2>
            <p>
              Prices, descriptions, and availability of menu items shown on the website are indicative and subject to change without prior notice. Dishes marked &quot;Sold out today&quot; are temporarily unavailable. Taxes (such as GST) and delivery charges (if applicable) will be confirmed at the time of order confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">3. WhatsApp Orders &amp; Reservations</h2>
            <p>
              Submitting an order or table booking through our website generator initiates a WhatsApp request. An order or reservation is only considered confirmed once acknowledged and accepted directly by our restaurant staff. We reserve the right to decline orders based on kitchen capacity, closing hours, or dish availability.
            </p>
          </section>

          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">4. Dietary &amp; Allergen Disclaimers</h2>
            <p>
              We take great care in separating vegetarian and non-vegetarian food preparation. However, if you or your guests have severe allergies, please notify the management directly before placing an order. Hotel Maharajaa is registered and operated under FSSAI compliance regulations.
            </p>
          </section>

          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">5. Intellectual Property</h2>
            <p>
              All trademarks, logos, visuals, 3D graphics, and written content appearing on this website are the property of Hotel Maharajaa or used under licence. Unauthorised reproduction or distribution is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">6. Contact &amp; Grievances</h2>
            <p>
              For feedback, inquiries, or clarifications regarding these terms:
            </p>
            <div className="mt-2 text-cream font-medium">
              <p>{business.name}</p>
              <p>Address: {business.address.full}</p>
              <p>Phone: {business.contact.phone}</p>
              <p>FSSAI Licence: {business.fssai}</p>
            </div>
          </section>

          <div className="pt-6 border-t border-white/10 text-center">
            <Link href="/" className="text-ember hover:underline font-medium">
              &larr; Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
