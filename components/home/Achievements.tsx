import Reveal from '@/components/Reveal'
import T from '@/components/T'
import { profile } from '@/content/profile'

export default function Achievements() {
  const years = [...new Set(profile.awards.map((award) => award.year))].sort((a, b) => b - a)

  return (
    <section className="mt-8 md:mt-10">
      <Reveal>
        <p className="section-label">Awards &amp; Competitions</p>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-body">
          <T
            ko="정보보호·CTF·프로그래밍·연구 대회에서의 수상과 본선 진출 이력입니다."
            en="Awards and finalist results across cybersecurity, CTF, programming, and research competitions."
          />
        </p>
      </Reveal>

      <Reveal className="mt-4">
        <div className="glass overflow-hidden">
          {years.map((year) => {
            const items = profile.awards.filter((award) => award.year === year)
            return (
              <div key={year}>
                <div className="border-b border-border bg-bg-2/55 px-4 py-3 text-[15px] font-semibold text-accent">
                  {year}
                </div>
                <div className="divide-y divide-border">
                  {items.map((award) => (
                    <article
                      key={`${award.year}-${award.title}`}
                      className="grid gap-2 px-4 py-3.5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-5"
                    >
                      <div className="min-w-0">
                        <h3 className="text-[14px] font-semibold leading-snug text-fg">
                          <T ko={award.title} en={award.titleEn} />
                        </h3>
                        {award.detail && (
                          <p className="mt-1 text-[12px] leading-relaxed text-body">
                            <T ko={award.detail} en={award.detailEn ?? award.detail} />
                          </p>
                        )}
                      </div>
                      <div className="text-left text-[12px] font-semibold text-accent sm:text-right">
                        <T ko={award.result} en={award.resultEn} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        <Reveal>
          <div className="glass overflow-hidden">
            <div className="border-b border-border px-4 py-3">
              <p className="section-label">Credentials</p>
            </div>
            <div className="divide-y divide-border">
              {profile.credentials.map((credential) => (
                <div key={credential.title} className="px-4 py-3">
                  <h3 className="text-[14px] font-semibold text-fg">
                    <T ko={credential.title} en={credential.titleEn} />
                  </h3>
                  <p className="mt-1 text-[12px] text-body">
                    <T ko={credential.detail} en={credential.detailEn} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="glass overflow-hidden">
            <div className="border-b border-border px-4 py-3">
              <p className="section-label">Selected Activity</p>
            </div>
            <div className="divide-y divide-border">
              {profile.publicActivities.map((activity) => (
                <article key={`${activity.year}-${activity.title}`} className="px-4 py-4">
                  <div className="text-[12px] font-medium text-accent">{activity.year}</div>
                  <h3 className="mt-1 text-[15px] font-semibold text-fg">
                    <T ko={activity.title} en={activity.titleEn} />
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-body">
                    <T ko={activity.detail} en={activity.detailEn} />
                  </p>
                  {(activity.source || activity.sourceEn) && (
                    <p className="mt-2 text-[11px] text-muted">
                      <T ko={activity.source ?? ''} en={activity.sourceEn ?? activity.source ?? ''} />
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
