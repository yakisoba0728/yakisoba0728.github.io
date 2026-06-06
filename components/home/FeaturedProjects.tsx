import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { getFeaturedProjects } from '@/lib/content'
import ProjectCard from '@/components/ProjectCard'

export default function FeaturedProjects() {
  const projects = getFeaturedProjects().slice(0, 3)
  if (projects.length === 0) return null
  return (
    <section className="py-14">
      <Reveal>
        <div className="flex items-center justify-between">
          <p className="section-label">{'// FEATURED PROJECTS'}</p>
          <Link href="/portfolio" className="text-sm text-muted hover:text-fg">전체 보기 →</Link>
        </div>
      </Reveal>
      <Reveal stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </Reveal>
    </section>
  )
}
