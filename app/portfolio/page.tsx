import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import ProjectCard from '@/components/ProjectCard'
import PortfolioRecords from '@/components/portfolio/PortfolioRecords'
import { getAllProjects } from '@/lib/content'
import T from '@/components/T'
import EmptyState from '@/components/EmptyState'

export const metadata: Metadata = { title: '포트폴리오', description: '프로젝트와 수상·자격·교육 이력' }

export default function PortfolioPage() {
  const projects = getAllProjects()
  const ongoing = projects.filter((p) => p.frontmatter.status === 'ongoing')
  const rest = projects.filter((p) => p.frontmatter.status !== 'ongoing')

  return (
    <div className="py-10 md:py-14">
      <Reveal>
        <p className="section-label">Portfolio</p>
        <h1 className="t-display mt-4"><T ko={<>만든 <span className="gradient-text">것들</span></>} en={<>Things I&apos;ve <span className="gradient-text">built</span></>} /></h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-body">
          <T ko="직접 만든 프로젝트와 주요 수상·자격·교육 이력을 정리했습니다." en="Selected projects, awards, credentials, and education." />
        </p>
      </Reveal>

      <div id="projects" className="scroll-mt-24">
        {projects.length === 0 ? (
          <EmptyState className="mt-8 text-[15px]" />
        ) : (
          <>
            {ongoing.length > 0 && (
              <section className="mt-9">
                <Reveal><p className="section-label"><T ko="진행 중" en="In progress" /></p></Reveal>
                <div data-page-stagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {ongoing.map((p) => <ProjectCard key={p.slug} project={p} />)}
                </div>
              </section>
            )}

            {rest.length > 0 && (
              <section className="mt-10">
                <Reveal><p className="section-label"><T ko="프로젝트" en="Projects" /></p></Reveal>
                <Reveal stagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => <ProjectCard key={p.slug} project={p} />)}
                </Reveal>
              </section>
            )}
          </>
        )}
      </div>

      <PortfolioRecords />
    </div>
  )
}
