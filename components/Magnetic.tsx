'use client'

import { useEffect, useRef } from 'react'

/**
 * 자식(버튼/링크)이 마우스 쪽으로 살짝 끌려가는 자석 효과.
 * 데스크탑(pointer: fine)에서만, reduced-motion이면 비활성.
 */
export default function Magnetic({
  strength = 0.35,
  className = '',
  children,
}: {
  strength?: number
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - (r.left + r.width / 2)
        const y = e.clientY - (r.top + r.height / 2)
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.transform = ''
    }
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  )
}
