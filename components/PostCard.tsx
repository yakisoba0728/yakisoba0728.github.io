import Link from 'next/link'
import type { Post } from '@/lib/types'
import { formatDate } from '@/lib/format'

export default function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter } = post
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-lg border border-border bg-surface p-5 transition-colors hover:border-muted"
    >
      <p className="font-mono text-xs text-muted">{formatDate(frontmatter.date)}</p>
      <h3 className="mt-2 text-lg font-semibold text-fg group-hover:text-accent">
        {frontmatter.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{frontmatter.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {frontmatter.tags.map((t) => (
          <span key={t} className="font-mono text-[11px] text-accent-2">
            #{t}
          </span>
        ))}
      </div>
    </Link>
  )
}
