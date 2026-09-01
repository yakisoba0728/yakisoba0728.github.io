import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import ProjectCard from '@/components/ProjectCard'
import { getAllProjects } from '@/lib/content'
import T from '@/components/T'
import EmptyState from '@/components/EmptyState'

export const metadata: Metadata = { title: '포트폴리오', description: '프로젝트 모음' }

export default function PortfolioPage() {
  const projects = getAllProjects()
  const ongoing = projects.filter((p) => p.frontmatter.status === 'ongoing')
  const rest = projects.filter((p) => p.frontmatter.status !== 'ongoing')

  return (
    <div className="py-14 md:py-20">
      <Reveal>
        <p className="section-label">Portfolio</p>
        <h1 className="t-display mt-4"><T ko={<>만든 <span className="gradient-text">것들</span></>} en={<>Things I&apos;ve <span className="gradient-text">built</span></>} /></h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-body">
          <T ko="실제로 개발한 프로젝트만 정리했습니다. 각 카드에서 공개/비공개 여부와 현재 상태를 함께 확인할 수 있습니다." en="Only projects I actually built are listed here, with repository visibility and current status shown on every card." />
        </p>
      </Reveal>

      {projects.length === 0 ? (
        <EmptyState className="mt-8 text-[15px]" />
      ) : (
        <>
          {ongoing.length > 0 && (
            <section className="mt-12">
              <Reveal><p className="section-label"><T ko="진행 중" en="In progress" /></p></Reveal>
              <Reveal stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ongoing.map((p) => <ProjectCard key={p.slug} project={p} />)}
              </Reveal>
            </section>
          )}

          {rest.length > 0 && (
            <section className="mt-14">
              <Reveal><p className="section-label"><T ko="프로젝트" en="Projects" /></p></Reveal>
              <Reveal stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => <ProjectCard key={p.slug} project={p} />)}
              </Reveal>
            </section>
          )}
        </>
      )}
    </div>
  )
}
