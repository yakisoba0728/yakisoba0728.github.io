'use client'

import { useEffect, useRef } from 'react'

/**
 * 마우스를 따라 은은한 그라디언트 빛이 번지는 전역 고정 레이어.
 * 화면 전체(fixed)에 깔리므로 특정 컨테이너 경계에 잘리지 않는다.
 * 데스크탑(pointer: fine)에서만, reduced-motion이면 비활성.
 */
export default function CursorGlow() {
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
        el.style.setProperty('--mx', `${e.clientX}px`)
        el.style.setProperty('--my', `${e.clientY}px`)
        el.style.opacity = '1'
      })
    }
    const onLeave = () => {
      el.style.opacity = '0'
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="cursor-glow-layer" aria-hidden />
}
