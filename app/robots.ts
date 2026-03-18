import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/about', '/courses', '/contact', '/results', '/gallery'],
      disallow: ['/private/', '/api/'],
    },
    sitemap: 'https://www.vanajacoachingclasses.in/sitemap.xml',
  }
}
