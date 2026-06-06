import Link from 'next/link'
import Reveal from '@/components/Reveal'
import ProjectCard from '@/components/ProjectCard'
import T from '@/components/T'
import { profile } from '@/content/profile'
import { getFeaturedProjects } from '@/lib/content'

const cardLabel = 'text-[12px] font-semibold uppercase tracking-[0.1em] text-muted'

export default function Bento() {
  const projects = getFeaturedProjects().slice(0, 3)
  return (
    <section className="py-12 md:py-16">
      <Reveal><p className="section-label">Overview</p></Reveal>
      <Reveal stagger className="bento mt-7">
        {/* About */}
        <div className="glass card-hover bento-card col-4">
          <p className={cardLabel}>About</p>
          <p className="mt-3 text-[16px] leading-relaxed text-body"><T ko={profile.bioShort} en={profile.bioShortEn} /></p>
          <Link href="/about" className="link mt-4 inline-block text-[14px] font-medium"><T ko="자기소개 더 보기 →" en="More about me →" /></Link>
        </div>

        {/* Now */}
        <div className="glass card-hover bento-card col-2">
          <p className={cardLabel}>Now</p>
          <ul className="mt-3 flex flex-col gap-3">
            {profile.now.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-body">
                <span className="pill-dot mt-1.5 shrink-0" />
                <T ko={item} en={profile.nowEn[i]} />
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
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

        {/* Activities */}
        <div className="glass card-hover bento-card col-3">
          <p className={cardLabel}>Activities</p>
          <ul className="mt-3 flex flex-col gap-3">
            {profile.activities.map((a, i) => (
              <li key={i}>
                <p className="text-[14px] text-fg"><T ko={a.title} en={profile.activitiesEn[i].title} /></p>
                <p className="text-[12px] text-muted-2">
                  <T
                    ko={[a.org, a.period].filter(Boolean).join(' · ')}
                    en={[profile.activitiesEn[i].org, profile.activitiesEn[i].period].filter(Boolean).join(' · ')}
                  />
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured projects (3개) + 전체 보기 */}
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} className="col-2" />
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
