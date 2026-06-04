import Link from 'next/link'
import { ViewTransition } from 'react'
import type { Project } from '@/lib/types'

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, frontmatter } = project
  return (
    <Link href={`/portfolio/${slug}`} className="group glass card-hover flex flex-col overflow-hidden">
      <ViewTransition name={`project-${slug}`} share="morph">
        <div className="flex h-32 items-center justify-center" style={{ background: 'linear-gradient(120deg, rgba(124,58,237,.18), rgba(34,211,238,.12))' }}>
          <span className="font-display text-sm text-muted">{frontmatter.period}</span>
        </div>
      </ViewTransition>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display font-semibold text-fg transition-colors group-hover:text-accent">{frontmatter.title}</h3>
        <p className="mt-1 text-sm text-muted">{frontmatter.role}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {frontmatter.stack.slice(0, 4).map((s) => (
            <span key={s} className="chip text-[11px]">{s}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
