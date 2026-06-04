import Link from 'next/link'
import Reveal from '@/components/Reveal'
import Typing from '@/components/Typing'
import { profile } from '@/content/profile'

export default function Hero() {
  return (
    <section className="flex min-h-[78vh] flex-col justify-center py-16">
      <Reveal>
        <span className="pill"><span className="pill-dot" /> 지금 협업 가능</span>
      </Reveal>
      <Reveal>
        <p className="mt-6 font-display text-lg font-medium text-muted">{profile.name}</p>
        <h1 className="mt-2 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          <span className="gradient-text">{profile.tagline}</span>
        </h1>
      </Reveal>
      <Reveal>
        <p className="mt-4 font-display text-base text-accent-2">
          <Typing phrases={profile.roles} phrasesEn={profile.rolesEn} />
        </p>
      </Reveal>
      <Reveal>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{profile.lead}</p>
      </Reveal>
      <Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/portfolio" className="btn-grad">프로젝트 보기 →</Link>
          <Link href="/about" className="btn-glass">자기소개</Link>
        </div>
      </Reveal>
    </section>
  )
}
