'use client'

import { useLayoutEffect, useRef } from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  stagger?: boolean
  variant?: 'up' | 'left' | 'right' | 'scale' | 'blur'
}

const PRELOAD_PX = 112

export default function Reveal({ stagger = false, variant = 'up', className = '', children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.add('in')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let io: IntersectionObserver | null = null
    let raf = 0
    let finished = false

    const cleanupPassiveChecks = () => {
      window.removeEventListener('scroll', scheduleCheck)
      window.removeEventListener('resize', scheduleCheck)
      window.removeEventListener('pageshow', scheduleCheck)
    }

    const finish = () => {
      if (finished) return
      finished = true
      el.classList.add('in')
      io?.disconnect()
      cleanupPassiveChecks()
    }

    const isNearViewport = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const rect = el.getBoundingClientRect()
      return rect.top <= viewportHeight + PRELOAD_PX && rect.bottom >= -PRELOAD_PX
    }

    const check = () => {
      raf = 0
      if (isNearViewport()) finish()
    }

    function scheduleCheck() {
      if (raf || finished) return
      raf = window.requestAnimationFrame(check)
    }

    // Above-the-fold content is never hidden. This also catches content whose
    // final layout moved upward during a route transition.
    if (isNearViewport()) return

    el.classList.remove('in')

    // IntersectionObserver is the primary path, while passive geometry checks
    // are an independent fallback for browser timing, bfcache, resize and route
    // transition edge cases.
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) finish()
        },
        {
          threshold: 0.01,
          rootMargin: `0px 0px ${PRELOAD_PX}px 0px`,
        },
      )
      io.observe(el)
    }

    window.addEventListener('scroll', scheduleCheck, { passive: true })
    window.addEventListener('resize', scheduleCheck, { passive: true })
    window.addEventListener('pageshow', scheduleCheck)

    // Re-check on the next two frames because fonts, view transitions and
    // responsive layout can change the element position immediately after mount.
    scheduleCheck()
    const secondFrame = window.requestAnimationFrame(scheduleCheck)

    return () => {
      finished = true
      io?.disconnect()
      cleanupPassiveChecks()
      if (raf) window.cancelAnimationFrame(raf)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [])

  const variantClass = stagger
    ? ''
    : variant === 'left'
      ? 'rv-left'
      : variant === 'right'
        ? 'rv-right'
        : variant === 'scale'
          ? 'rv-scale'
          : variant === 'blur'
            ? 'rv-blur'
            : ''

  // Keep SSR visible; the observer only hides content below the fold after layout.
  const cls = [stagger ? 'stagger' : 'reveal', variantClass, 'in', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={cls} {...rest}>
      {children}
    </div>
  )
}
