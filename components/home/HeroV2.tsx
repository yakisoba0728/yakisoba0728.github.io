import Link from 'next/link'
import Reveal from '@/components/Reveal'
import T from '@/components/T'
import { profile } from '@/content/profile'
import CodeWindow from '@/components/CodeWindow'

export default function HeroV2() {
  return (
    <section className="grid items-start gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:py-24">
      {/* 좌: 헤드라인 + CTA */}
      <div>
        <Reveal>
          <span className="kao" aria-hidden="true">
            <span className="kao-open">꒰ᐢ. .ᐢ꒱</span>
            <span className="kao-shut">꒰ᐢ- -ᐢ꒱</span>
          </span>
        </Reveal>
        <Reveal>
          <h1 className="t-hero mt-2"><T ko={profile.name} en={profile.nameEn} /></h1>
        </Reveal>
        <Reveal>
          <p className="t-display-md mt-5">
            <T ko={profile.creedLines.join(' ')} en={profile.creedLinesEn.join(' ')} />
          </p>
        </Reveal>
        <Reveal>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-body"><T ko={profile.tagline} en={profile.taglineEn} /></p>
        </Reveal>
        <Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/portfolio" className="btn-grad"><T ko="프로젝트 보기" en="View work" /></Link>
            <Link href="/about" className="btn-glass"><T ko="자기소개" en="About me" /></Link>
          </div>
        </Reveal>
      </div>

      {/* 우: 코드 윈도우 (glass) */}
      <Reveal className="rv-right">
        <CodeWindow />
      </Reveal>
    </section>
  )
}
