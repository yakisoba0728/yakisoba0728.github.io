import { profile } from '@/content/profile'

export default function Marquee() {
  const items = profile.skills.flatMap((g) => g.items)
  const loop = [...items, ...items]
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
