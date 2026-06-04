'use client'

import { useEffect, useState } from 'react'

export default function LangToggle() {
  const [lang, setLang] = useState<'ko' | 'en'>('ko')
  useEffect(() => {
    const id = setTimeout(() => {
      setLang(document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ko')
    }, 0)
    return () => clearTimeout(id)
  }, [])
  const toggle = () => {
    const next: 'ko' | 'en' = lang === 'ko' ? 'en' : 'ko'
    setLang(next)
    const apply = () => {
      if (next === 'en') document.documentElement.setAttribute('data-lang', 'en')
      else document.documentElement.removeAttribute('data-lang')
    }
    try {
      localStorage.setItem('lang', next)
    } catch {}
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startVT = (document as Document & { startViewTransition?: (cb: () => void) => void })
      .startViewTransition
    if (!reduce && typeof startVT === 'function') {
      startVT.call(document, apply)
    } else {
      apply()
    }
    window.dispatchEvent(new CustomEvent('langchange', { detail: next }))
  }
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggle}
      aria-label={`Switch language — current ${lang.toUpperCase()}`}
    >
      <span className={lang === 'ko' ? 'on' : ''}>KO</span>
      <span className={lang === 'en' ? 'on' : ''}>EN</span>
    </button>
  )
}
