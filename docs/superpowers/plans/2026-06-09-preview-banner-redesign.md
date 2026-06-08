# /preview 배너 리디자인 + 전역 버그 수정 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `yaki.kr/preview/`에 리디자인된 홈(워밍 그라데이션 배너 + 용암 마퀴 + 글래스 코드창)을 추가하고, 원본 `yaki.kr/`은 보존하며, 네비 레이아웃 흔들림과 네모 파비콘을 전역 수정한다.

**Architecture:** App Router 정적 export. 새 라우트 `app/preview/page.tsx`가 변형 컴포넌트(`HeroV2`, `MarqueeV2`)와 기존 공용 컴포넌트(`Counters`/`Bento`/`ContactCTA`)를 조합한다. 변형 스타일은 `globals.css` 하단에 `.v2-glow`/`.marquee-lava`/`.code-window-glass` 네임스페이스로 **추가만** 하여 원본과 격리한다. 네비/파비콘은 공용 자산이라 전역 수정한다.

**Tech Stack:** Next.js 16 (`output: export`), React 19, Tailwind CSS v4, `sharp`(파비콘 생성), GitHub Pages 배포.

> **커밋 메모:** 아래 모든 태스크 커밋 메시지는 마지막 줄에 다음 트레일러를 포함해야 한다(하네스 요구):
> `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
> (예: `git commit -m "<subject>" -m "Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"`)

> **Pre-flight:** 손대기 전에 `npm run build`를 한 번 돌려 기존 상태가 통과하는지 확인한다(사전 실패를 본 변경 탓으로 오인하지 않기 위함).

> **테스트 전략 메모:** 이 저장소의 vitest는 `lib/**/*.test.ts`(순수 로직)만 대상으로 하고 `@/` alias·DOM/컴포넌트 테스트 인프라가 없다. 이 작업은 시각/정적-export 변경이므로, 스펙 §8의 검증 방식을 그대로 채택한다 — 즉 **빌드 산출물 검사 + `git diff` 보존 가드 + lint + `0.0.0.0` dev 육안 확인**을 각 태스크의 "테스트"로 사용한다(불안정한 컴포넌트 SSR 테스트는 만들지 않는다). 각 태스크는 기대 출력이 명시된 verify 단계를 포함한다.

---

## File Structure

| 파일 | 책임 | 작업 |
|---|---|---|
| `components/MarqueeV2.tsx` | 용암 마퀴(데이터는 원본과 동일, 클래스만 `marquee-lava`) | Create |
| `components/home/HeroV2.tsx` | 글래스 코드창 + 워밍 글로우 히어로 | Create |
| `app/preview/page.tsx` | `/preview` 홈 조합 | Create |
| `app/globals.css` | 변형 스코프 CSS 블록 (추가만) | Modify (append) |
| `components/Nav.tsx` | 연락하기 버튼 `min-width` 고정 (전역) | Modify (1 line) |
| `scripts/gen-favicon.mjs` | 원형 파비콘 생성 스크립트 | Create |
| `app/icon.png` | 원형 투명 파비콘 (생성물) | Create |
| `app/icon.jpg` | 정사각 JPEG 파비콘 | Delete |
| `app/apple-icon.jpg` | iOS 홈화면 아이콘 | **유지(무수정)** |
| `app/page.tsx`, `components/home/Hero.tsx`, `components/Marquee.tsx` | 원본 홈 | **무수정(보존)** |

---

## Task 1: 변형 컴포넌트 + `/preview` 라우트 (구조)

이 태스크 후 `/preview`가 빌드되고 콘텐츠가 렌더된다(스타일은 Task 2에서 부여). `marquee-lava`/`code-window-glass`/`v2-glow` 클래스 훅을 미리 심어 둔다.

**Files:**
- Create: `components/MarqueeV2.tsx`
- Create: `components/home/HeroV2.tsx`
- Create: `app/preview/page.tsx`

- [ ] **Step 1: `components/MarqueeV2.tsx` 생성**

```tsx
import { profile } from '@/content/profile'

