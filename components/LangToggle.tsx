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
  const choose = (l: 'ko' | 'en') => {
    setLang(l)
    if (l === 'en') document.documentElement.setAttribute('data-lang', 'en')
    else document.documentElement.removeAttribute('data-lang')
    try {
      localStorage.setItem('lang', l)
    } catch {}
    window.dispatchEvent(new CustomEvent('langchange', { detail: l }))
  }
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button type="button" className={lang === 'ko' ? 'on' : ''} onClick={() => choose('ko')} aria-pressed={lang === 'ko'}>KO</button>
      <button type="button" className={lang === 'en' ? 'on' : ''} onClick={() => choose('en')} aria-pressed={lang === 'en'}>EN</button>
    </div>
  )
}
