import Link from 'next/link'
import Reveal from '@/components/Reveal'
import T from '@/components/T'
import { profile } from '@/content/profile'

export default function HeroV2() {
  return (
    <section className="grid items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:py-24">
      {/* 좌: 헤드라인 + CTA */}
      <div>
        <Reveal>
          <span className="kao" aria-hidden="true">
            <span className="kao-open">꒰ᐢ. .ᐢ꒱</span>
            <span className="kao-shut">꒰ᐢ- -ᐢ꒱</span>
          </span>
        </Reveal>
        <Reveal>
          <h1 className="t-hero mt-2"><T ko={profile.name} en={profile.nameEn} /></h1>
        </Reveal>
        <Reveal>
          <p className="t-display-md mt-5">
            <T ko={profile.creedLines.join(' ')} en={profile.creedLinesEn.join(' ')} />
          </p>
        </Reveal>
        <Reveal>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-body"><T ko={profile.tagline} en={profile.taglineEn} /></p>
        </Reveal>
        <Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/portfolio" className="btn-grad"><T ko="프로젝트 보기" en="View work" /></Link>
            <Link href="/about" className="btn-glass"><T ko="자기소개" en="About me" /></Link>
          </div>
        </Reveal>
      </div>

      {/* 우: 코드 윈도우 (glass) */}
      <Reveal className="rv-right">
        <div className="code-window code-window-glass">
          <div className="code-window-bar">
            <span className="code-dot" style={{ background: '#ef4444' }} />
            <span className="code-dot" style={{ background: '#f59e0b' }} />
            <span className="code-dot" style={{ background: '#22c55e' }} />
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
      </Reveal>
    </section>
  )
}
