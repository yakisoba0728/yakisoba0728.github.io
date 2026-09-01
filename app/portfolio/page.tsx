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
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-body">
          <T ko="실제로 개발한 프로젝트와 수상·대회, 자격·증서, 교육, 공개 활동 이력을 한곳에 정리했습니다." en="A single place for projects I have built, awards and competitions, credentials, education, and public activities." />
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
          <a href="#projects" className="chip transition-colors hover:border-border-2 hover:text-fg"><T ko="프로젝트" en="Projects" /></a>
          <a href="#awards" className="chip transition-colors hover:border-border-2 hover:text-fg"><T ko="수상·대회" en="Awards & competitions" /></a>
          <a href="#credentials" className="chip transition-colors hover:border-border-2 hover:text-fg"><T ko="자격·증서" en="Credentials" /></a>
          <a href="#education" className="chip transition-colors hover:border-border-2 hover:text-fg"><T ko="교육" en="Education" /></a>
          <a href="#activity" className="chip transition-colors hover:border-border-2 hover:text-fg"><T ko="활동" en="Activity" /></a>
        </div>
      </Reveal>

      <div id="projects" className="scroll-mt-24">
        {projects.length === 0 ? (
          <EmptyState className="mt-8 text-[15px]" />
        ) : (
          <>
            {ongoing.length > 0 && (
              <section className="mt-10">
                <Reveal><p className="section-label"><T ko="진행 중" en="In progress" /></p></Reveal>
                <div data-page-stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {ongoing.map((p) => <ProjectCard key={p.slug} project={p} />)}
                </div>
              </section>
            )}

            {rest.length > 0 && (
              <section className="mt-12">
                <Reveal><p className="section-label"><T ko="프로젝트" en="Projects" /></p></Reveal>
                <Reveal stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
