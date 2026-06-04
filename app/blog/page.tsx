import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import { getAllPosts } from '@/lib/content'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = { title: '블로그', description: '기술 블로그' }

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="py-16">
      <Reveal>
        <p className="section-label">{'// BLOG'}</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">글 <span className="gradient-text">쓰기</span></h1>
      </Reveal>
      {posts.length === 0 ? (
        <p className="mt-8 text-muted">아직 작성된 글이 없습니다.</p>
      ) : (
        <Reveal stagger className="mt-8 grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </Reveal>
      )}
    </div>
  )
}
