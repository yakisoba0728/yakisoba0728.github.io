'use client'

import { useEffect, useRef, useState } from 'react'

export type CounterItem = { label: string; value: number; suffix?: string }

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = setTimeout(() => setN(to), 0)
      return () => clearTimeout(id)
    }
    let cur = 0
    const step = Math.max(1, Math.ceil(to / 40))
    const iv = setInterval(() => {
      cur += step
      if (cur >= to) {
        cur = to
        clearInterval(iv)
      }
      setN(cur)
    }, 26)
    return () => clearInterval(iv)
  }, [to, run])
  return <>{n}</>
}

export default function Counters({ items }: { items: CounterItem[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRun(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div className="counters" ref={ref}>
      {items.map((it) => (
        <div className="glass counter" key={it.label}>
          <div className="counter-num gradient-text">
            <CountUp to={it.value} run={run} />
            {it.suffix}
          </div>
          <div className="counter-label">{it.label}</div>
        </div>
      ))}
    </div>
  )
}
