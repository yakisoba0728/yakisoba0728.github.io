'use client'

import { useLayoutEffect, useRef, useState } from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  stagger?: boolean
  variant?: 'up' | 'left' | 'right' | 'scale' | 'blur'
}

const PRELOAD_PX = 96

export default function Reveal({ stagger = false, variant = 'up', className = '', children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  // SSR/initial paint is visible on purpose. Elements below the fold are hidden
  // after hydration, before the user can scroll to them, then revealed on entry.
  const [shown, setShown] = useState(true)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const rect = el.getBoundingClientRect()

    // Anything already visible (or just below the fold) must be rendered immediately.
    // This prevents above-the-fold content from looking missing while hydration/IO starts.
    if (rect.top <= viewportHeight + PRELOAD_PX || rect.bottom < 0) {
      setShown(true)
      return
    }

    // Only genuinely off-screen content starts hidden.
    setShown(false)

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
            break
          }
        }
      },
      {
        threshold: 0.04,
        // Reveal slightly before the element actually enters the viewport so
        // scrolling never exposes a blank hole.
        rootMargin: `0px 0px ${PRELOAD_PX}px 0px`,
      },
    )

    io.observe(el)
    return () => io.disconnect()
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

  const cls = [stagger ? 'stagger' : 'reveal', variantClass, shown ? 'in' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={cls} {...rest}>
      {children}
    </div>
  )
}
