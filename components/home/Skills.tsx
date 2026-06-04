import { profile } from '@/content/profile'

export default function Skills() {
  return (
    <section className="border-t border-border py-16">
      <p className="font-mono text-sm text-accent-2">{"// skills"}</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => (
          <div key={group.category} className="rounded-lg border border-border bg-surface p-5">
            <h3 className="font-mono text-sm text-accent">{group.category}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border px-2.5 py-1 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
