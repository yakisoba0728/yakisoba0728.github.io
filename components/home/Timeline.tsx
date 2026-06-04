import { profile } from '@/content/profile'

export default function Timeline() {
  return (
    <section className="border-t border-border py-16">
      <p className="font-mono text-sm text-accent-2">{"// experience"}</p>
      <ol className="mt-6 space-y-6 border-l border-border pl-6">
        {profile.experience.map((e, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="font-mono text-xs text-muted">{e.period}</p>
            <h3 className="mt-1 font-semibold text-fg">
              {e.role} · {e.org}
            </h3>
            <p className="mt-1 text-sm text-muted">{e.summary}</p>
          </li>
        ))}
      </ol>

      <p className="mt-12 font-mono text-sm text-accent-2">{"// education"}</p>
      <ol className="mt-6 space-y-6 border-l border-border pl-6">
        {profile.education.map((e, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-2" />
            <p className="font-mono text-xs text-muted">{e.period}</p>
            <h3 className="mt-1 font-semibold text-fg">
              {e.degree} · {e.org}
            </h3>
          </li>
        ))}
      </ol>
    </section>
  )
}
