'use client'

import { useEffect, useRef } from 'react'

/**
 * 마우스 위치에 따라 3D로 기우는 카드 래퍼.
 * className으로 카드 스타일(glass/bento-card/col-*)을 그대로 받아 자신이 카드가 된다.
 * 데스크탑(pointer: fine)에서만, reduced-motion이면 비활성.
 */
export default function Tilt({
  max = 8,
  className = '',
  children,
}: {
  max?: number
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
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
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
        el.style.setProperty('--rx', `${-(py - 0.5) * max * 2}deg`)
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [max])

  return (
    <div ref={ref} className={`tilt-card ${className}`}>
      <span className="tilt-sheen" aria-hidden />
      {children}
    </div>
  )
}
