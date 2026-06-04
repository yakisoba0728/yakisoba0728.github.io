import Link from 'next/link'
import type { Project } from '@/lib/types'

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, frontmatter } = project
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-muted"
    >
      <div className="flex h-28 items-center justify-center bg-gradient-to-br from-accent/15 to-accent-2/15">
        <span className="font-mono text-sm text-muted">{frontmatter.period}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-fg group-hover:text-accent">{frontmatter.title}</h3>
        <p className="mt-1 text-sm text-muted">{frontmatter.role}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {frontmatter.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
