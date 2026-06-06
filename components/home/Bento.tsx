import Link from 'next/link'
import Reveal from '@/components/Reveal'
import Tilt from '@/components/Tilt'
import ProjectCard from '@/components/ProjectCard'
import T from '@/components/T'
import { profile } from '@/content/profile'
import { getFeaturedProjects } from '@/lib/content'

export default function Bento() {
  const projects = getFeaturedProjects().slice(0, 3)
  return (
    <section className="py-10">
      <Reveal>
        <p className="section-label">{'// OVERVIEW'}</p>
      </Reveal>
      <Reveal stagger className="bento mt-6">
        {/* About */}
        <Tilt className="glass bento-card col-4">
          <p className="section-label">{'// ABOUT'}</p>
          <p className="mt-4 text-lg leading-relaxed text-fg/90"><T ko={profile.bioShort} en={profile.bioShortEn} /></p>
          <Link href="/about" className="mt-4 inline-block text-sm text-accent-2 hover:underline">
            <T ko="자기소개 더 보기 →" en="More about me →" />
          </Link>
        </Tilt>

        {/* Now */}
        <Tilt className="glass bento-card col-2">
          <p className="section-label">{'// NOW'}</p>
          <ul className="mt-4 flex flex-col gap-3">
            {profile.now.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span className="pill-dot mt-1.5 shrink-0" />
                <T ko={item} en={profile.nowEn[i]} />
              </li>
            ))}
          </ul>
        </Tilt>

        {/* Skills */}
        <Tilt className="glass bento-card col-3">
          <p className="section-label">{'// SKILLS'}</p>
          <div className="mt-4 flex flex-col gap-4">
            {profile.skills.map((group) => (
              <div key={group.category}>
                <h4 className="mb-2 font-display text-sm text-fg">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Tilt>

        {/* Activities */}
        <Tilt className="glass bento-card col-3">
          <p className="section-label">{'// ACTIVITIES'}</p>
          <ul className="mt-4 flex flex-col gap-3">
            {profile.activities.map((a, i) => (
              <li key={i}>
                <p className="text-sm text-fg"><T ko={a.title} en={profile.activitiesEn[i].title} /></p>
                <p className="font-display text-xs text-muted-2">
                  <T
                    ko={[a.org, a.period].filter(Boolean).join(' · ')}
                    en={[profile.activitiesEn[i].org, profile.activitiesEn[i].period].filter(Boolean).join(' · ')}
                  />
                </p>
              </li>
            ))}
          </ul>
        </Tilt>

        {/* Featured projects */}
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} className="col-2" />
        ))}
      </Reveal>
    </section>
  )
}
