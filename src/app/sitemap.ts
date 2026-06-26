import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aimstrainingcenter.com/'

  const routes = [
    '',
    '/about',
    '/courses',
    '/blogs',
    '/contact',
    '/enroll',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route.startsWith('/') ? route.substring(1) : route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
