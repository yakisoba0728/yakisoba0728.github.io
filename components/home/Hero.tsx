import Link from 'next/link'
import Reveal from '@/components/Reveal'
import T from '@/components/T'
import Magnetic from '@/components/Magnetic'
import KineticText from '@/components/KineticText'
import { profile } from '@/content/profile'

export default function Hero() {
  return (
    <section className="flex flex-col items-start gap-10 py-16 sm:py-20 md:flex-row md:items-center md:justify-between md:gap-12">
      <div className="flex flex-col">
        <Reveal>
          <span className="status-badge">
            <span className="status-dot" />
            <T ko="지금 협업 가능" en="Available for work" />
          </span>
        </Reveal>
        <Reveal>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,9vw,4.6rem)] font-extrabold leading-[1.02] tracking-tight">
            <T ko={profile.name} en={profile.nameEn} />
          </h1>
        </Reveal>

        {/* 서브 헤드라인 = 신념 (단어별 키네틱 등장) */}
        <KineticText
          as="h2"
          className="mt-5 text-[clamp(1.55rem,5.5vw,3rem)] font-bold leading-[1.16] tracking-tight"
          lines={profile.creedLines}
          linesEn={profile.creedLinesEn}
          highlight={profile.creedHighlight}
          highlightEn={profile.creedHighlightEn}
        />

        {/* 역할 = 칩 나열 */}
        <Reveal>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.roles.map((role, i) => (
              <span className="role-chip" key={i}>
                <T ko={role} en={profile.rolesEn[i]} />
              </span>
            ))}
          </div>
        </Reveal>

        {/* 기존 정체성(에이전틱 엔지니어)은 보조 리드로 유지 */}
        <Reveal>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted"><T ko={profile.tagline} en={profile.taglineEn} /></p>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Link href="/portfolio" className="btn-grad"><T ko="프로젝트 보기 →" en="View projects →" /></Link>
            </Magnetic>
            <Magnetic>
              <Link href="/about" className="btn-glass"><T ko="자기소개" en="About me" /></Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      {/* 프로필 아바타 — 신념 옆 */}
      <Reveal className="mx-auto shrink-0 md:mx-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatar.png"
          alt={profile.name}
          width={240}
          height={240}
          className="h-48 w-48 rounded-full object-cover ring-2 ring-accent/55 shadow-[0_0_54px_rgba(124,58,237,0.45)] md:h-60 md:w-60"
        />
      </Reveal>
    </section>
  )
}
