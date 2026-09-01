import Link from 'next/link'
import { ViewTransition } from 'react'
import type { Project } from '@/lib/types'
import { statusLabel, visibilityLabel } from '@/lib/project-meta'
import T from '@/components/T'

export default function ProjectCard({ project, className = '' }: { project: Project; className?: string }) {
  const { slug, frontmatter } = project
  const visibility = visibilityLabel(frontmatter.visibility)
  const status = statusLabel(frontmatter.status)

  return (
    <Link href={`/portfolio/${slug}`} className={`group glass card-hover flex flex-col overflow-hidden ${className}`}>
      <ViewTransition name={`project-${slug}`} share="morph">
        <div className="flex h-28 items-center justify-center border-b border-border" style={{ background: 'var(--color-surface-2)' }}>
          <span className="text-[13px] font-medium text-muted" style={{ fontFamily: 'var(--font-mono)' }}>{frontmatter.period}</span>
        </div>
      </ViewTransition>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[16px] font-semibold text-fg transition-colors group-hover:text-accent">{frontmatter.title}</h3>
        <p className="mt-1 text-[14px] text-muted">{frontmatter.role}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="chip text-[11px]"><T ko={visibility.ko} en={visibility.en} /></span>
          <span className="chip text-[11px]"><T ko={status.ko} en={status.en} /></span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {frontmatter.stack.slice(0, 4).map((s) => (
            <span key={s} className="chip text-[11px]">{s}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
