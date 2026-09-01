import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import Skills from '@/components/home/Skills'
import Timeline from '@/components/home/Timeline'
import { profile } from '@/content/profile'
import T from '@/components/T'

export const metadata: Metadata = { title: '자기소개', description: profile.bioShort }

export default function AboutPage() {
  return (
    <div className="py-8 md:py-12">
      <Reveal>
        <p className="section-label">About</p>
        <h1 className="t-display mt-3">
          <T ko={<>안녕하세요,<br /><span className="gradient-text">김동혁</span>입니다.</>} en={<>Hi, I&apos;m <span className="gradient-text">Donghyeok Kim</span>.</>} />
        </h1>
        <div className="mt-4 max-w-2xl space-y-3">
          {profile.bioLong.map((para, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-body"><T ko={para} en={profile.bioLongEn[i]} /></p>
          ))}
        </div>
      </Reveal>

      <Timeline />
      <Skills />
    </div>
  )
}
