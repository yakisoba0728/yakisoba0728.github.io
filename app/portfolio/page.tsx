import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/content'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = { title: 'Portfolio', description: '프로젝트 모음' }

export default function PortfolioPage() {
  const projects = getAllProjects()
  return (
    <div className="py-16">
      <p className="font-mono text-sm text-accent">~/portfolio</p>
      <h1 className="mt-3 text-3xl font-bold">프로젝트</h1>
      {projects.length === 0 ? (
        <p className="mt-8 text-muted">아직 등록된 프로젝트가 없습니다.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
