import { profile } from '@/content/profile'

export default function MarqueeV2() {
  const items = profile.skills.flatMap((g) => g.items)
  const loop = [...items, ...items]
  return (
    <div className="marquee marquee-lava" aria-hidden>
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
