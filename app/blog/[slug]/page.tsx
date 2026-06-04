import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPost } from '@/lib/content'
import { formatDate } from '@/lib/format'
import { Mdx } from '@/components/mdx'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: post.frontmatter.title, description: post.frontmatter.summary }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const { frontmatter, content } = post

  return (
    <article className="py-16">
      <Link href="/blog" className="font-mono text-sm text-muted hover:text-fg">
        ← blog
      </Link>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{frontmatter.title}</h1>
      <p className="mt-2 font-mono text-sm text-muted">{formatDate(frontmatter.date)}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {frontmatter.tags.map((t) => (
          <span key={t} className="font-mono text-xs text-accent-2">
            #{t}
          </span>
        ))}
      </div>
      <hr className="my-8 border-border" />
      <Mdx source={content} />
    </article>
  )
}
