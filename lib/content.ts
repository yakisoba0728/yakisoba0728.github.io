import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Post, PostFrontmatter, Project, ProjectFrontmatter } from './types'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

export function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw)
  const frontmatter: PostFrontmatter = {
    title: data.title ?? '',
    date: data.date ?? '',
    summary: data.summary ?? '',
    tags: data.tags ?? [],
    published: data.published ?? true,
  }
  return { slug, frontmatter, content }
}

export function parseProject(slug: string, raw: string): Project {
  const { data, content } = matter(raw)
  const frontmatter: ProjectFrontmatter = {
    title: data.title ?? '',
    period: data.period ?? '',
    role: data.role ?? '',
    stack: data.stack ?? [],
    thumbnail: data.thumbnail,
    repo: data.repo,
    demo: data.demo,
    featured: data.featured ?? false,
    order: data.order ?? 0,
    published: data.published ?? true,
  }
  return { slug, frontmatter, content }
}

export const byDateDesc = (a: Post, b: Post): number =>
  a.frontmatter.date < b.frontmatter.date ? 1 : a.frontmatter.date > b.frontmatter.date ? -1 : 0

export const byOrderAsc = (a: Project, b: Project): number =>
  a.frontmatter.order - b.frontmatter.order

export function selectPublished<T extends { frontmatter: { published: boolean } }>(
  items: T[],
): T[] {
  return items.filter((i) => i.frontmatter.published)
}

function readDir(dir: string): { slug: string; raw: string }[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({
      slug: f.replace(/\.mdx$/, ''),
      raw: fs.readFileSync(path.join(dir, f), 'utf8'),
    }))
}

export function getAllPosts(): Post[] {
  return selectPublished(readDir(BLOG_DIR).map(({ slug, raw }) => parsePost(slug, raw))).sort(
    byDateDesc,
  )
}

export function getPost(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null
}

export function getAllProjects(): Project[] {
  return selectPublished(
    readDir(PROJECTS_DIR).map(({ slug, raw }) => parseProject(slug, raw)),
  ).sort(byOrderAsc)
}

export function getProject(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.frontmatter.featured)
}
