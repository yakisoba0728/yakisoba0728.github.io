import Link from 'next/link'
import type { Post } from '@/lib/types'
import { formatDate } from '@/lib/format'

export default function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter } = post
  return (
    <Link href={`/blog/${slug}`} className="group glass card-hover block p-6">
      <p className="text-[12px] text-muted" style={{ fontFamily: 'var(--font-mono)' }}>{formatDate(frontmatter.date)}</p>
      <h3 className="mt-2 text-[17px] font-semibold text-fg transition-colors group-hover:text-accent">{frontmatter.title}</h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-body">{frontmatter.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {frontmatter.tags.map((t) => (
          <span key={t} className="chip text-[11px]">#{t}</span>
        ))}
      </div>
    </Link>
  )
}
