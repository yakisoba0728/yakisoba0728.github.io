'use client'

import { useEffect, useState } from 'react'

export default function Typing({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = setTimeout(() => setText(phrases[0] ?? ''), 0)
      return () => clearTimeout(id)
    }
    let phrase = 0
    let chars = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const current = phrases[phrase] ?? ''
      if (!deleting) {
        chars++
        setText(current.slice(0, chars))
        if (chars === current.length) {
          deleting = true
          timer = setTimeout(tick, 1800)
          return
        }
        timer = setTimeout(tick, 70)
      } else {
        chars--
        setText(current.slice(0, chars))
        if (chars === 0) {
          deleting = false
          phrase = (phrase + 1) % phrases.length
        }
        timer = setTimeout(tick, 35)
      }
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [phrases])
  return (
    <span>
      {text}
      <span className="type-cursor" aria-hidden />
    </span>
  )
}
