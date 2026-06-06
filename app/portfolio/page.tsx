import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import { getAllProjects } from '@/lib/content'
import T from '@/components/T'
import EmptyState from '@/components/EmptyState'

export const metadata: Metadata = { title: '포트폴리오', description: '프로젝트 모음' }

export default function PortfolioPage() {
  const projects = getAllProjects()
  return (
    <div className="py-14 md:py-20">
      <Reveal>
        <p className="section-label">Portfolio</p>
        <h1 className="t-display mt-4"><T ko={<>만든 <span className="gradient-text">것들</span></>} en={<>Things I&apos;ve <span className="gradient-text">built</span></>} /></h1>
      </Reveal>
      {projects.length === 0 ? (
        <EmptyState className="mt-8 text-[15px]" />
      ) : (
        <Reveal stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p.slug} className="glass flex min-h-[200px] items-center justify-center">
              <EmptyState className="px-2 text-center text-[14px]" />
            </div>
          ))}
        </Reveal>
      )}
    </div>
  )
}
