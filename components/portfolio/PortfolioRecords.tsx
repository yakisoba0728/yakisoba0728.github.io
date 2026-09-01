'use client'

import { ChevronDown } from 'lucide-react'
import T from '@/components/T'
import { profile } from '@/content/profile'

const topcit = {
  title: 'TOPCIT',
  titleEn: 'TOPCIT',
  detail: '보유 여부 및 점수 미확인',
  detailEn: 'Possession and score not yet verified',
}

function RecordDetails({
  title,
  titleEn,
  meta,
  metaEn,
  children,
}: {
  title: string
  titleEn: string
  meta?: string
  metaEn?: string
  children: React.ReactNode
}) {
  return (
    <details className="group border-b border-border last:border-0">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-2/50 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold leading-snug text-fg">
            <T ko={title} en={titleEn} />
          </p>
          {(meta || metaEn) && (
            <p className="mt-1 text-[11px] text-muted">
              <T ko={meta ?? ''} en={metaEn ?? meta ?? ''} />
            </p>
          )}
        </div>
        <ChevronDown size={15} className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="border-t border-border bg-bg-2/40 px-4 py-3.5 text-[13px] leading-relaxed text-body">
        {children}
      </div>
    </details>
  )
}

export default function PortfolioRecords() {
  const credentials = [
    ...profile.credentials.map((credential) =>
      credential.title.startsWith('DIAT')
        ? {
            ...credential,
            detail: `${credential.detail} · 자격번호 DIAT-2023-008172`,
            detailEn: `${credential.detailEn} · certificate no. DIAT-2023-008172`,
          }
        : credential,
    ),
    topcit,
  ]
  const awards = [...profile.awards].sort((a, b) => b.year - a.year)
  const awardYears = [...new Set(awards.map((award) => award.year))].sort((a, b) => b - a)

  return (
    <section id="records" className="mt-14 border-t border-border pt-10">
      <div>
        <p className="section-label">Records</p>
        <h2 className="mt-3 text-[26px] font-bold tracking-[-0.02em] text-fg md:text-[32px]">
          <T ko="수상 · 자격 · 교육 · 활동" en="Awards, credentials, education & activity" />
        </h2>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-body">
          <T
            ko="항목을 누르면 상세 내용을 확인할 수 있습니다."
            en="Open any row to see more details."
          />
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
          <a href="#awards" className="chip transition-colors hover:border-border-2 hover:text-fg"><T ko="수상·대회" en="Awards & competitions" /></a>
          <a href="#credentials" className="chip transition-colors hover:border-border-2 hover:text-fg"><T ko="자격·증서" en="Credentials" /></a>
          <a href="#education" className="chip transition-colors hover:border-border-2 hover:text-fg"><T ko="교육" en="Education" /></a>
          <a href="#activity" className="chip transition-colors hover:border-border-2 hover:text-fg"><T ko="활동" en="Activity" /></a>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <section id="awards" className="glass overflow-hidden scroll-mt-24">
          <div className="border-b border-border px-4 py-3">
            <p className="section-label">Awards & Competitions</p>
          </div>
          {awardYears.map((year) => {
            const items = awards.filter((award) => award.year === year)
            return (
              <div key={year}>
                <div className="border-b border-border bg-bg-2/55 px-4 py-3 text-[14px] font-semibold text-accent">
                  {year}
                </div>
                {items.map((award) => (
                  <RecordDetails
                    key={`${award.year}-${award.title}`}
                    title={award.title}
                    titleEn={award.titleEn}
                    meta={[award.result, award.detail].filter(Boolean).join(' · ')}
                    metaEn={[award.resultEn, award.detailEn].filter(Boolean).join(' · ')}
                  >
                    <p className="font-medium text-fg"><T ko={award.result} en={award.resultEn} /></p>
                    {award.detail && <p className="mt-1"><T ko={award.detail} en={award.detailEn ?? award.detail} /></p>}
                  </RecordDetails>
                ))}
              </div>
            )
          })}
        </section>

        <div className="grid content-start gap-4">
          <section id="credentials" className="glass overflow-hidden scroll-mt-24">
            <div className="border-b border-border px-4 py-3">
              <p className="section-label">Credentials</p>
            </div>
            {credentials.map((credential) => (
              <RecordDetails
                key={credential.title}
                title={credential.title}
                titleEn={credential.titleEn}
                meta={credential.detail}
                metaEn={credential.detailEn}
              >
                <p><T ko={credential.detail} en={credential.detailEn} /></p>
              </RecordDetails>
            ))}
          </section>

          <section id="education" className="glass overflow-hidden scroll-mt-24">
            <div className="border-b border-border px-4 py-3">
              <div>
                <p className="section-label">Education</p>
                <p className="mt-1 text-[11px] text-muted">
                  <T ko="정보보호영재교육원 2023–2026 · 4년 연속" en="Information Security Gifted Education · 2023–2026, four consecutive years" />
                </p>
              </div>
            </div>
            {profile.education.map((item, index) => {
              const en = profile.educationEn[index]
              return (
                <RecordDetails
                  key={`${item.org}-${item.period}`}
                  title={item.org}
                  titleEn={en.org}
                  meta={`${item.degree} · ${item.period}`}
                  metaEn={`${en.degree} · ${en.period}`}
                >
                  <p><T ko={item.degree} en={en.degree} /></p>
                  <p className="mt-1 text-[12px] text-muted"><T ko={item.period} en={en.period} /></p>
                </RecordDetails>
              )
            })}
          </section>

          <section id="activity" className="glass overflow-hidden scroll-mt-24">
            <div className="border-b border-border px-4 py-3">
              <p className="section-label">Selected Activity</p>
            </div>
            {profile.publicActivities.map((activity) => (
              <RecordDetails
                key={`${activity.year}-${activity.title}`}
                title={`${activity.year} · ${activity.title}`}
                titleEn={`${activity.year} · ${activity.titleEn}`}
                meta={activity.source}
                metaEn={activity.sourceEn}
              >
                <p><T ko={activity.detail} en={activity.detailEn} /></p>
              </RecordDetails>
            ))}
          </section>
        </div>
      </div>
    </section>
  )
}
