import { Metadata } from 'next'
import Link from 'next/link'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: 'Privacy Policy | Hotel Maharajaa',
  description: 'How Hotel Maharajaa handles your data on this website.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-ember text-sm font-semibold uppercase tracking-widest mb-2">Legal</p>
          <h1 className="font-display text-4xl text-cream mb-3">Privacy Policy</h1>
          <p className="text-muted text-sm">Last updated: 25 October 2026</p>
        </div>

        <div className="bg-surface rounded-card p-8 border border-white/10 space-y-6 text-muted text-sm leading-relaxed">
          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">1. Overview</h2>
            <p>
              Hotel Maharajaa (Veg &amp; Non-Veg) values your privacy. This privacy notice explains how we collect, use, and protect your information when you visit our website, submit enquiry forms, or place orders through WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">2. Information We Collect</h2>
            <p>
              When you use our website, we may collect:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Contact details (name, phone number, email address) submitted via reservation, catering, or contact forms.</li>
              <li>Order preferences and notes submitted when initiating a WhatsApp order or catering enquiry.</li>
              <li>Technical and usage data (such as browser type, device information, and anonymous page analytics via Google Analytics 4) to ensure site performance and responsiveness.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">3. How We Use Your Data</h2>
            <p>
              We process your details exclusively for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Responding to your table reservation requests, catering enquiries, or questions.</li>
              <li>Facilitating food orders communicated through WhatsApp.</li>
              <li>Improving our website performance, user experience, and accessibility under India&apos;s Digital Personal Data Protection Act (DPDP), 2023.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">4. WhatsApp Ordering &amp; External Services</h2>
            <p>
              Our website provides pre-formatted links to WhatsApp to help you send orders and reservation requests easily. Any interaction on WhatsApp is governed by WhatsApp&apos;s privacy terms. We do not store financial payment information or credit card numbers on this website.
            </p>
          </section>

          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">5. Data Retention &amp; Rights</h2>
            <p>
              Enquiry messages and contact records are retained for customer service purposes for up to 12 months, after which they are safely pruned. You may request deletion or correction of your submitted contact details at any time by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-cream font-semibold text-lg mb-2">6. Contact Information</h2>
            <p>
              For any questions regarding this policy or our data practices, please contact us:
            </p>
            <div className="mt-2 text-cream font-medium">
              <p>{business.name}</p>
              <p>Phone: {business.contact.phone}</p>
              <p>Email: {business.contact.email}</p>
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
