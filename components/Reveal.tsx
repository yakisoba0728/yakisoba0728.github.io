'use client'

import { useEffect, useRef, useState } from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & { stagger?: boolean }

export default function Reveal({ stagger = false, className = '', children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      // Schedule outside the synchronous effect body to avoid cascading renders
      const id = setTimeout(() => setShown(true), 0)
      return () => clearTimeout(id)
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const cls = [stagger ? 'stagger' : 'reveal', shown ? 'in' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={cls} {...rest}>
      {children}
    </div>
  )
}
