import Reveal from '@/components/Reveal'
import { profile } from '@/content/profile'

export default function Skills() {
  return (
    <section className="pt-5 pb-2 md:pt-6">
      <Reveal><p className="section-label">Skills</p></Reveal>
      <Reveal stagger className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => (
          <div key={group.category} className="glass card-hover p-4 md:p-5">
            <h3 className="text-[15px] font-semibold text-fg">{group.category}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span key={item} className="chip text-[12px]">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
