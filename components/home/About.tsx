import { profile } from '@/content/profile'

export default function About() {
  return (
    <section className="border-t border-border py-16">
      <p className="font-mono text-sm text-accent-2">// about</p>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-fg/90">{profile.bioShort}</p>
    </section>
  )
}
