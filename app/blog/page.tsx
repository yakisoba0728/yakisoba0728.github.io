import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/content'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = { title: 'Blog', description: '기술 블로그' }

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="py-16">
      <p className="font-mono text-sm text-accent-2">~/blog</p>
      <h1 className="mt-3 text-3xl font-bold">블로그</h1>
      {posts.length === 0 ? (
        <p className="mt-8 text-muted">아직 작성된 글이 없습니다.</p>
      ) : (
        <div className="mt-8 grid gap-4">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  )
}
