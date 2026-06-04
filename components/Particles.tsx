'use client'

import { useEffect, useRef } from 'react'

export default function Particles({ count = 22 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = ref.current
    if (!host) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const frag = document.createDocumentFragment()
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span')
      p.className = 'particle'
      const size = Math.random() * 3 + 1.5
      p.style.width = `${size}px`
      p.style.height = `${size}px`
      p.style.left = `${Math.random() * 100}%`
      p.style.animationDuration = `${Math.random() * 14 + 12}s`
      p.style.animationDelay = `${Math.random() * 12}s`
      p.style.background = i % 2 ? 'var(--color-accent-2)' : 'var(--color-accent)'
      frag.appendChild(p)
    }
    host.appendChild(frag)
    return () => {
      host.replaceChildren()
    }
  }, [count])
  return <div className="particles" ref={ref} aria-hidden />
}
