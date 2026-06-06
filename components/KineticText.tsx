'use client'

import { Fragment, useEffect, useRef, useState } from 'react'

type Props = {
  lines: string[]
  linesEn?: string[]
  highlight?: string[]
  highlightEn?: string[]
  className?: string
  as?: 'h1' | 'h2' | 'p' | 'div'
}

/**
 * 문구를 줄·단어 단위로 쪼개, 화면에 들어오면 단어가 차례로 아래에서 솟아오른다.
 * 한/영 양쪽을 모두 렌더하고 .t-ko/.t-en 으로 토글(기존 i18n 방식과 동일).
 * 강조 단어(highlight)는 그라디언트로 칠한다. reduced-motion이면 CSS가 정적으로 표시.
 */
export default function KineticText({
  lines,
  linesEn,
  highlight = [],
  highlightEn = [],
  className = '',
  as = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
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
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const renderLang = (ls: string[], hl: string[], langClass: string) => {
    let wordIndex = 0
    return (
      <span className={langClass}>
        {ls.map((line, li) => {
          const words = line.split(' ')
          return (
            <span className="kinetic-line" key={li}>
              {words.map((word, wi) => {
                const clean = word.replace(/[^\p{L}\p{N}]/gu, '')
                const isHl = hl.some((h) => clean.includes(h))
                const idx = wordIndex++
                return (
                  <Fragment key={wi}>
                    <span className="kinetic-word" style={{ '--i': idx } as React.CSSProperties}>
                      {isHl ? <span className="kinetic-hl">{word}</span> : word}
                    </span>
                    {wi < words.length - 1 ? ' ' : null}
                  </Fragment>
                )
              })}
            </span>
          )
        })}
      </span>
    )
  }

  const Tag = as as React.ElementType
  return (
    <Tag ref={ref} className={`kinetic ${shown ? 'in' : ''} ${className}`}>
      {renderLang(lines, highlight, 't-ko')}
      {linesEn ? renderLang(linesEn, highlightEn, 't-en') : null}
    </Tag>
  )
}
