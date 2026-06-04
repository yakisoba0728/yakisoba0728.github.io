'use client'

import { useEffect, useRef } from 'react'

export default function Particles({ count = 22 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = ref.current
    if (!host) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const n = window.innerWidth < 640 ? Math.round(count * 0.5) : count
    const frag = document.createDocumentFragment()
    for (let i = 0; i < n; i++) {
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
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        host.style.transform = `translate3d(0, ${window.scrollY * 0.12}px, 0)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      host.replaceChildren()
      host.style.transform = ''
    }
  }, [count])
  return <div className="particles" ref={ref} aria-hidden />
}
