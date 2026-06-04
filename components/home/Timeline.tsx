import Reveal from '@/components/Reveal'
import { profile } from '@/content/profile'
import T from '@/components/T'

export default function Timeline() {
  return (
    <>
      {profile.experience.length > 0 && (
        <section className="py-10">
          <Reveal><p className="section-label">{'// EXPERIENCE'}</p></Reveal>
          <Reveal stagger className="mt-6 flex flex-col gap-4">
            {profile.experience.map((e, i) => (
              <div key={i} className="glass flex flex-col gap-4 p-6 sm:flex-row">
                <div className="font-display text-sm text-accent-2 sm:w-40 sm:shrink-0">{e.period}</div>
                <div>
                  <h3 className="font-semibold text-fg">{e.role} · {e.org}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{e.summary}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </section>
      )}

      <section className="py-10">
        <Reveal><p className="section-label">{'// EDUCATION'}</p></Reveal>
        <Reveal stagger className="mt-6 flex flex-col gap-4">
          {profile.education.map((e, i) => (
            <div key={i} className="glass flex flex-col gap-4 p-6 sm:flex-row">
              <div className="font-display text-sm text-accent-2 sm:w-40 sm:shrink-0"><T ko={e.period} en={profile.educationEn[i].period} /></div>
              <h3 className="font-semibold text-fg"><T ko={`${e.degree} · ${e.org}`} en={`${profile.educationEn[i].degree} · ${profile.educationEn[i].org}`} /></h3>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  )
}
