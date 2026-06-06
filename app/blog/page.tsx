import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import T from '@/components/T'
import EmptyState from '@/components/EmptyState'

export const metadata: Metadata = { title: '블로그', description: '기술 블로그' }

export default function BlogPage() {
  return (
    <div className="py-14 md:py-20">
      <Reveal>
        <p className="section-label">Blog</p>
        <h1 className="t-display mt-4"><T ko={<>쓰는 <span className="gradient-text">글</span></>} en={<><span className="gradient-text">Writing</span></>} /></h1>
      </Reveal>
      <Reveal>
        <EmptyState className="mt-10 text-[16px]" />
      </Reveal>
    </div>
  )
}
