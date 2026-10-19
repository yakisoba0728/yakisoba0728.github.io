import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import T from '@/components/T'
import EmptyState from '@/components/EmptyState'
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/content'

export const metadata: Metadata = { title: '블로그', description: '기술 블로그' }

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="py-14 md:py-20">
      <Reveal>
        <p className="section-label">Blog</p>
        <h1 className="t-display mt-4"><T ko={<>쓰는 <span className="gradient-text">글</span></>} en={<><span className="gradient-text">Writing</span></>} /></h1>
      </Reveal>
      {posts.length === 0 ? (
        <Reveal><EmptyState className="mt-10 text-[16px]" /></Reveal>
      ) : (
        <Reveal stagger className="mt-10 grid gap-4 sm:grid-cols-2">
          {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </Reveal>
      )}
    </div>
  )
}
