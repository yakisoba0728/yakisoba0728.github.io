import { ChevronDown, ExternalLink } from 'lucide-react'
import T from '@/components/T'
import { profile } from '@/content/profile'

const topcit = {
  title: 'TOPCIT',
  titleEn: 'TOPCIT',
  detail: '보유 여부 및 점수 미확인',
  detailEn: 'Possession and score not yet verified',
  evidence: '미확인',
  evidenceEn: 'Unverified',
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

  return (
    <section id="records" className="mt-14 border-t border-border pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-label">Records</p>
          <h2 className="mt-3 text-[26px] font-bold tracking-[-0.02em] text-fg md:text-[32px]">
            <T ko="수상 · 자격 · 교육 · 활동" en="Awards, credentials, education & activity" />
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-body">
            <T
              ko="항목을 누르면 상세 내용과 증빙 상태를 확인할 수 있습니다. 미확인 항목도 확인된 범위 그대로 표시합니다."
              en="Open any row to see details and evidence status. Unverified items are explicitly marked as such."
            />
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="chip"><T ko={`수상·대회 ${awards.length}`} en={`${awards.length} awards & competitions`} /></span>
          <span className="chip"><T ko={`자격·증서 ${credentials.length}`} en={`${credentials.length} credentials`} /></span>
          <span className="chip"><T ko={`교육 ${profile.education.length}`} en={`${profile.education.length} education records`} /></span>
          <span className="chip"><T ko={`활동 ${profile.publicActivities.length}`} en={`${profile.publicActivities.length} public activity`} /></span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <section id="awards" className="glass overflow-hidden scroll-mt-24">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="section-label">Awards & Competitions</p>
            <span className="text-[11px] text-muted">{awards.length}</span>
          </div>
          {awards.map((award) => (
            <RecordDetails
              key={`${award.year}-${award.title}`}
              title={`${award.year} · ${award.title}`}
              titleEn={`${award.year} · ${award.titleEn}`}
              meta={[award.result, award.detail].filter(Boolean).join(' · ')}
              metaEn={[award.resultEn, award.detailEn].filter(Boolean).join(' · ')}
            >
              <p className="font-medium text-fg"><T ko={award.result} en={award.resultEn} /></p>
              {award.detail && <p className="mt-1"><T ko={award.detail} en={award.detailEn ?? award.detail} /></p>}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-muted">
                <span><T ko={`증빙: ${award.evidence}`} en={`Evidence: ${award.evidenceEn}`} /></span>
                {award.evidenceUrl && (
                  <a
                    href={award.evidenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                  >
                    <T ko="공개 자료 보기" en="View public evidence" />
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </RecordDetails>
          ))}
        </section>

        <div className="grid content-start gap-4">
          <section id="credentials" className="glass overflow-hidden scroll-mt-24">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="section-label">Credentials</p>
              <span className="text-[11px] text-muted">{credentials.length}</span>
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
                <p className="mt-2 text-[12px] text-muted">
                  <T ko={`증빙: ${credential.evidence}`} en={`Evidence: ${credential.evidenceEn}`} />
                </p>
              </RecordDetails>
            ))}
          </section>

          <section id="education" className="glass overflow-hidden scroll-mt-24">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="section-label">Education</p>
                <p className="mt-1 text-[11px] text-muted">
                  <T ko="정보보호영재교육원 2023–2026 · 4년 연속" en="Information Security Gifted Education · 2023–2026, four consecutive years" />
                </p>
              </div>
              <span className="text-[11px] text-muted">{profile.education.length}</span>
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
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="section-label">Selected Activity</p>
              <span className="text-[11px] text-muted">{profile.publicActivities.length}</span>
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
                {activity.url && (
                  <a
                    href={activity.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-accent hover:underline"
                  >
                    <T ko={activity.source ?? '기사 보기'} en={activity.sourceEn ?? 'View coverage'} />
                    <ExternalLink size={11} />
                  </a>
                )}
              </RecordDetails>
            ))}
          </section>
        </div>
      </div>
    </section>
  )
}
