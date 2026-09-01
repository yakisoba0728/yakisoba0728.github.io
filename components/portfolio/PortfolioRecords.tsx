'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import T from '@/components/T'
import { profile } from '@/content/profile'
import { educationDegree } from '@/lib/education'

type Tab = 'awards' | 'credentials' | 'education' | 'activity'

const tabs: { id: Tab; ko: string; en: string }[] = [
  { id: 'awards', ko: '수상 · 대회', en: 'Awards' },
  { id: 'credentials', ko: '자격 · 증서', en: 'Credentials' },
  { id: 'education', ko: '교육', en: 'Education' },
  { id: 'activity', ko: '활동', en: 'Activity' },
]

const topcit = {
  title: 'TOPCIT',
  titleEn: 'TOPCIT',
  detail: '보유 여부 및 점수 미확인',
  detailEn: 'Possession and score not yet verified',
}

function ExpandableRow({
  period,
  title,
  titleEn,
  result,
  resultEn,
  detail,
  detailEn,
}: {
  period: string
  title: string
  titleEn: string
  result?: string
  resultEn?: string
  detail?: string
  detailEn?: string
}) {
  const hasDetail = Boolean(detail || detailEn)

  if (!hasDetail) {
    return (
      <div className="grid gap-1.5 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[92px_1fr] sm:gap-4 md:px-5">
        <div className="text-[12px] font-medium text-accent">{period}</div>
        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <p className="text-[14px] font-semibold leading-snug text-fg"><T ko={title} en={titleEn} /></p>
          {result && (
            <p className="shrink-0 text-[12px] font-medium text-muted"><T ko={result} en={resultEn ?? result} /></p>
          )}
        </div>
      </div>
    )
  }

  return (
    <details className="group border-b border-border last:border-b-0">
      <summary className="grid cursor-pointer list-none gap-1.5 px-4 py-3 transition-colors hover:bg-surface-2/40 sm:grid-cols-[92px_1fr] sm:gap-4 md:px-5 [&::-webkit-details-marker]:hidden">
        <div className="text-[12px] font-medium text-accent">{period}</div>
        <div className="flex min-w-0 items-start gap-3">
          <div className="min-w-0 flex-1 sm:flex sm:justify-between sm:gap-4">
            <p className="text-[14px] font-semibold leading-snug text-fg"><T ko={title} en={titleEn} /></p>
            {result && (
              <p className="mt-1 shrink-0 text-[12px] font-medium text-muted sm:mt-0"><T ko={result} en={resultEn ?? result} /></p>
            )}
          </div>
          <ChevronDown size={14} className="mt-0.5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
        </div>
      </summary>
      <div className="border-t border-border bg-bg-2/35 px-4 py-3 text-[12px] leading-relaxed text-body sm:pl-[128px] md:pr-5">
        <T ko={detail ?? ''} en={detailEn ?? detail ?? ''} />
      </div>
    </details>
  )
}

export default function PortfolioRecords() {
  const [active, setActive] = useState<Tab>('awards')

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

  const credentialPeriod = (title: string) => {
    if (title.startsWith('DIAT')) return '2023'
    if (title.includes('정보보호영재교육원')) return '2025'
    if (title.includes('입학성적')) return '2026'
    if (title === 'TOPCIT') return '—'
    return '—'
  }

  return (
    <section id="records" className="mt-10 border-t border-border pt-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-label">Resume</p>
          <h2 className="mt-2 text-[24px] font-bold tracking-[-0.02em] text-fg md:text-[28px]">
            <T ko="이력" en="Background" />
          </h2>
        </div>

        <div className="flex gap-5 overflow-x-auto border-b border-border text-[13px]" role="tablist" aria-label="Portfolio records">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative shrink-0 pb-2 font-medium transition-colors ${
                active === tab.id ? 'text-fg' : 'text-muted hover:text-body'
              }`}
            >
              <T ko={tab.ko} en={tab.en} />
              {active === tab.id && <span className="absolute inset-x-0 -bottom-px h-px bg-accent" />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface/60">
        {active === 'awards' && (
          <div role="tabpanel">
            {[...profile.awards]
              .sort((a, b) => b.year - a.year)
              .map((award) => (
                <ExpandableRow
                  key={`${award.year}-${award.title}`}
                  period={String(award.year)}
                  title={award.title}
                  titleEn={award.titleEn}
                  result={award.result}
                  resultEn={award.resultEn}
                  detail={award.detail}
                  detailEn={award.detailEn}
                />
              ))}
          </div>
        )}

        {active === 'credentials' && (
          <div role="tabpanel">
            {credentials.map((credential) => (
              <ExpandableRow
                key={credential.title}
                period={credentialPeriod(credential.title)}
                title={credential.title}
                titleEn={credential.titleEn}
                result={credential.detail}
                resultEn={credential.detailEn}
              />
            ))}
          </div>
        )}

        {active === 'education' && (
          <div role="tabpanel">
            {profile.education.map((item, index) => {
              const en = profile.educationEn[index]
              const degreeKo = educationDegree(item.org, item.period, item.degree, 'ko')
              const degreeEn = educationDegree(en.org, en.period, en.degree, 'en')
              return (
                <ExpandableRow
                  key={`${item.org}-${item.period}`}
                  period={item.period}
                  title={`${item.org} — ${degreeKo}`}
                  titleEn={`${en.org} — ${degreeEn}`}
                />
              )
            })}
          </div>
        )}

        {active === 'activity' && (
          <div role="tabpanel">
            {profile.publicActivities.map((activity) => (
              <ExpandableRow
                key={`${activity.year}-${activity.title}`}
                period={String(activity.year)}
                title={activity.title}
                titleEn={activity.titleEn}
                result={activity.source}
                resultEn={activity.sourceEn}
                detail={activity.detail}
                detailEn={activity.detailEn}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
