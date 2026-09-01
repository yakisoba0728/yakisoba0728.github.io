import Link from 'next/link'
import Reveal from '@/components/Reveal'
import T from '@/components/T'
import EmptyState from '@/components/EmptyState'
import ProjectCard from '@/components/ProjectCard'
import { getFeaturedProjects } from '@/lib/content'
import { profile } from '@/content/profile'

const cardLabel = 'text-[12px] font-semibold uppercase tracking-[0.1em] text-muted'

export default function Bento() {
  const emptyLine = <EmptyState className="mt-3 text-[14px]" />
  const featured = getFeaturedProjects().slice(0, 3)

  return (
    <section className="py-12 md:py-16">
      <Reveal><p className="section-label">Overview</p></Reveal>
      <Reveal stagger className="bento mt-7">
        <div className="glass card-hover bento-card col-4">
          <p className={cardLabel}>About</p>
          <p className="mt-3 text-[16px] leading-relaxed text-body"><T ko={profile.bioShort} en={profile.bioShortEn} /></p>
          <Link href="/about" className="link mt-4 inline-block text-[14px] font-medium"><T ko="자기소개 더 보기 →" en="More about me →" /></Link>
        </div>

        <div className="glass card-hover bento-card col-2">
          <p className={cardLabel}>Now</p>
          <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-body">
            {profile.now.map((item, i) => (
              <li key={item} className="flex gap-2">
                <span className="text-accent">•</span>
                <T ko={item} en={profile.nowEn[i]} />
              </li>
            ))}
          </ul>
        </div>

        <div className="glass card-hover bento-card col-3">
          <p className={cardLabel}>Skills</p>
          <div className="mt-3 flex flex-col gap-4">
            {profile.skills.map((group) => (
              <div key={group.category}>
                <h4 className="mb-2 text-[14px] font-semibold text-fg">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (<span key={item} className="chip">{item}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass card-hover bento-card col-3">
          <p className={cardLabel}>Activities</p>
          {emptyLine}
        </div>

        {featured.length > 0 ? featured.map((project) => (
          <ProjectCard key={project.slug} project={project} className="col-2 min-h-[200px]" />
        )) : [0, 1, 2].map((i) => (
          <div key={i} className="glass col-2 flex min-h-[200px] items-center justify-center">
            <EmptyState className="px-2 text-center text-[14px]" />
          </div>
        ))}
      </Reveal>
      <Reveal>
        <Link href="/portfolio" className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent transition-all hover:gap-2.5">
          <T ko="프로젝트 보러가기" en="See all projects" /> →
        </Link>
      </Reveal>
    </section>
  )
}
