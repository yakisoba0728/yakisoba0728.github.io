'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type IdleCapableWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  cancelIdleCallback?: (handle: number) => void
}

function internalHref(value: string | null): string | null {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return null
  const [path] = value.split('#')
  return path || '/'
}

export default function NavigationWarmup({ routes }: { routes: string[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const barRef = useRef<HTMLDivElement>(null)
  const barAnimation = useRef<Animation | null>(null)

  useEffect(() => {
    const uniqueRoutes = [...new Set(routes.filter((route) => route !== pathname))]
    const idleWindow = window as IdleCapableWindow
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    const warm = () => {
      uniqueRoutes.forEach((route, index) => {
        timers.push(
          setTimeout(() => {
            if (!cancelled) router.prefetch(route)
          }, index * 35),
        )
      })
    }

    let idleId: number | undefined
    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleId = idleWindow.requestIdleCallback(warm, { timeout: 1200 })
    } else {
      timers.push(setTimeout(warm, 120))
    }

    const prefetchFromEvent = (event: Event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor) return
      const href = internalHref(anchor.getAttribute('href'))
      if (href && href !== pathname) router.prefetch(href)
    }

    const startNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const href = internalHref(anchor.getAttribute('href'))
      if (!href || href === pathname) return

      const shell = document.querySelector<HTMLElement>('[data-page-shell]')
      if (shell && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof shell.animate === 'function') {
        shell.getAnimations().forEach((animation) => animation.cancel())
        shell.animate(
          [
            { opacity: 1, transform: 'translateY(0) scale(1)' },
            { opacity: 0.72, transform: 'translateY(-5px) scale(.998)' },
          ],
          {
            duration: 220,
            easing: 'cubic-bezier(.4,0,.2,1)',
            fill: 'forwards',
          },
        )
      }

      const bar = barRef.current
      if (bar && typeof bar.animate === 'function') {
        barAnimation.current?.cancel()
        barAnimation.current = bar.animate(
          [
            { opacity: 1, transform: 'scaleX(.05)' },
            { opacity: 1, transform: 'scaleX(.72)' },
          ],
          {
            duration: 900,
            easing: 'cubic-bezier(.2,.75,.2,1)',
            fill: 'forwards',
          },
        )
      }
    }

    document.addEventListener('pointerover', prefetchFromEvent, true)
    document.addEventListener('focusin', prefetchFromEvent, true)
    document.addEventListener('touchstart', prefetchFromEvent, { capture: true, passive: true })
    document.addEventListener('click', startNavigation, true)

    return () => {
      cancelled = true
      timers.forEach((timer) => clearTimeout(timer))
      if (idleId !== undefined && typeof idleWindow.cancelIdleCallback === 'function') {
        idleWindow.cancelIdleCallback(idleId)
      }
      document.removeEventListener('pointerover', prefetchFromEvent, true)
      document.removeEventListener('focusin', prefetchFromEvent, true)
      document.removeEventListener('touchstart', prefetchFromEvent, true)
      document.removeEventListener('click', startNavigation, true)
    }
  }, [pathname, router, routes])

  useEffect(() => {
    const bar = barRef.current
    if (!bar || typeof bar.animate !== 'function') return
    barAnimation.current?.cancel()
    barAnimation.current = bar.animate(
      [
        { opacity: 1, transform: 'scaleX(.72)' },
        { opacity: 1, transform: 'scaleX(1)', offset: 0.55 },
        { opacity: 0, transform: 'scaleX(1)' },
      ],
      {
        duration: 260,
        easing: 'cubic-bezier(.2,.75,.2,1)',
        fill: 'forwards',
      },
    )
  }, [pathname])

  return (
    <div
      ref={barRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[300] h-[2px] w-full origin-left bg-accent opacity-0"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}
