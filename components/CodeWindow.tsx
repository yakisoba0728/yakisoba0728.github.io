'use client'

import { useEffect, useState } from 'react'

// 맥 스타일 코드창 — 신호등 버튼이 실제로 동작한다.
// 빨강=닫기(중앙에 '다시 열기'), 노랑=최소화(본문 접기), 초록=최대화(화면 전체).
export default function CodeWindow() {
  const [closed, setClosed] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)

  // 최대화 동안: Esc 로 축소 + 배경 스크롤 잠금
  useEffect(() => {
    if (!maximized) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMaximized(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [maximized])

  if (closed) {
    return (
      <div className="cw-reopen-wrap">
        <button
          type="button"
          className="cw-reopen"
          onClick={() => {
            setClosed(false)
            setMinimized(false)
            setMaximized(false)
          }}
        >
          <span className="cw-reopen-dots" aria-hidden="true">
            <i style={{ background: '#ef4444' }} />
            <i style={{ background: '#f59e0b' }} />
            <i style={{ background: '#22c55e' }} />
          </span>
          <span>다시 열기</span>
        </button>
      </div>
    )
  }

  const cls = ['code-window', 'code-window-glass', minimized ? 'is-min' : '', maximized ? 'is-max' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <>
      {maximized && (
        <button
          type="button"
          className="cw-backdrop"
          aria-label="최대화 닫기"
          onClick={() => setMaximized(false)}
        />
      )}
      <div className={cls}>
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
              setMinimized((v) => !v)
              setMaximized(false)
            }}
            aria-label="최소화"
            title="최소화"
          />
          <button
            type="button"
            className="code-dot code-dot--max"
            style={{ background: '#22c55e' }}
            onClick={() => {
              setMaximized((v) => !v)
              setMinimized(false)
            }}
            aria-label={maximized ? '축소' : '최대화'}
            title={maximized ? '축소' : '최대화'}
          />
          <span className="ml-2 text-[12px] text-muted" style={{ fontFamily: 'var(--font-mono)' }}>agent.py</span>
          {maximized && (
            <button type="button" className="cw-restore" onClick={() => setMaximized(false)}>축소 ✕</button>
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
    </>
  )
}
