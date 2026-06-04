import Link from 'next/link'
import { getFeaturedProjects } from '@/lib/content'
import ProjectCard from '@/components/ProjectCard'

export default function FeaturedProjects() {
  const projects = getFeaturedProjects().slice(0, 3)
  if (projects.length === 0) return null
  return (
    <section className="border-t border-border py-16">
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm text-accent">{"// featured projects"}</p>
        <Link href="/portfolio" className="text-sm text-muted hover:text-fg">
          전체 보기 →
        </Link>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  )
}
