import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { getAllProjects, getProject } from '@/lib/content'
import { Mdx } from '@/components/mdx'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return { title: project.frontmatter.title, description: project.frontmatter.role }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const { frontmatter, content } = project

  return (
    <article className="py-16">
      <Link href="/portfolio" className="font-mono text-sm text-muted hover:text-fg">
        ← portfolio
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{frontmatter.title}</h1>
      <p className="mt-2 font-mono text-sm text-muted">
        {frontmatter.period} · {frontmatter.role}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {frontmatter.stack.map((s) => (
          <span
            key={s}
            className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        {frontmatter.repo && (
          <a
            href={frontmatter.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-accent-2 hover:underline"
          >
            <GithubIcon size={15} /> 저장소
          </a>
        )}
        {frontmatter.demo && (
          <a
            href={frontmatter.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-accent-2 hover:underline"
          >
            <ExternalLink size={15} /> 데모
          </a>
        )}
      </div>
      <hr className="my-8 border-border" />
      <Mdx source={content} />
    </article>
  )
}
