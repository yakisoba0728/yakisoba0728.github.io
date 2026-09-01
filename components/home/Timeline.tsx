import Reveal from '@/components/Reveal'
import { profile } from '@/content/profile'
import T from '@/components/T'

export default function Timeline() {
  return (
    <>
      {profile.experience.length > 0 && (
        <section className="pt-8 pb-4 md:pt-10 md:pb-5">
          <Reveal><p className="section-label">Experience</p></Reveal>
          <Reveal stagger className="mt-4 overflow-hidden rounded-xl border border-border bg-surface/60">
            {profile.experience.map((e, i) => {
              const en = profile.experienceEn[i]
              return (
                <div
                  key={`${e.org}-${e.period}`}
                  className="grid gap-2 border-b border-border px-4 py-4 last:border-b-0 sm:grid-cols-[120px_1fr] sm:gap-4 md:px-5"
                >
                  <div className="text-[13px] font-medium text-accent"><T ko={e.period} en={en.period} /></div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-fg"><T ko={`${e.org} — ${e.role}`} en={`${en.org} — ${en.role}`} /></h3>
                    {e.summary && <p className="mt-1.5 text-[13px] leading-relaxed text-body"><T ko={e.summary} en={en.summary ?? ''} /></p>}
                    {e.highlights && e.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1 text-[13px] leading-relaxed text-body">
                        {e.highlights.map((item, j) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-accent">•</span>
                            <T ko={item} en={en.highlights?.[j] ?? item} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )
            })}
          </Reveal>
        </section>
      )}

      <section className="pt-5 pb-4 md:pt-6 md:pb-5">
        <Reveal><p className="section-label">Education</p></Reveal>
        <Reveal stagger className="mt-4 overflow-hidden rounded-xl border border-border bg-surface/60">
          {profile.education.map((e, i) => (
            <div
              key={`${e.org}-${e.period}`}
              className="grid gap-1.5 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[120px_1fr] sm:gap-4 md:px-5"
            >
              <div className="text-[13px] font-medium text-accent"><T ko={e.period} en={profile.educationEn[i].period} /></div>
              <h3 className="text-[14px] font-semibold leading-snug text-fg"><T ko={`${e.org} — ${e.degree}`} en={`${profile.educationEn[i].org} — ${profile.educationEn[i].degree}`} /></h3>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  )
}
