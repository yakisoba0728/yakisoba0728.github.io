import Link from 'next/link'
import type { Post } from '@/lib/types'
import { formatDate } from '@/lib/format'

export default function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter } = post
  return (
    <Link href={`/blog/${slug}`} className="group glass card-hover block p-6">
      <p className="font-display text-xs text-muted-2">{formatDate(frontmatter.date)}</p>
      <h3 className="mt-2 text-lg font-semibold text-fg transition-colors group-hover:text-accent-2">{frontmatter.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{frontmatter.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {frontmatter.tags.map((t) => (
          <span key={t} className="chip text-[11px]">#{t}</span>
        ))}
      </div>
    </Link>
  )
}
