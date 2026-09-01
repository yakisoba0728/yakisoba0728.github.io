import Reveal from '@/components/Reveal'
import T from '@/components/T'
import { profile } from '@/content/profile'

const credentials = [
  ...profile.credentials.map((credential) =>
    credential.title.startsWith('DIAT')
      ? {
          ...credential,
          year: '2023',
          detail: `${credential.detail} · 자격번호 DIAT-2023-008172`,
          detailEn: `${credential.detailEn} · certificate no. DIAT-2023-008172`,
        }
      : credential.title.includes('정보보호영재교육원')
        ? { ...credential, year: '2025' }
        : credential.title.includes('입학성적')
          ? { ...credential, year: '2026' }
          : { ...credential, year: '—' },
  ),
  {
    title: 'TOPCIT',
    titleEn: 'TOPCIT',
    detail: '보유 여부 및 점수 미확인',
    detailEn: 'Possession and score not yet verified',
    evidence: '미확인',
    evidenceEn: 'Unverified',
    year: '—',
  },
].sort((a, b) => {
  const ay = a.year === '—' ? -1 : Number(a.year)
  const by = b.year === '—' ? -1 : Number(b.year)
  return by - ay
})

function awardTeam(detail?: string) {
  if (!detail) return null
  return detail.match(/OxB4DC0DE|CURIOUS|Curious/)?.[0] ?? null
}

export default function Achievements() {
  const awards = [...profile.awards].sort((a, b) => b.year - a.year)
  const activities = [...profile.publicActivities].sort((a, b) => b.year - a.year)

  return (
    <>
      <section className="pt-5 pb-4 md:pt-6 md:pb-5">
        <Reveal><p className="section-label">Awards &amp; Competitions</p></Reveal>
        <Reveal stagger className="mt-4 overflow-hidden rounded-xl border border-border bg-surface/60">
          {awards.map((award, index) => {
            const showYear = index === 0 || awards[index - 1].year !== award.year
            const team = awardTeam(award.detail)
            return (
              <div
                key={`${award.year}-${award.title}`}
                className="grid gap-1.5 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[120px_1fr] sm:gap-4 md:px-5"
              >
                <div className="text-[13px] font-medium text-accent">{showYear ? award.year : ''}</div>
                <div className="min-w-0">
                  <h3 className="text-[14px] font-semibold leading-snug text-fg">
                    <T ko={`${award.title} — ${award.result}`} en={`${award.titleEn} — ${award.resultEn}`} />
                  </h3>
                  {team && <p className="mt-1 text-[12px] leading-relaxed text-muted">{team}</p>}
                </div>
              </div>
            )
          })}
        </Reveal>
      </section>

      <section className="pt-5 pb-4 md:pt-6 md:pb-5">
        <Reveal><p className="section-label">Credentials</p></Reveal>
        <Reveal stagger className="mt-4 overflow-hidden rounded-xl border border-border bg-surface/60">
          {credentials.map((credential, index) => {
            const showYear = index === 0 || credentials[index - 1].year !== credential.year
            return (
              <div
                key={credential.title}
                className="grid gap-1.5 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[120px_1fr] sm:gap-4 md:px-5"
              >
                <div className="text-[13px] font-medium text-accent">{showYear ? credential.year : ''}</div>
                <h3 className="text-[14px] font-semibold leading-snug text-fg">
                  <T ko={`${credential.title} — ${credential.detail}`} en={`${credential.titleEn} — ${credential.detailEn}`} />
                </h3>
              </div>
            )
          })}
        </Reveal>
      </section>

      {activities.length > 0 && (
        <section className="pt-5 pb-4 md:pt-6 md:pb-5">
          <Reveal><p className="section-label">Activity</p></Reveal>
          <Reveal stagger className="mt-4 overflow-hidden rounded-xl border border-border bg-surface/60">
            {activities.map((activity, index) => {
              const showYear = index === 0 || activities[index - 1].year !== activity.year
              return (
                <div
                  key={`${activity.year}-${activity.title}`}
                  className="grid gap-1.5 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[120px_1fr] sm:gap-4 md:px-5"
                >
                  <div className="text-[13px] font-medium text-accent">{showYear ? activity.year : ''}</div>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-semibold leading-snug text-fg">
                      <T
                        ko={`${activity.title}${activity.source ? ` — ${activity.source}` : ''}`}
                        en={`${activity.titleEn}${activity.sourceEn ? ` — ${activity.sourceEn}` : ''}`}
                      />
                    </h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted">
                      <T ko={activity.detail} en={activity.detailEn} />
                    </p>
                  </div>
                </div>
              )
            })}
          </Reveal>
        </section>
      )}
    </>
  )
}
