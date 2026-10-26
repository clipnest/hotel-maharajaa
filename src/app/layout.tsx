import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingDock } from '@/components/layout/FloatingDock'
import { business } from '@/lib/data/business'

export const metadata: Metadata = {
  title: {
    default: `Hotel Maharajaa | Veg & Non-Veg Dhaba in ${business.city}`,
    template: `%s | Hotel Maharajaa`,
  },
  description: `Authentic veg and non-veg dhaba food in ${business.city}. See the menu, order on WhatsApp, reserve a table and get directions to Hotel Maharajaa.`,
  metadataBase: new URL('https://hotelmahara.jaa'), // TODO: update with real domain
  openGraph: {
    siteName: 'Hotel Maharajaa',
    locale: 'en_IN',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.name,
    description: business.tagline,
    servesCuisine: business.servesCuisine,
    priceRange: business.priceRange,
    telephone: business.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.state,
      postalCode: business.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHoursSpecification: business.hours
      .filter((h) => !h.closed)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.day,
        opens: h.open,
        closes: h.close,
      })),
    hasMenu: 'https://hotelmahara.jaa/menu',
    acceptsReservations: 'True',
  }

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#14100D" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingDock />
        </Providers>
      </body>
    </html>
  )
}
