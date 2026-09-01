'use client'

import { useLayoutEffect, useRef } from 'react'

export default function PageEnter({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const animations: Animation[] = []

    // Next.js template.tsx remounts on every route change, so this animation
    // is guaranteed to start once for every page navigation. It does not rely
    // on the experimental View Transition API.
    if (typeof root.animate === 'function') {
      animations.push(
        root.animate(
          [
            { opacity: 0, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 420,
            easing: 'cubic-bezier(.2,.75,.2,1)',
            fill: 'both',
          },
        ),
      )
    }

    // Pages can opt a top-of-page grid into a deterministic stagger. This is
    // deliberately separate from scroll Reveal so entering /portfolio always
    // has a visible card entrance even when every card is already in viewport.
    const groups = root.querySelectorAll<HTMLElement>('[data-page-stagger]')
    groups.forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement) || typeof child.animate !== 'function') return
        animations.push(
          child.animate(
            [
              { opacity: 0, transform: 'translateY(18px) scale(.985)' },
              { opacity: 1, transform: 'translateY(0) scale(1)' },
            ],
            {
              duration: 460,
              delay: 120 + index * 60,
              easing: 'cubic-bezier(.2,.75,.2,1)',
              fill: 'both',
            },
          ),
        )
      })
    })

    return () => animations.forEach((animation) => animation.cancel())
  }, [])

  return <div ref={ref}>{children}</div>
}
