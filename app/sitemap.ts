import type { MetadataRoute } from 'next'
import { getAllPosts, getAllProjects } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yaki.kr'
  const staticRoutes: MetadataRoute.Sitemap = ['', '/about', '/portfolio', '/blog'].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.8,
  }))
  const projects: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))
  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))
  return [...staticRoutes, ...projects, ...posts]
}
