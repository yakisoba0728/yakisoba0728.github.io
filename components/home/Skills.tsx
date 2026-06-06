import Reveal from '@/components/Reveal'
import { profile } from '@/content/profile'

export default function Skills() {
  return (
    <section className="py-12 md:py-16">
      <Reveal><p className="section-label">Skills</p></Reveal>
      <Reveal stagger className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => (
          <div key={group.category} className="glass card-hover p-6">
            <h3 className="text-[16px] font-semibold text-fg">{group.category}</h3>
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
