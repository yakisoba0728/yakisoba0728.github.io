'use client'

import { useLayoutEffect, useRef } from 'react'

export default function PageEnter({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const animations: Animation[] = []

    if (typeof root.animate === 'function') {
      animations.push(
        root.animate(
          [
            { opacity: 0, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 360,
            easing: 'cubic-bezier(.2,.75,.2,1)',
            fill: 'both',
          },
        ),
      )
    }

    const groups = root.querySelectorAll<HTMLElement>('[data-page-stagger]')
    groups.forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement) || typeof child.animate !== 'function') return
        animations.push(
          child.animate(
            [
              { opacity: 0, transform: 'translateY(16px) scale(.987)' },
              { opacity: 1, transform: 'translateY(0) scale(1)' },
            ],
            {
              duration: 420,
              delay: 70 + index * 55,
              easing: 'cubic-bezier(.2,.75,.2,1)',
              fill: 'both',
            },
          ),
        )
      })
    })

    return () => animations.forEach((animation) => animation.cancel())
  }, [])

  return <div ref={ref} data-page-shell>{children}</div>
}
