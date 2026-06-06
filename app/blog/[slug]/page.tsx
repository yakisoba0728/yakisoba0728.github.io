import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPost } from '@/lib/content'
import { formatDate } from '@/lib/format'
import { Mdx } from '@/components/mdx'
import T from '@/components/T'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: post.frontmatter.title, description: post.frontmatter.summary }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const { frontmatter, content } = post

  return (
    <article className="mx-auto max-w-[760px] py-14 md:py-20">
      <Link href="/blog" className="text-[14px] text-muted transition-colors hover:text-fg"><T ko="← 블로그" en="← Blog" /></Link>
      <h1 className="t-display mt-5">{frontmatter.title}</h1>
      <p className="mt-3 text-[14px] text-muted" style={{ fontFamily: 'var(--font-mono)' }}>{formatDate(frontmatter.date)}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {frontmatter.tags.map((t) => (
          <span key={t} className="chip text-[11px]">#{t}</span>
        ))}
      </div>
      <hr className="my-8 border-border" />
      <Mdx source={content} />
    </article>
  )
}
