import Reveal from '@/components/Reveal'
import { profile } from '@/content/profile'
import T from '@/components/T'

export default function Timeline() {
  return (
    <>
      {profile.experience.length > 0 && (
        <section className="py-12 md:py-16">
          <Reveal><p className="section-label">Experience</p></Reveal>
          <Reveal stagger className="mt-7 flex flex-col gap-4">
            {profile.experience.map((e, i) => {
              const en = profile.experienceEn[i]
              return (
                <div key={`${e.org}-${e.period}`} className="glass flex flex-col gap-4 p-6 sm:flex-row">
                  <div className="text-[14px] font-medium text-accent sm:w-40 sm:shrink-0"><T ko={e.period} en={en.period} /></div>
                  <div>
                    <h3 className="font-semibold text-fg"><T ko={`${e.org} — ${e.role}`} en={`${en.org} — ${en.role}`} /></h3>
                    {e.summary && <p className="mt-2 text-[14px] leading-relaxed text-body"><T ko={e.summary} en={en.summary ?? ''} /></p>}
                    {e.highlights && e.highlights.length > 0 && (
                      <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-body">
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

      <section className="py-12 md:py-16">
        <Reveal><p className="section-label">Education</p></Reveal>
        <Reveal stagger className="mt-7 flex flex-col gap-4">
          {profile.education.map((e, i) => (
            <div key={`${e.org}-${e.period}`} className="glass flex flex-col gap-4 p-6 sm:flex-row">
              <div className="text-[14px] font-medium text-accent sm:w-40 sm:shrink-0"><T ko={e.period} en={profile.educationEn[i].period} /></div>
              <h3 className="font-semibold text-fg"><T ko={`${e.org} — ${e.degree}`} en={`${profile.educationEn[i].org} — ${profile.educationEn[i].degree}`} /></h3>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  )
}
