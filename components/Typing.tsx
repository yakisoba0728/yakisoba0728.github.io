'use client'

import { useEffect, useState } from 'react'

export default function Typing({ phrases, phrasesEn }: { phrases: string[]; phrasesEn?: string[] }) {
  const [text, setText] = useState('')
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const getSet = (l?: string) => {
      const cur = l ?? (document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ko')
      return cur === 'en' && phrasesEn ? phrasesEn : phrases
    }
    let set = getSet()
    let phrase = 0
    let chars = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>
    if (reduce) {
      const id = setTimeout(() => setText(set[0] ?? ''), 0)
      const onLangReduce = (e: Event) => { set = getSet((e as CustomEvent<string>).detail); setTimeout(() => setText(set[0] ?? ''), 0) }
      window.addEventListener('langchange', onLangReduce)
      return () => { clearTimeout(id); window.removeEventListener('langchange', onLangReduce) }
    }
    const tick = () => {
      const current = set[phrase] ?? ''
      if (!deleting) {
        chars++
        setText(current.slice(0, chars))
        if (chars === current.length) { deleting = true; timer = setTimeout(tick, 1800); return }
        timer = setTimeout(tick, 70)
      } else {
        chars--
        setText(current.slice(0, chars))
        if (chars === 0) { deleting = false; phrase = (phrase + 1) % set.length }
        timer = setTimeout(tick, 35)
      }
    }
    timer = setTimeout(tick, 500)
    const onLang = (e: Event) => { set = getSet((e as CustomEvent<string>).detail); phrase = 0; chars = 0; deleting = false }
    window.addEventListener('langchange', onLang)
    return () => { clearTimeout(timer); window.removeEventListener('langchange', onLang) }
  }, [phrases, phrasesEn])
  return (
    <span>
      {text}
      <span className="type-cursor" aria-hidden />
    </span>
  )
}
