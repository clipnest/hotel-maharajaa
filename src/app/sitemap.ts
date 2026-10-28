import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hotelmahara.jaa' // TODO: replace with client live domain
  const routes = [
    '',
    '/menu',
    '/specialities',
    '/highway-dhaba-nashik-pune',
    '/family-dining-sinnar',
    '/about',
    '/gallery',
    '/reviews',
    '/order',
    '/catering',
    '/contact',
    '/faq',
    '/privacy-policy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-10-25'),
    changeFrequency: route === '' || route === '/menu' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/menu' ? 0.9 : 0.7,
  }))
}
