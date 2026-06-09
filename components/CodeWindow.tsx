'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

// 맥 스타일 코드창 — 신호등 버튼이 실제로 동작한다.
// 최대화/축소는 코드창의 '실제 위치'에서 퍼지고 모이는 FLIP 애니메이션.
// 닫기는 제자리에서 페이드+축소되고, 그 한가운데 '다시 열기'가 뜬다.
export default function CodeWindow() {
  const [closed, setClosed] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const winRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLButtonElement>(null)
  const originRect = useRef<DOMRect | null>(null)

  // 진입: 원래 위치/크기 → 풀스크린으로 '퍼지는' FLIP
  useLayoutEffect(() => {
    const el = winRef.current
    if (!el) return
    if (!maximized) {
      // 축소 직후: is-max가 막 제거됨(창이 다시 in-flow). 남은 인라인 transform을
      // 페인트 전에 같은 프레임에서 제거 → 풀스크린으로 튀는 플래시 없음.
      el.style.transition = ''
      el.style.transform = ''
      el.style.transformOrigin = ''
      return
    }
    const first = originRect.current
    if (!first) return
    const last = el.getBoundingClientRect()
    const dx = first.left - last.left
    const dy = first.top - last.top
    const sx = first.width / last.width
    const sy = first.height / last.height
    el.style.transformOrigin = 'top left'
    el.style.transition = 'none'
    el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
    el.getBoundingClientRect() // 강제 reflow → 시작 transform 적용
    el.style.transition = `transform .34s ${EASE}`
    el.style.transform = 'translate(0px, 0px) scale(1, 1)'
    const cleanup = (e?: TransitionEvent) => {
      // transitionend는 자식(글리프/본문)에서도 버블링됨 → transform 전환만 처리
      if (e && e.propertyName !== 'transform') return
      el.removeEventListener('transitionend', cleanup)
      el.style.transition = ''
      el.style.transform = ''
      el.style.transformOrigin = ''
    }
    el.addEventListener('transitionend', cleanup)
    const t = window.setTimeout(cleanup, 440)
    return () => {
      window.clearTimeout(t)
      el.removeEventListener('transitionend', cleanup)
    }
  }, [maximized])

  // 축소: 풀스크린 → 원래 위치로 '모이며' 닫힘 (애니메이션 후 상태 해제)
  const restore = useCallback(() => {
    const el = winRef.current
    const first = originRect.current
    if (!el || !first) {
      setMaximized(false)
      return
    }
    const last = el.getBoundingClientRect()
    const dx = first.left - last.left
    const dy = first.top - last.top
    const sx = first.width / last.width
    const sy = first.height / last.height
    let done = false
    const finish = (e?: TransitionEvent) => {
      if (e && e.propertyName !== 'transform') return
      if (done) return
      done = true
      el.removeEventListener('transitionend', finish)
      if (hostRef.current) hostRef.current.style.height = ''
      // transform/transition 정리는 maximized=false 이후 useLayoutEffect의 !maximized 분기에서
      // (is-max가 제거된 뒤에 지워야 풀스크린 플래시가 안 생김)
      setMaximized(false)
    }
    // 백드롭은 창이 줄어드는 동안 함께 페이드아웃
    const bd = backdropRef.current
    if (bd) {
      bd.style.transition = `opacity .3s ${EASE}`
      requestAnimationFrame(() => {
        bd.style.opacity = '0'
      })
    }
    el.style.transformOrigin = 'top left'
    el.style.transition = `transform .3s ${EASE}`
    requestAnimationFrame(() => {
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
    })
    el.addEventListener('transitionend', finish)
    window.setTimeout(finish, 380)
  }, [])

  // 최대화 동안: Esc 로 축소 + 배경 스크롤 잠금
  useEffect(() => {
    if (!maximized) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') restore()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [maximized, restore])

  const maximize = () => {
    const el = winRef.current
    const host = hostRef.current
    if (el) originRect.current = el.getBoundingClientRect()
    // 호스트 높이를 고정 → 창이 fixed로 빠져도 히어로가 리플로우/점프하지 않음
    if (host) host.style.height = `${host.getBoundingClientRect().height}px`
    setMinimized(false)
    setMaximized(true)
  }

  const cls = [
    'code-window',
    'code-window-glass',
    minimized ? 'is-min' : '',
    maximized ? 'is-max' : '',
    closed ? 'is-closed' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="cw-host" ref={hostRef}>
      {maximized && (
        <button ref={backdropRef} type="button" className="cw-backdrop" aria-label="최대화 닫기" onClick={restore} />
      )}
      <div ref={winRef} className={cls} aria-hidden={closed ? true : undefined}>
        <div className="code-window-bar">
          <button
            type="button"
            className="code-dot code-dot--close"
            style={{ background: '#ef4444' }}
            onClick={() => setClosed(true)}
            aria-label="닫기"
            title="닫기"
          />
          <button
            type="button"
            className="code-dot code-dot--min"
            style={{ background: '#f59e0b' }}
            onClick={() => {
              setMaximized(false)
              setMinimized((v) => !v)
            }}
            aria-label="최소화"
            title="최소화"
          />
          <button
            type="button"
            className="code-dot code-dot--max"
            style={{ background: '#22c55e' }}
            onClick={() => (maximized ? restore() : maximize())}
            aria-label={maximized ? '축소' : '최대화'}
            title={maximized ? '축소' : '최대화'}
          />
          <span className="ml-2 text-[12px] text-muted" style={{ fontFamily: 'var(--font-mono)' }}>agent.py</span>
          {maximized && (
            <button type="button" className="cw-restore" onClick={restore}>축소 ✕</button>
          )}
        </div>
        <div className="code-body">
          <div><span className="c-com"># 멀티 에이전트로 아이디어를 제품으로</span></div>
          <div><span className="c-kw">from</span> agents <span className="c-kw">import</span> Orchestrator, Agent</div>
          <div className="h-4" />
          <div>orchestrator = <span className="c-fn">Orchestrator</span>(model=<span className="c-str">&quot;claude&quot;</span>)</div>
          <div>orchestrator.<span className="c-fn">add</span>(<span className="c-fn">Agent</span>(<span className="c-str">&quot;planner&quot;</span>))</div>
          <div>orchestrator.<span className="c-fn">add</span>(<span className="c-fn">Agent</span>(<span className="c-str">&quot;builder&quot;</span>))</div>
          <div className="h-4" />
          <div>result = orchestrator.<span className="c-fn">run</span>(</div>
          <div>{'  '}spec=<span className="c-str">&quot;변화와 함께 성장하기&quot;</span>,</div>
          <div>)</div>
          <div><span className="c-fn">print</span>(result.status){'  '}<span className="c-com"># shipped ✨</span></div>
        </div>
      </div>
      {closed && (
        <div className="cw-reopen-wrap">
          <button type="button" className="cw-reopen" onClick={() => setClosed(false)}>
            <span className="cw-reopen-dots" aria-hidden="true">
              <i style={{ background: '#ef4444' }} />
              <i style={{ background: '#f59e0b' }} />
              <i style={{ background: '#22c55e' }} />
            </span>
            <span>다시 열기</span>
          </button>
        </div>
      )}
    </div>
  )
}