export default function MarqueeV2() {
  const items = profile.skills.flatMap((g) => g.items)
  const loop = [...items, ...items]
  return (
    <div className="marquee marquee-lava" aria-hidden>
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: `components/home/HeroV2.tsx` 생성**

원본 `Hero.tsx`와 콘텐츠 동일. 차이: `<section>`에 `relative isolate` 추가, 첫 자식으로 `.v2-glow` 레이어, 코드창 클래스에 `code-window-glass` 추가.

```tsx
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import T from '@/components/T'
import { profile } from '@/content/profile'

export default function HeroV2() {
  return (
    <section className="relative isolate grid items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:py-24">
      <div className="v2-glow" aria-hidden="true" />
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
```

- [ ] **Step 3: `app/preview/page.tsx` 생성**

원본 `app/page.tsx`와 동일 구조, `Hero`→`HeroV2`, `Marquee`→`MarqueeV2`만 교체. `Counters`/`Bento`/`ContactCTA`는 그대로 재사용.

```tsx
import HeroV2 from '@/components/home/HeroV2'
import MarqueeV2 from '@/components/MarqueeV2'
import Counters from '@/components/Counters'
import Bento from '@/components/home/Bento'
import ContactCTA from '@/components/home/ContactCTA'
import T from '@/components/T'
import { profile } from '@/content/profile'

export default function PreviewHomePage() {
  const skillCount = profile.skills.reduce((sum, g) => sum + g.items.length, 0)
  const aiCount = profile.skills.find((g) => g.category === 'AI / ML')?.items.length ?? 0
  return (
    <>
      <HeroV2 />
      <MarqueeV2 />
      <section className="py-12 md:py-16">
        <Counters
          items={[
            { label: <T ko="다루는 기술 · 도구" en="Tools & tech" />, value: skillCount, suffix: '+' },
            { label: <T ko="AI 모델 · 도구" en="AI models & tools" />, value: aiCount },
            { label: <T ko="만든 프로젝트" en="Projects shipped" />, value: 0 },
          ]}
        />
      </section>
      <Bento />
      <ContactCTA />
    </>
  )
}
```

- [ ] **Step 4: 빌드로 라우트 생성 확인 (이 시점엔 변형 스타일 미적용)**

Run: `npm run build`
Expected: 빌드 성공, 출력 라우트 목록에 `/preview` 포함, `out/preview/index.html` 생성.

검증:
```bash
test -f out/preview.html && echo "preview route OK"
grep -q 'marquee marquee-lava' out/preview.html && echo "lava class wired"
grep -q 'code-window-glass' out/preview.html && echo "glass class wired"
```
Expected 출력:
```
preview route OK
lava class wired
glass class wired
```

- [ ] **Step 5: 커밋**

```bash
git add components/MarqueeV2.tsx components/home/HeroV2.tsx app/preview/page.tsx
git commit -m "feat(preview): scaffold /preview route with HeroV2 + MarqueeV2"
```

---

## Task 2: 변형 스코프 CSS (`.v2-glow` / `.marquee-lava` / `.code-window-glass`)

**Files:**
- Modify: `app/globals.css` (파일 **맨 끝에 추가만**, 기존 규칙 무수정)

- [ ] **Step 1: `app/globals.css` 끝에 변형 블록 추가**

`app/globals.css` 가장 아래(마지막 줄 `}` 다음)에 아래 블록을 그대로 붙인다.

```css

/* ===================================================================
   /preview variant — scoped redesign (does NOT affect the original /)
   All selectors namespaced: .v2-glow / .marquee-lava / .code-window-glass
   =================================================================== */

/* ① 배너 워밍 글로우 — 히어로 박스 안에 스코프(풀뷰포트 아님).
   퍼센트 정지점이 박스 기준이라 HeroV2의 relative 섹션 안에서만 보정됨. */
.v2-glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(96% 72% at 50% 119%, rgba(249,115,22,0.27), rgba(236,90,77,0.14) 40%, transparent 64%),
    radial-gradient(ellipse 80% 55% at 50% -8%, rgba(236,90,77,0.27), transparent 60%);
}

/* ② 용암 마퀴 — 글자 속을 흐르는 그라데이션 */
.marquee-lava .marquee-item {
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(90deg, #7c2d12, #f59e0b, #ff7a18, #ec5a4d, #7c2d12);
  background-size: 300% 100%;
  animation: lava-molten 4s linear infinite;
  filter: drop-shadow(0 0 7px rgba(249, 115, 22, 0.40));
}
/* 구분자 "/"는 그라데이션 클립에서 빠져나와 muted 색으로 표시 */
.marquee-lava .marquee-item::after {
  -webkit-text-fill-color: var(--color-muted-2);
  background: none;
}
@keyframes lava-molten { to { background-position: 300% 0; } }

/* ③ 글래스 코드창 — 반투명 + 블러, 뒤 글로우가 비침 */
.code-window-glass {
  background: rgba(22, 22, 22, 0.55);
  -webkit-backdrop-filter: blur(10px) saturate(1.1);
  backdrop-filter: blur(10px) saturate(1.1);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}
.code-window-glass .code-window-bar { border-bottom: 1px solid rgba(255, 255, 255, 0.07); }
```

> 참고: reduced-motion은 별도 규칙 불필요 — 기존 `@media (prefers-reduced-motion: reduce)`의 `*{animation-duration:0.001ms!important}` + `.marquee-track{animation:none!important}`가 `lava-molten`과 스크롤을 이미 정지시킨다(정적 워밍 텍스트로 표시됨).

- [ ] **Step 2: 빌드 + 마커 확인**

Run: `npm run build`
Expected: 성공.

검증:
```bash
grep -rq 'lava-molten' out/_next/static/chunks/ && echo "css present"
```
Expected: `css present` (Tailwind/Next가 변형 CSS를 번들에 포함).

- [ ] **Step 3: 육안 확인 (dev 서버, 0.0.0.0)**

Run: `npx next dev -H 0.0.0.0 -p 3000`
브라우저에서 `http://<this-host>:3000/preview` 확인:
- 배너 뒤 위 코랄 글로우 + 아래 주황 불씨가 **히어로 영역에만**(세로) 보이고 아래 Bento/ContactCTA로 번지지 않는다.
- **와이드 모니터 가로폭 확인**: `.v2-glow`가 `inset:0`이면 `<main>`의 1280px 중앙 컬럼에만 깔려 양옆이 어두울 수 있다. 승인된 목업은 풀폭 워시 느낌이었으니, 좁아 보이면 풀블리드로 바꾼다 — `.v2-glow { left:50%; transform:translateX(-50%); width:100vw; right:auto; }`(top/bottom은 0 유지). 라이브에서 보고 결정.
- 마퀴 글자에 주황→코랄 그라데이션이 흐른다(움직임).
- 코드창이 반투명 글래스로 뒤 불빛이 은은히 비친다.
- `http://<this-host>:3000/` (원본)은 시각적으로 그대로다.

(실행 에이전트는 chrome-devtools/playwright MCP로 `/`와 `/preview` 스크린샷을 찍어 비교한다.)

- [ ] **Step 4: 커밋**

```bash
git add app/globals.css
git commit -m "feat(preview): warm glow, lava marquee, glass code window (scoped)"
```

---

## Task 3: 네비 언어전환 레이아웃 흔들림 고정 (전역)

**원인(스펙 §6.1):** KO/EN 토글의 위치는 그 오른쪽 요소들의 총 너비로 결정되는데, 그중 변하는 것은 연락하기 버튼뿐(`연락하기` ↔ `Get in touch`). 버튼 폭을 고정하면 토글이 멈춘다.

**Files:**
- Modify: `components/Nav.tsx:61`

- [ ] **Step 1: 데스크톱 연락하기 버튼에 `min-width` 추가**

`components/Nav.tsx`에서 아래 한 줄을 찾는다(라인 61 근처, 데스크톱 클러스터 내부):

```tsx
            <a href={`mailto:${profile.socials.email}`} className="btn-grad ml-2 !h-9 !px-4 !py-0 text-[13px]">
```

다음으로 교체한다(`!min-w-[116px]` 추가):

```tsx
            <a href={`mailto:${profile.socials.email}`} className="btn-grad ml-2 !h-9 !px-4 !py-0 text-[13px] !min-w-[116px]">
```

(주의: 이 `<a>`는 데스크톱 클러스터의 것이다. 모바일 메뉴의 연락은 `Mail` 아이콘이라 텍스트 폭 변화가 없으므로 수정하지 않는다. `btn-grad`는 `justify-content:center`를 포함하므로 KO 텍스트가 116px 안에서 중앙 정렬된다.)

- [ ] **Step 2: 변경 범위가 1줄인지 확인**

Run: `git diff -- components/Nav.tsx`
Expected: 위 `<a>` 한 줄에 `!min-w-[116px]`만 추가된 diff.

- [ ] **Step 3: 빌드 + 육안 토글 테스트**

Run: `npm run build` (성공 확인)

dev 서버에서 `/`와 `/preview` 모두:
- 우상단 KO/EN 토글을 클릭해 언어 전환 시 **토글·아이콘 위치가 움직이지 않는다**.
- 연락하기 버튼은 두 언어에서 폭이 동일(`Get in touch`가 잘리지 않음).

(`Get in touch`가 116px에 안 들어가면 124px 등으로 올린다 — 폰트 스왑 후 라이브에서 확정.)

- [ ] **Step 4: 커밋**

```bash
git add components/Nav.tsx
git commit -m "fix(nav): stabilize KO/EN toggle by fixing contact button width"
```

---

## Task 4: 원형 투명 파비콘 (전역)

`public/avatar.png`(실제로는 736×736 JPEG)와 `app/icon.jpg`는 정사각이라 탭에서 네모. sharp로 원형 마스킹 PNG를 만들어 교체한다. `apple-icon.jpg`는 iOS가 자동 마스킹하므로 유지.

**Files:**
- Create: `scripts/gen-favicon.mjs`
- Create: `app/icon.png` (스크립트 산출물)
- Delete: `app/icon.jpg`

- [ ] **Step 1: `scripts/gen-favicon.mjs` 생성**

```js
// 원형 마스킹된 투명 PNG 파비콘을 생성한다.
// 소스: public/avatar.png (확장자와 달리 JPEG, 736x736), 출력: app/icon.png (512x512 RGBA)
// ESM (.mjs) — eslint-config-next forbids require()
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(__dirname, '..', 'public', 'avatar.png')
const OUT = path.join(__dirname, '..', 'app', 'icon.png')
const SIZE = 512
const r = SIZE / 2
const mask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`,
)

try {
  const info = await sharp(SRC)
    .resize(SIZE, SIZE, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toFile(OUT)
  console.log(`wrote ${OUT} ${info.width}x${info.height} channels=${info.channels}`)
} catch (err) {
  console.error(err)
  process.exit(1)
}
```

- [ ] **Step 2: 스크립트 실행**

Run: `node scripts/gen-favicon.mjs`
Expected: `wrote /home/yakihyuk0728/yakisoba0728.github.io/app/icon.png 512x512 channels=4`
(`channels=4` = RGBA = 투명도 있음.)

- [ ] **Step 3: 산출물이 투명 PNG인지 확인**

Run: `file app/icon.png`
Expected: `PNG image data, 512 x 512, 8-bit/color RGBA, non-interlaced`

- [ ] **Step 4: 정사각 JPEG 파비콘 제거**

Run: `git rm app/icon.jpg`
Expected: `rm 'app/icon.jpg'`
(Next는 `app/icon.png`를 자동 파비콘으로 인식. `icon.jpg`와 `icon.png`가 공존하면 안 되므로 제거 필수.)

- [ ] **Step 5: 빌드 + 파비콘 링크 확인**

Run: `npm run build`
검증:
```bash
test -f out/icon.png && echo "icon.png exported"
grep -q 'icon\.png' out/index.html && echo "favicon link OK"
```
Expected:
```
icon.png exported
favicon link OK
```
(브라우저 탭에서 원형으로 보이는지 dev 서버로 최종 육안 확인.)

- [ ] **Step 6: 커밋**

```bash
git add scripts/gen-favicon.mjs app/icon.png app/icon.jpg
git commit -m "fix(favicon): round transparent PNG icon (keep square apple-icon)"
```

---

## Task 5: 원본 보존 가드 + 최종 검증 + 마무리

**Files:** (없음 — 검증 전용)

- [ ] **Step 1: 원본 홈 3개 파일이 `main`과 동일한지 확인 (보존 가드)**

Run:
```bash
git diff --stat main -- app/page.tsx components/home/Hero.tsx components/Marquee.tsx
```
Expected: **출력 없음**(세 파일 모두 무수정 → 원본 `/` 본문 보존).

- [ ] **Step 2: `globals.css`는 추가만 했는지 확인**

Run: `git diff main -- app/globals.css`
Expected: 기존 줄 삭제/수정(`-` 라인) 없이 파일 끝에 변형 블록만 `+`로 추가됨.

- [ ] **Step 3: 전체 빌드 + lint**

Run: `npm run build && npm run lint`
Expected: 둘 다 성공(에러 0).

- [ ] **Step 4: 산출물 라우트 존재 확인**

Run:
```bash
test -f out/index.html && test -f out/preview.html && echo "both routes exported"
```
Expected: `both routes exported`

- [ ] **Step 5: dev 서버(0.0.0.0)로 최종 육안 비교**

Run: `npx next dev -H 0.0.0.0 -p 3000`
체크리스트:
- `/` 원본: 본문 시각 변화 없음. 단, 네비 토글 고정 + 탭 파비콘 원형(전역 수정 적용).
- `/preview`: 워밍 그라데이션(히어로 한정) + 용암 마퀴 + 글래스 코드창.
- 두 페이지 모두 KO/EN 전환 시 토글 위치 고정.
- reduced-motion 모드: 마퀴 정지.

- [ ] **Step 6: (선택) 브랜치 푸시 / PR**

> 배포는 `main` 병합 시 GitHub Actions가 자동 수행한다. 사용자 확인 후 진행한다 — 이 플랜 범위에서는 자동 푸시/병합하지 않는다.
```bash
# 사용자가 원할 때:
# git push -u origin redesign/preview-banner
# gh pr create --fill
```

---

## Self-Review (작성자 체크 결과)

**1. Spec coverage**
- §3 배포(/preview 라우트, 원본 무수정, 단일 빌드) → Task 1, Task 5 Step 4.
- §4 컴포넌트(HeroV2/MarqueeV2/preview page, 공용 재사용) → Task 1.
- §5.1 글로우(히어로 스코프) → Task 2 Step 1 `.v2-glow` + HeroV2 `relative isolate`.
- §5.2 용암 마퀴(+ `::after` 처리) → Task 2 Step 1 `.marquee-lava`.
- §5.3 글래스 코드창 → Task 2 Step 1 `.code-window-glass`.
- §6.1 네비 흔들림 → Task 3.
- §6.2 파비콘(원형 PNG, apple-icon 유지) → Task 4.
- §8 검증(build/lint/0.0.0.0/산출물) → 각 태스크 verify + Task 5.
- 누락 없음.

**2. Placeholder scan:** "TBD"/"적절히"/"등등" 없음. 모든 코드·명령·기대 출력 구체화됨. (`min-w-[116px]`, favicon 픽셀 폭 등은 라이브 미세조정 여지를 명시하되 기본값은 확정.)

**3. Type/이름 일관성:** `HeroV2`/`MarqueeV2`/`PreviewHomePage` import 경로·default export 일치. 클래스명 `v2-glow`/`marquee-lava`/`code-window-glass`가 컴포넌트와 CSS에서 정확히 동일.
