import type { MetadataRoute } from 'next'
import { posts } from '../src/app/blog/posts'

const SITE = 'https://santamesa.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,        lastModified: today, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/blog`,    lastModified: today, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE}/privacy`, lastModified: today, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${SITE}/terms`,   lastModified: today, changeFrequency: 'yearly',  priority: 0.2 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : today,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes]
}
