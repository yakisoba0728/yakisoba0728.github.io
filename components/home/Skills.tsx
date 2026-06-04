import Reveal from '@/components/Reveal'
import { profile } from '@/content/profile'

export default function Skills() {
  return (
    <section className="py-14">
      <Reveal><p className="section-label">// SKILLS</p></Reveal>
      <Reveal stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => (
          <div key={group.category} className="glass card-hover p-6">
            <h3 className="font-display text-base font-semibold">{group.category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="chip">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
