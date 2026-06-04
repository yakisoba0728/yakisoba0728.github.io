import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { profile } from '@/content/profile'

export default function About() {
  return (
    <section className="py-14">
      <Reveal>
        <p className="section-label">// ABOUT</p>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-fg/90">{profile.bioShort}</p>
        <Link href="/about" className="mt-5 inline-block text-sm text-accent-2 hover:underline">
          자기소개 더 보기 →
        </Link>
      </Reveal>
    </section>
  )
}
