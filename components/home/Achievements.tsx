import { ExternalLink } from 'lucide-react'
import Reveal from '@/components/Reveal'
import T from '@/components/T'
import { profile } from '@/content/profile'

export default function Achievements() {
  const years = [...new Set(profile.awards.map((award) => award.year))].sort((a, b) => b - a)

  return (
    <section className="mt-8 md:mt-10">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="section-label">Awards &amp; Competitions</p>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-body">
              <T
                ko="정보보호·CTF·프로그래밍·연구 대회에서의 수상과 본선 진출 이력입니다. 공개 자료가 있는 항목은 증빙 링크를 함께 표시했습니다."
                en="Awards and finalist results across cybersecurity, CTF, programming, and research competitions. Public evidence is linked where available."
              />
            </p>
          </div>
          <span className="chip text-[12px]">
            <T ko={`총 ${profile.awards.length}건`} en={`${profile.awards.length} records`} />
          </span>
        </div>
      </Reveal>

      <Reveal stagger className="mt-4 grid gap-3 lg:grid-cols-3">
        {years.map((year) => {
          const items = profile.awards.filter((award) => award.year === year)
          return (
            <div key={year} className="glass overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-[16px] font-semibold text-fg">{year}</span>
                <span className="text-[12px] text-muted">{items.length}</span>
              </div>
              <div className="divide-y divide-border">
                {items.map((award) => (
                  <article key={`${award.year}-${award.title}`} className="p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge-yellow normal-case tracking-normal">{award.result}</span>
                      {award.resultEn !== award.result && (
                        <span className="t-en text-[11px] font-semibold text-accent">{award.resultEn}</span>
                      )}
                    </div>
                    <h3 className="mt-2 text-[14px] font-semibold leading-snug text-fg">
                      <T ko={award.title} en={award.titleEn} />
                    </h3>
                    {award.detail && (
                      <p className="mt-1 text-[12px] leading-relaxed text-body">
                        <T ko={award.detail} en={award.detailEn ?? award.detail} />
                      </p>
                    )}
                    <div className="mt-2 text-[11px] text-muted">
                      {award.evidenceUrl ? (
                        <a
                          href={award.evidenceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                        >
                          <T ko={award.evidence} en={award.evidenceEn} />
                          <ExternalLink size={11} />
                        </a>
                      ) : (
                        <T ko={award.evidence} en={award.evidenceEn} />
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )
        })}
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
                  <p className="mt-1 text-[11px] text-muted">
                    <T ko={credential.evidence} en={credential.evidenceEn} />
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
                  {activity.url && (
                    <a
                      href={activity.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-accent hover:underline"
                    >
                      <T ko={activity.source ?? '기사 보기'} en={activity.sourceEn ?? 'View coverage'} />
                      <ExternalLink size={12} />
                    </a>
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
