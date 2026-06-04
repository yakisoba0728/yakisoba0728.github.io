import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import Skills from '@/components/home/Skills'
import Timeline from '@/components/home/Timeline'
import { profile } from '@/content/profile'

export const metadata: Metadata = { title: '자기소개', description: profile.bioShort }

export default function AboutPage() {
  return (
    <div className="py-16">
      <section className="py-10">
        <Reveal>
          <p className="section-label">{'// ABOUT'}</p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            안녕하세요,<br /><span className="gradient-text">{profile.name}</span>입니다.
          </h1>
          {profile.bioLong.map((para, i) => (
            <p key={i} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{para}</p>
          ))}
        </Reveal>
      </section>
      <Skills />
      <Timeline />
    </div>
  )
}
