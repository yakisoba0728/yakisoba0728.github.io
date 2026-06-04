import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import { getAllProjects } from '@/lib/content'
import ProjectCard from '@/components/ProjectCard'
import T from '@/components/T'

export const metadata: Metadata = { title: '포트폴리오', description: '프로젝트 모음' }

export default function PortfolioPage() {
  const projects = getAllProjects()
  return (
    <div className="py-16">
      <Reveal variant="left">
        <p className="section-label">{'// PORTFOLIO'}</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight"><T ko={<>만든 <span className="gradient-text">것들</span></>} en={<>Things I&apos;ve <span className="gradient-text">built</span></>} /></h1>
      </Reveal>
      {projects.length === 0 ? (
        <p className="mt-8 text-muted"><T ko="아직 등록된 프로젝트가 없습니다." en="No projects yet." /></p>
      ) : (
        <Reveal stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </Reveal>
      )}
    </div>
  )
}
