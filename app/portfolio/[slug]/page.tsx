import type { Metadata } from 'next'
import Link from 'next/link'
import { ViewTransition } from 'react'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { getAllProjects, getProject } from '@/lib/content'
import { Mdx } from '@/components/mdx'
import T from '@/components/T'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return { title: project.frontmatter.title, description: project.frontmatter.role }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const { frontmatter, content } = project

  return (
    <article className="mx-auto max-w-[820px] py-14 md:py-20">
      <Link href="/portfolio" className="text-[14px] text-muted transition-colors hover:text-fg"><T ko="← 포트폴리오" en="← Portfolio" /></Link>

      <ViewTransition name={`project-${slug}`} share="morph">
        <div className="mt-5 flex h-40 items-end overflow-hidden rounded-xl border border-border p-6" style={{ background: 'var(--color-surface)' }}>
          <div>
            <h1 className="t-display-md">{frontmatter.title}</h1>
            <p className="mt-2 text-[14px] text-muted" style={{ fontFamily: 'var(--font-mono)' }}>{frontmatter.period} · {frontmatter.role}</p>
          </div>
        </div>
      </ViewTransition>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {frontmatter.stack.map((s) => (
          <span key={s} className="chip text-[11px]">{s}</span>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        {frontmatter.repo && (
          <a href={frontmatter.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-accent hover:underline">
            <GithubIcon size={15} /> <T ko="저장소" en="Repository" />
          </a>
        )}
        {frontmatter.demo && (
          <a href={frontmatter.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-accent hover:underline">
            <ExternalLink size={15} /> <T ko="데모" en="Demo" />
          </a>
        )}
      </div>
      <hr className="my-8 border-border" />
      <Mdx source={content} />
    </article>
  )
}
