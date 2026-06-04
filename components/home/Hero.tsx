import Link from 'next/link'
import { profile } from '@/content/profile'

export default function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <p className="font-mono text-sm text-accent">$ whoami</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted sm:text-xl">{profile.tagline}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/portfolio"
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
        >
          프로젝트 보기 →
        </Link>
        <a
          href="#contact"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-muted"
        >
          연락하기
        </a>
      </div>
    </section>
  )
}
