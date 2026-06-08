'use client'

import { useState } from 'react'

// 맥 스타일 코드창 — 신호등 버튼이 실제로 동작한다.
// 빨강=닫기(자리에 '열기' 버튼), 노랑=최소화(본문 접기), 초록=최대화(확대 토글).
export default function CodeWindow() {
  const [closed, setClosed] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)

  if (closed) {
    return (
      <button
        type="button"
        className="code-window-reopen"
        onClick={() => {
          setClosed(false)
          setMinimized(false)
          setMaximized(false)
        }}
        aria-label="코드 창 다시 열기"
      >
        <span className="code-dot" style={{ background: '#22c55e' }} aria-hidden="true" />
        <span>열기</span>
      </button>
    )
  }

  const cls = ['code-window', 'code-window-glass', minimized ? 'is-min' : '', maximized ? 'is-max' : '']
    .filter(Boolean)
    .join(' ')

  return (
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
          aria-label="최대화"
          title="최대화"
        />
        <span className="ml-2 text-[12px] text-muted" style={{ fontFamily: 'var(--font-mono)' }}>agent.py</span>
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
  )
}
