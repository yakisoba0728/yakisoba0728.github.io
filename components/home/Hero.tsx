import Link from 'next/link'
import Reveal from '@/components/Reveal'
import Typing from '@/components/Typing'
import T from '@/components/T'
import { profile } from '@/content/profile'

export default function Hero() {
  return (
    <section className="flex min-h-[78vh] flex-col justify-center py-16">
      <Reveal>
        <span className="pill"><span className="pill-dot" /> <T ko="지금 협업 가능" en="Available for work" /></span>
      </Reveal>
      <Reveal>
        <p className="mt-6 font-display text-lg font-medium text-muted"><T ko={profile.name} en={profile.nameEn} /></p>
        <h1 className="mt-2 text-[clamp(2rem,8vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
          <span className="gradient-text"><T ko={profile.tagline} en={profile.taglineEn} /></span>
        </h1>
      </Reveal>
      <Reveal>
        <p className="mt-4 font-display text-base text-accent-2">
          <Typing phrases={profile.roles} phrasesEn={profile.rolesEn} />
        </p>
      </Reveal>
      <Reveal>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted"><T ko={profile.lead} en={profile.leadEn} /></p>
      </Reveal>
      <Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/portfolio" className="btn-grad"><T ko="프로젝트 보기 →" en="View projects →" /></Link>
          <Link href="/about" className="btn-glass"><T ko="자기소개" en="About me" /></Link>
        </div>
      </Reveal>
    </section>
  )
}
