# 포트폴리오 리디자인 (Modern Dark Premium) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 GitHub-다크/터미널 템플릿을 딥네이비+글래스+보라→시안 글로우의 "Modern Dark Premium" 포트폴리오로 전면 리디자인하고, 네이티브 View Transitions(페이지 전환)와 CSS+IntersectionObserver(스크롤 등장) 애니메이션을 입힌다.

**Architecture:** 디자인 토큰·키프레임·View Transition CSS를 `app/globals.css`에 집중시키고, 재사용 `<Reveal>`(IO 등장) 컴포넌트와 `app/template.tsx`(React `<ViewTransition>` 래퍼)로 모션을 공통화한다. 각 페이지/컴포넌트는 이 토큰·유틸리티 클래스를 사용해 재구성한다. 콘텐츠 로직(`lib/*`)과 더미 콘텐츠(`content/*`)는 변경하지 않는다.

**Tech Stack:** Next.js 16.2.7 (App Router, `output: "export"`), React 19.2, Tailwind v4, `next/font`(Space Grotesk + 로컬 Pretendard), React `<ViewTransition>`(`experimental.viewTransition`), Vitest.

---

## 검증 방식에 대한 메모 (이 플랜의 TDD 적용)

이 작업은 대부분 **비주얼/CSS**라 컴포넌트마다 단위 테스트(TDD)를 강제하지 않는다. 대신:

- **로직(`lib/*`)**: 기존 `lib/content.test.ts`를 **계속 통과**시킨다(`npm test`). 로직은 변경하지 않으므로 새 테스트 불필요.
- **비주얼 컴포넌트/페이지**: 각 태스크의 "검증"은 **dev 프리뷰 확인 + 정적 빌드 성공 + 타입/린트 통과**로 한다. dev 서버는 이미 실행 중(프리뷰 도구 사용); 없으면 `npm run dev`.
- 매 태스크 끝에 **커밋**한다(frequent commits).

공통 검증 명령:
- 타입: `npx tsc --noEmit` → 기대: 에러 0
- 린트: `npm run lint` → 기대: 에러 0
- 테스트: `npm test` → 기대: 모든 테스트 PASS
- 정적 빌드: `npm run build` → 기대: 성공, `out/` 생성

작업 브랜치: 현재 `main`. 실행 전 `git switch -c redesign/modern-dark` 권장(원치 않으면 main 직접).

---

## File Structure

**생성(Create)**
- `app/fonts/PretendardVariable.woff2` — 로컬 Pretendard 가변 폰트(자체 호스팅)
- `app/template.tsx` — 페이지 전환용 React `<ViewTransition>` 래퍼
- `app/about/page.tsx` — 신규 "자기소개" 페이지
- `components/Reveal.tsx` — IntersectionObserver 기반 스크롤 등장 래퍼(클라이언트)

**수정(Modify)**
- `next.config.ts` — `experimental.viewTransition: true`
- `app/globals.css` — 디자인 토큰·유틸리티·reveal·view-transition·reduced-motion 전면 교체
- `app/layout.tsx` — 폰트(Space Grotesk+Pretendard), 배경 글로우 요소, 컨테이너 폭
- `components/Nav.tsx` — C 톤, 자기소개 링크 추가, `viewTransitionName: site-header`
- `components/Footer.tsx` — C 톤
- `components/home/Hero.tsx` · `About.tsx` · `Skills.tsx` · `ContactCTA.tsx` · `FeaturedProjects.tsx` · `Timeline.tsx` — C 톤 + Reveal
- `components/ProjectCard.tsx` · `PostCard.tsx` — 글래스 카드(+프로젝트 카드 morph name)
- `components/mdx/index.tsx` — 다크 prose 튜닝
- `app/page.tsx` — 홈 섹션 재구성(Timeline 제거 → /about로 이동)
- `app/portfolio/page.tsx` · `app/portfolio/[slug]/page.tsx` — C 톤(+상세 morph 대상)
- `app/blog/page.tsx` · `app/blog/[slug]/page.tsx` — C 톤
- `app/not-found.tsx` — C 톤

**변경 없음(Keep)**: `lib/*`, `content/*`, `components/icons.tsx`, `postcss.config.mjs`, `app/robots.ts`.

---

## Phase 0 — Foundation & Design Tokens

### Task 0.1: View Transitions 활성화

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: `experimental.viewTransition` 추가**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
```

- [ ] **Step 2: dev 재시작 후 부팅 확인**

Run: `npm run dev` (이미 실행 중이면 재시작) → 기대: 에러 없이 Ready, `/` 200.

- [ ] **Step 3: 커밋**

```bash
git add next.config.ts
git commit -m "feat: enable experimental viewTransition"
```

---

### Task 0.2: Pretendard 폰트 자체 호스팅 + 레이아웃 폰트 교체

**Files:**
- Create: `app/fonts/PretendardVariable.woff2`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Pretendard 가변 폰트 다운로드**

```bash
mkdir -p app/fonts
curl -fL -o app/fonts/PretendardVariable.woff2 \
  https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/woff2/PretendardVariable.woff2
```

Run 후 확인: `ls -la app/fonts/PretendardVariable.woff2` → 기대: 파일 크기 > 1MB.

- [ ] **Step 2: `app/layout.tsx` 교체 (폰트 + 배경 글로우 + 컨테이너 폭)**

```tsx
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { profile } from '@/content/profile'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: `${profile.name} — 포트폴리오`, template: `%s — ${profile.name}` },
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — 포트폴리오`,
    description: profile.tagline,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bg text-fg font-sans antialiased">
        <div className="glow-bg" aria-hidden />
        <Nav />
        <main className="relative z-[1] mx-auto max-w-[1080px] px-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: 커밋** (globals.css는 Task 0.3에서 함께 적용되므로 빌드 확인은 0.3 이후)

```bash
git add app/fonts/PretendardVariable.woff2 app/layout.tsx
git commit -m "feat: self-host Pretendard, add Space Grotesk + glow background"
```

---

### Task 0.3: `app/globals.css` 전면 교체 (토큰·유틸리티·모션)

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: 파일 전체를 아래로 교체**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-bg: #070a12;
  --color-bg-2: #0b0f1a;
  --color-surface: rgba(255, 255, 255, 0.045);
  --color-border: rgba(255, 255, 255, 0.10);
  --color-fg: #eef1f8;
  --color-muted: #9aa3b8;
  --color-muted-2: #6b7384;
  --color-accent: #a78bfa;
  --color-accent-2: #22d3ee;
}

@theme inline {
  --font-sans: var(--font-pretendard), -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: var(--font-space-grotesk), var(--font-pretendard), sans-serif;
}

:root {
  --grad: linear-gradient(90deg, #a78bfa, #22d3ee);
  --rise: 46px;        /* "화려" 고정 */
  --reveal-dur: 0.95s;
  --ease: cubic-bezier(0.2, 0.75, 0.2, 1);
}

html { scroll-behavior: smooth; }
body { background-color: var(--color-bg); color: var(--color-fg); overflow-x: hidden; }

/* ---- 고정 배경 글로우 ---- */
.glow-bg { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.glow-bg::before, .glow-bg::after { content: ""; position: absolute; border-radius: 50%; filter: blur(70px); }
.glow-bg::before { width: 620px; height: 620px; top: -220px; left: -160px; background: radial-gradient(circle, rgba(124,58,237,.5), transparent 65%); animation: drift1 18s ease-in-out infinite; }
.glow-bg::after { width: 560px; height: 560px; bottom: -200px; right: -140px; background: radial-gradient(circle, rgba(34,211,238,.4), transparent 65%); animation: drift2 22s ease-in-out infinite; }
@keyframes drift1 { 50% { transform: translate(80px, 60px) scale(1.1); } }
@keyframes drift2 { 50% { transform: translate(-70px, -50px) scale(1.08); } }

/* ---- 재사용 유틸리티 ---- */
.gradient-text { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
.glass { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; }
.card-hover { transition: transform .3s var(--ease), border-color .3s, box-shadow .3s; }
.card-hover:hover { transform: translateY(-5px); border-color: rgba(167,139,250,.45); box-shadow: 0 18px 44px rgba(0,0,0,.4); }
.chip { display: inline-block; font-size: 12.5px; color: #cdd3e1; background: rgba(255,255,255,.05); border: 1px solid var(--color-border); padding: 6px 11px; border-radius: 8px; }
.section-label { font-family: var(--font-display); font-size: 12px; letter-spacing: .18em; text-transform: uppercase; color: var(--color-accent-2); }
.pill { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: #c9d0e0; border: 1px solid var(--color-border); background: var(--color-surface); padding: 7px 14px; border-radius: 999px; }
.pill-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-accent-2); box-shadow: 0 0 10px var(--color-accent-2); animation: pulse 2s infinite; }
@keyframes pulse { 50% { opacity: .4; } }
.btn-grad { display: inline-flex; align-items: center; gap: 6px; background: var(--grad); color: #0a0a12; font-weight: 600; border-radius: 12px; padding: 12px 22px; transition: transform .2s, box-shadow .2s; }
.btn-grad:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(124,58,237,.35); }
.btn-glass { display: inline-flex; align-items: center; gap: 6px; background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-fg); border-radius: 12px; padding: 12px 22px; transition: transform .2s, border-color .2s; }
.btn-glass:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.25); }

/* ---- 스크롤 등장 (Reveal) ---- */
.reveal { opacity: 0; transform: translateY(var(--rise)); transition: opacity var(--reveal-dur) var(--ease), transform var(--reveal-dur) var(--ease); }
.reveal.in { opacity: 1; transform: none; }
.stagger > * { opacity: 0; transform: translateY(var(--rise)); transition: opacity var(--reveal-dur) var(--ease), transform var(--reveal-dur) var(--ease); }
.stagger.in > * { opacity: 1; transform: none; }
.stagger.in > :nth-child(1) { transition-delay: 0s; }
.stagger.in > :nth-child(2) { transition-delay: .09s; }
.stagger.in > :nth-child(3) { transition-delay: .18s; }
.stagger.in > :nth-child(4) { transition-delay: .27s; }
.stagger.in > :nth-child(5) { transition-delay: .36s; }
.stagger.in > :nth-child(6) { transition-delay: .45s; }

/* ---- 페이지 전환 (View Transitions) ---- */
::view-transition-old(.page-exit) { animation: 180ms ease-in both vt-old; }
::view-transition-new(.page-enter) { animation: 420ms var(--ease) 80ms both vt-new; }
@keyframes vt-old { to { opacity: 0; transform: translateY(-12px); filter: blur(5px); } }
@keyframes vt-new { from { opacity: 0; transform: translateY(22px); filter: blur(7px); } }

/* 헤더 고정(전환 중 흔들림 방지) */
::view-transition-group(site-header) { animation: none; z-index: 100; }
::view-transition-old(site-header), ::view-transition-new(site-header) { animation: none; }

/* 포트폴리오 썸네일 → 상세 morph */
::view-transition-group(.morph) { animation-duration: 420ms; }
::view-transition-image-pair(.morph) { animation-name: via-blur; }
@keyframes via-blur { 30% { filter: blur(3px); } }

/* ---- 모션 민감성 존중 ---- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; animation-delay: 0s !important; transition-duration: 0.001ms !important; }
  .reveal, .stagger > * { opacity: 1 !important; transform: none !important; }
  ::view-transition-old(*), ::view-transition-new(*), ::view-transition-group(*) { animation-duration: 0s !important; animation-delay: 0s !important; }
}
```

- [ ] **Step 2: dev 프리뷰로 배경/폰트 확인**

dev 서버 새로고침 후: 배경이 딥네이비(#070a12)+보라/시안 글로우, 본문 한글이 Pretendard로 보이는지 스크린샷 확인. (Nav/페이지는 아직 구톤일 수 있음 — 정상)

- [ ] **Step 3: 타입/린트/빌드 확인**

Run: `npx tsc --noEmit && npm run lint` → 기대: 에러 0.

- [ ] **Step 4: 커밋**

```bash
git add app/globals.css
git commit -m "feat: replace design tokens with Modern Dark Premium system + motion CSS"
```

---

### Task 0.4: 페이지 전환 래퍼 `app/template.tsx`

**Files:**
- Create: `app/template.tsx`

- [ ] **Step 1: 생성**

```tsx
import { ViewTransition } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit">
      {children}
    </ViewTransition>
  )
}
```

> 참고: `<ViewTransition>`는 React가 제공하며 RSC에서 동작한다. 만약 빌드/런타임에서 ViewTransition 관련 에러가 나면 파일 첫 줄에 `'use client'`를 추가한다.

- [ ] **Step 2: 전환 동작 확인 (프리뷰)**

dev에서 `/` ↔ `/portfolio` ↔ `/blog` 이동 시 페이지 콘텐츠가 fade+slide+blur로 전환되는지 확인(헤더는 고정). 미지원/미동작 시 Task 8.5 폴백 참조.

- [ ] **Step 3: 커밋**

```bash
git add app/template.tsx
git commit -m "feat: add page transition wrapper via React ViewTransition"
```

---

## Phase 1 — Reveal 프리미티브

### Task 1.1: `components/Reveal.tsx`

**Files:**
- Create: `components/Reveal.tsx`

- [ ] **Step 1: 생성**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & { stagger?: boolean }

export default function Reveal({ stagger = false, className = '', children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
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
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const cls = [stagger ? 'stagger' : 'reveal', shown ? 'in' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={cls} {...rest}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: 타입/린트 확인**

Run: `npx tsc --noEmit && npm run lint` → 기대: 에러 0.

- [ ] **Step 3: 커밋**

```bash
git add components/Reveal.tsx
git commit -m "feat: add Reveal (IntersectionObserver scroll-in) component"
```

---

## Phase 2 — Chrome (Nav / Footer)

### Task 2.1: `components/Nav.tsx` 리디자인

**Files:**
- Modify: `components/Nav.tsx`

- [ ] **Step 1: 전체 교체** (자기소개 링크 추가, C 톤, 헤더 `viewTransitionName`, 모바일 메뉴 유지)

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Mail, Menu, X } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { profile } from '@/content/profile'

const links = [
  { href: '/', label: '홈' },
  { href: '/about', label: '자기소개' },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/blog', label: '블로그' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className="sticky top-0 z-50 border-b border-border bg-bg/55 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-[17px] font-bold tracking-tight">
          <span className="h-[11px] w-[11px] rounded-[3px]" style={{ background: 'var(--grad)', boxShadow: '0 0 12px rgba(124,58,237,.7)' }} />
          {profile.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-fg ${
                isActive(l.href) ? 'text-fg' : 'text-muted'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <span className="mx-2 h-4 w-px bg-border" />
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="px-1 text-muted hover:text-accent-2" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href={`mailto:${profile.socials.email}`} className="px-1 text-muted hover:text-accent-2" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>

        <button className="text-muted md:hidden" onClick={() => setOpen(!open)} aria-label="메뉴 토글">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-[1080px] flex-col gap-1 px-6 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`py-2 text-sm ${isActive(l.href) ? 'text-fg' : 'text-muted'}`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-4">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-muted hover:text-accent-2" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href={`mailto:${profile.socials.email}`} className="text-muted hover:text-accent-2" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: 프리뷰 확인** — sticky 글래스 내비, 4개 링크, 활성 색상, 모바일 토글 동작.

- [ ] **Step 3: 커밋**

```bash
git add components/Nav.tsx
git commit -m "feat: redesign Nav (glass, about link, view-transition header)"
```

---

### Task 2.2: `components/Footer.tsx` 리디자인

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: 전체 교체**

```tsx
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="relative z-[1] mt-32 border-t border-border">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-4 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-display text-sm text-muted-2">© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex gap-5">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-muted hover:text-accent-2" aria-label="GitHub">
            <GithubIcon size={20} />
          </a>
          <a href={`mailto:${profile.socials.email}`} className="text-muted hover:text-accent-2" aria-label="Email">
            <Mail size={20} />
          </a>
          {profile.socials.linkedin && (
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-accent-2" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add components/Footer.tsx
git commit -m "feat: redesign Footer for dark premium theme"
```

---

## Phase 3 — 홈

### Task 3.1: `components/home/Hero.tsx`

**Files:**
- Modify: `components/home/Hero.tsx`

- [ ] **Step 1: 전체 교체**

```tsx
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { profile } from '@/content/profile'

export default function Hero() {
  return (
    <section className="flex min-h-[78vh] flex-col justify-center py-16">
      <Reveal>
        <span className="pill"><span className="pill-dot" /> 지금 협업 가능</span>
      </Reveal>
      <Reveal>
        <p className="mt-6 font-display text-lg font-medium text-muted">{profile.name}</p>
        <h1 className="mt-2 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          <span className="gradient-text">{profile.tagline}</span>
        </h1>
      </Reveal>
      <Reveal>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.bioShort}</p>
      </Reveal>
      <Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/portfolio" className="btn-grad">프로젝트 보기 →</Link>
          <Link href="/about" className="btn-glass">자기소개</Link>
        </div>
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 2: 프리뷰 확인** — pill, 그라데이션 헤드라인, 버튼, 스크롤 진입 시 등장.

- [ ] **Step 3: 커밋**

```bash
git add components/home/Hero.tsx
git commit -m "feat: redesign Hero (gradient headline, pill, reveal)"
```

---

### Task 3.2: `components/home/Skills.tsx`

**Files:**
- Modify: `components/home/Skills.tsx`

- [ ] **Step 1: 전체 교체**

```tsx
import Reveal from '@/components/Reveal'
import { profile } from '@/content/profile'

export default function Skills() {
  return (
    <section className="py-14">
      <Reveal><p className="section-label">// SKILLS</p></Reveal>
      <Reveal stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => (
          <div key={group.category} className="glass card-hover p-6">
            <h3 className="font-display text-base font-semibold">{group.category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="chip">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add components/home/Skills.tsx
git commit -m "feat: redesign Skills (glass cards, staggered reveal)"
```

---

### Task 3.3: `components/ProjectCard.tsx` + `components/home/FeaturedProjects.tsx`

**Files:**
- Modify: `components/ProjectCard.tsx`, `components/home/FeaturedProjects.tsx`

- [ ] **Step 1: `ProjectCard.tsx` 교체** (글래스 + 썸네일 morph name)

```tsx
import Link from 'next/link'
import { ViewTransition } from 'react'
import type { Project } from '@/lib/types'

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, frontmatter } = project
  return (
    <Link href={`/portfolio/${slug}`} className="group glass card-hover flex flex-col overflow-hidden">
      <ViewTransition name={`project-${slug}`} share="morph">
        <div className="flex h-32 items-center justify-center" style={{ background: 'linear-gradient(120deg, rgba(124,58,237,.18), rgba(34,211,238,.12))' }}>
          <span className="font-display text-sm text-muted">{frontmatter.period}</span>
        </div>
      </ViewTransition>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display font-semibold text-fg group-hover:gradient-text">{frontmatter.title}</h3>
        <p className="mt-1 text-sm text-muted">{frontmatter.role}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {frontmatter.stack.slice(0, 4).map((s) => (
            <span key={s} className="chip text-[11px]">{s}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
```

> 참고: `group-hover:gradient-text`는 `.gradient-text` 정의를 hover 시 적용. Tailwind가 임의 클래스에 group-hover 변형을 못 붙이면, `<h3>`에 `transition-colors group-hover:text-accent`로 대체.

- [ ] **Step 2: `FeaturedProjects.tsx` 교체** (C 톤 + reveal)

```tsx
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { getFeaturedProjects } from '@/lib/content'
import ProjectCard from '@/components/ProjectCard'

export default function FeaturedProjects() {
  const projects = getFeaturedProjects().slice(0, 3)
  if (projects.length === 0) return null
  return (
    <section className="py-14">
      <Reveal>
        <div className="flex items-center justify-between">
          <p className="section-label">// FEATURED PROJECTS</p>
          <Link href="/portfolio" className="text-sm text-muted hover:text-fg">전체 보기 →</Link>
        </div>
      </Reveal>
      <Reveal stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 3: 프리뷰/타입 확인** — 카드 글래스/호버, featured 3개 표시. `npx tsc --noEmit`.

- [ ] **Step 4: 커밋**

```bash
git add components/ProjectCard.tsx components/home/FeaturedProjects.tsx
git commit -m "feat: glass project cards with shared-element morph + reveal"
```

---

### Task 3.4: `components/home/About.tsx` (요약 + /about 링크)

**Files:**
- Modify: `components/home/About.tsx`

- [ ] **Step 1: 전체 교체**

```tsx
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { profile } from '@/content/profile'

export default function About() {
  return (
    <section className="py-14">
      <Reveal>
        <p className="section-label">// ABOUT</p>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-fg/90">{profile.bioShort}</p>
        <Link href="/about" className="mt-5 inline-block text-sm text-accent-2 hover:underline">
          자기소개 더 보기 →
        </Link>
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add components/home/About.tsx
git commit -m "feat: redesign home About summary with link to /about"
```

---

### Task 3.5: `components/home/ContactCTA.tsx`

**Files:**
- Modify: `components/home/ContactCTA.tsx`

- [ ] **Step 1: 전체 교체** (글래스 패널)

```tsx
import { Mail } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { GithubIcon } from '@/components/icons'
import { profile } from '@/content/profile'

export default function ContactCTA() {
  return (
    <section id="contact" className="py-14">
      <Reveal>
        <div className="glass overflow-hidden p-12 text-center" style={{ background: 'linear-gradient(120deg, rgba(124,58,237,.12), rgba(34,211,238,.08))' }}>
          <h2 className="text-3xl font-bold tracking-tight">함께 좋은 제품을 만들어요</h2>
          <p className="mt-3 text-muted">새로운 기회와 협업에 열려 있습니다.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${profile.socials.email}`} className="btn-grad"><Mail size={16} /> 이메일 보내기</a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="btn-glass"><GithubIcon size={16} /> GitHub</a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add components/home/ContactCTA.tsx
git commit -m "feat: redesign ContactCTA as glass gradient panel"
```

---

### Task 3.6: `app/page.tsx` 홈 섹션 재구성

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: 전체 교체** (Timeline 제거 → /about로 이동, 순서 정리)

```tsx
import Hero from '@/components/home/Hero'
import Skills from '@/components/home/Skills'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import About from '@/components/home/About'
import ContactCTA from '@/components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Skills />
      <FeaturedProjects />
      <About />
      <ContactCTA />
    </>
  )
}
```

- [ ] **Step 2: 프리뷰 확인** — 홈 전체 스크롤하며 모든 섹션 등장/정상.

- [ ] **Step 3: 커밋**

```bash
git add app/page.tsx
git commit -m "feat: restructure home sections (move timeline to about)"
```

---

## Phase 4 — 자기소개 페이지

### Task 4.1: `components/home/Timeline.tsx` 리디자인

**Files:**
- Modify: `components/home/Timeline.tsx`

- [ ] **Step 1: 전체 교체** (글래스 타임라인 카드 + reveal)

```tsx
import Reveal from '@/components/Reveal'
import { profile } from '@/content/profile'

export default function Timeline() {
  return (
    <>
      <section className="py-10">
        <Reveal><p className="section-label">// EXPERIENCE</p></Reveal>
        <Reveal stagger className="mt-6 flex flex-col gap-4">
          {profile.experience.map((e, i) => (
            <div key={i} className="glass flex flex-col gap-4 p-6 sm:flex-row">
              <div className="font-display text-sm text-accent-2 sm:w-40 sm:shrink-0">{e.period}</div>
              <div>
                <h3 className="font-semibold text-fg">{e.role} · {e.org}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{e.summary}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="py-10">
        <Reveal><p className="section-label">// EDUCATION</p></Reveal>
        <Reveal stagger className="mt-6 flex flex-col gap-4">
          {profile.education.map((e, i) => (
            <div key={i} className="glass flex flex-col gap-4 p-6 sm:flex-row">
              <div className="font-display text-sm text-accent-2 sm:w-40 sm:shrink-0">{e.period}</div>
              <h3 className="font-semibold text-fg">{e.degree} · {e.org}</h3>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add components/home/Timeline.tsx
git commit -m "feat: redesign Timeline as glass cards"
```

---

### Task 4.2: `app/about/page.tsx` 신규

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: 생성**

```tsx
import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import Skills from '@/components/home/Skills'
import Timeline from '@/components/home/Timeline'
import { profile } from '@/content/profile'

export const metadata: Metadata = { title: '자기소개', description: profile.bioShort }

export default function AboutPage() {
  return (
    <div className="py-16">
      <section className="py-10">
        <Reveal>
          <p className="section-label">// ABOUT</p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            안녕하세요,<br /><span className="gradient-text">{profile.name}</span>입니다.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.bioShort}</p>
        </Reveal>
      </section>
      <Skills />
      <Timeline />
    </div>
  )
}
```

- [ ] **Step 2: 프리뷰 확인** — `/about` 진입, 인트로+스킬+타임라인, 내비 "자기소개" 활성.

- [ ] **Step 3: 커밋**

```bash
git add app/about/page.tsx
git commit -m "feat: add /about page (intro + skills + timeline)"
```

---

## Phase 5 — 포트폴리오

### Task 5.1: `app/portfolio/page.tsx`

**Files:**
- Modify: `app/portfolio/page.tsx`

- [ ] **Step 1: 전체 교체**

```tsx
import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import { getAllProjects } from '@/lib/content'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = { title: '포트폴리오', description: '프로젝트 모음' }

export default function PortfolioPage() {
  const projects = getAllProjects()
  return (
    <div className="py-16">
      <Reveal>
        <p className="section-label">// PORTFOLIO</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">만든 <span className="gradient-text">것들</span></h1>
      </Reveal>
      {projects.length === 0 ? (
        <p className="mt-8 text-muted">아직 등록된 프로젝트가 없습니다.</p>
      ) : (
        <Reveal stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </Reveal>
      )}
    </div>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add app/portfolio/page.tsx
git commit -m "feat: redesign portfolio list"
```

---

### Task 5.2: `app/portfolio/[slug]/page.tsx` (+morph 대상)

**Files:**
- Modify: `app/portfolio/[slug]/page.tsx`

- [ ] **Step 1: 전체 교체** (헤더 배너에 동일 morph name; 나머지 로직/`generateStaticParams` 유지)

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ViewTransition } from 'react'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { getAllProjects, getProject } from '@/lib/content'
import { Mdx } from '@/components/mdx'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return { title: project.frontmatter.title, description: project.frontmatter.role }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const { frontmatter, content } = project

  return (
    <article className="py-16">
      <Link href="/portfolio" className="font-display text-sm text-muted hover:text-fg">← 포트폴리오</Link>

      <ViewTransition name={`project-${slug}`} share="morph">
        <div className="mt-4 flex h-44 items-end overflow-hidden rounded-2xl border border-border p-7" style={{ background: 'linear-gradient(120deg, rgba(124,58,237,.22), rgba(34,211,238,.14))' }}>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{frontmatter.title}</h1>
            <p className="mt-2 font-display text-sm text-muted">{frontmatter.period} · {frontmatter.role}</p>
          </div>
        </div>
      </ViewTransition>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {frontmatter.stack.map((s) => (
          <span key={s} className="chip text-[11px]">{s}</span>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        {frontmatter.repo && (
          <a href={frontmatter.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent-2 hover:underline">
            <GithubIcon size={15} /> 저장소
          </a>
        )}
        {frontmatter.demo && (
          <a href={frontmatter.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent-2 hover:underline">
            <ExternalLink size={15} /> 데모
          </a>
        )}
      </div>
      <hr className="my-8 border-border" />
      <Mdx source={content} />
    </article>
  )
}
```

- [ ] **Step 2: 프리뷰 확인** — 포트폴리오 목록 카드 클릭 → 상세로 **morph** 전환되는지(썸네일이 헤더 배너로 확대 이동). 빌드 후 정적에서도 확인(Task 8).

- [ ] **Step 3: 커밋**

```bash
git add app/portfolio/[slug]/page.tsx
git commit -m "feat: redesign project detail with shared-element morph header"
```

---

## Phase 6 — 블로그

### Task 6.1: `components/PostCard.tsx`

**Files:**
- Modify: `components/PostCard.tsx`

- [ ] **Step 1: 전체 교체**

```tsx
import Link from 'next/link'
import type { Post } from '@/lib/types'
import { formatDate } from '@/lib/format'

export default function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter } = post
  return (
    <Link href={`/blog/${slug}`} className="group glass card-hover block p-6">
      <p className="font-display text-xs text-muted-2">{formatDate(frontmatter.date)}</p>
      <h3 className="mt-2 text-lg font-semibold text-fg transition-colors group-hover:text-accent-2">{frontmatter.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{frontmatter.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {frontmatter.tags.map((t) => (
          <span key={t} className="chip text-[11px]">#{t}</span>
        ))}
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add components/PostCard.tsx
git commit -m "feat: redesign PostCard as glass card"
```

---

### Task 6.2: `app/blog/page.tsx`

**Files:**
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: 전체 교체**

```tsx
import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import { getAllPosts } from '@/lib/content'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = { title: '블로그', description: '기술 블로그' }

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="py-16">
      <Reveal>
        <p className="section-label">// BLOG</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">글 <span className="gradient-text">쓰기</span></h1>
      </Reveal>
      {posts.length === 0 ? (
        <p className="mt-8 text-muted">아직 작성된 글이 없습니다.</p>
      ) : (
        <Reveal stagger className="mt-8 grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </Reveal>
      )}
    </div>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add app/blog/page.tsx
git commit -m "feat: redesign blog list"
```

---

### Task 6.3: `app/blog/[slug]/page.tsx`

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: 전체 교체** (로직/`generateStaticParams` 유지, 헤더 톤만)

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPost } from '@/lib/content'
import { formatDate } from '@/lib/format'
import { Mdx } from '@/components/mdx'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: post.frontmatter.title, description: post.frontmatter.summary }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const { frontmatter, content } = post

  return (
    <article className="py-16">
      <Link href="/blog" className="font-display text-sm text-muted hover:text-fg">← 블로그</Link>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{frontmatter.title}</h1>
      <p className="mt-3 font-display text-sm text-muted">{formatDate(frontmatter.date)}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {frontmatter.tags.map((t) => (
          <span key={t} className="chip text-[11px]">#{t}</span>
        ))}
      </div>
      <hr className="my-8 border-border" />
      <Mdx source={content} />
    </article>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: redesign blog post detail"
```

---

### Task 6.4: `components/mdx/index.tsx` 다크 prose 튜닝

**Files:**
- Modify: `components/mdx/index.tsx`

- [ ] **Step 1: 전체 교체** (prose 액센트 색을 토큰에 맞춤)

```tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'

const prettyCodeOptions: PrettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: true,
}

const components = {
  a: (props: React.ComponentPropsWithoutRef<'a'>) => (
    <a className="text-accent-2 underline underline-offset-2 hover:text-accent" {...props} />
  ),
}

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-a:text-accent-2 prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-code:text-accent-2">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: 프리뷰 확인** — 블로그/프로젝트 상세 본문 가독성, 코드 블록 표시.

- [ ] **Step 3: 커밋**

```bash
git add components/mdx/index.tsx
git commit -m "feat: tune MDX prose for dark premium theme"
```

---

## Phase 7 — 404

### Task 7.1: `app/not-found.tsx`

**Files:**
- Modify: `app/not-found.tsx`

- [ ] **Step 1: 전체 교체**

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="section-label">// 404</p>
      <h1 className="mt-4 text-7xl font-extrabold tracking-tight"><span className="gradient-text">404</span></h1>
      <p className="mt-4 text-muted">페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="btn-grad mt-8">홈으로 →</Link>
    </div>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add app/not-found.tsx
git commit -m "feat: redesign 404 page"
```

---

## Phase 8 — 검증 & 마무리

### Task 8.1: 타입·린트·테스트

- [ ] **Step 1: 실행**

```bash
npx tsc --noEmit
npm run lint
npm test
```

기대: 타입 에러 0, 린트 에러 0, 테스트 전부 PASS(기존 `lib/content.test.ts`).

- [ ] **Step 2: 실패 시 수정 후 재실행.** (커밋 불필요 — 통과만 확인)

---

### Task 8.2: 정적 빌드(export) 검증

- [ ] **Step 1: 빌드**

Run: `npm run build`
기대: 성공, `out/` 디렉터리에 `index.html`, `about/index.html`, `portfolio/index.html`, `portfolio/<slug>/index.html`, `blog/index.html`, `blog/<slug>/index.html`, `404.html` 생성.

- [ ] **Step 2: 산출물 확인**

Run: `ls out out/about out/portfolio out/blog`
기대: 위 HTML들이 존재.

---

### Task 8.3: 프리뷰 종합 점검(애니메이션)

- [ ] **Step 1: dev 프리뷰에서 다음을 스크린샷으로 확인**
  - 홈/자기소개/포트폴리오/블로그/404 각 페이지 C 톤 정상
  - 내비 이동 시 **페이지 전환**(fade+slide+blur), 헤더 고정
  - 포트폴리오 목록 카드 → 상세 **morph**
  - 스크롤 시 섹션 **stagger 등장**
  - 카드 **호버** 글로우/리프트
  - 콘솔 에러 0 (`preview_console_logs` level=error)

- [ ] **Step 2: reduced-motion 확인** — OS/브라우저에서 "동작 줄이기" 활성화 시 애니메이션 없이 즉시 표시되는지 확인(또는 devtools rendering 패널에서 prefers-reduced-motion 강제).

---

### Task 8.4: 정리 커밋

- [ ] **Step 1: 잔여 변경 커밋**

```bash
git add -A
git commit -m "chore: portfolio redesign verification pass" || echo "nothing to commit"
```

---

### Task 8.5: (조건부) View Transitions 폴백

**View Transitions가 정적 export에서 동작하지 않을 경우에만 수행.** (Task 0.4 / 8.3에서 전환 미동작 확인 시)

**Files:**
- Create: `components/RouteTransition.tsx`
- Modify: `app/template.tsx`

- [ ] **Step 1: CSS 기반 라우트 전환 컴포넌트 생성**

```tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [stage, setStage] = useState<'in' | 'out'>('in')
  const [shown, setShown] = useState(children)
  const prev = useRef(pathname)

  useEffect(() => {
    if (prev.current === pathname) return
    prev.current = pathname
    setStage('out')
    const t = setTimeout(() => {
      setShown(children)
      setStage('in')
    }, 180)
    return () => clearTimeout(t)
  }, [pathname, children])

  return <div className={stage === 'out' ? 'route-out' : 'route-in'}>{shown}</div>
}
```

- [ ] **Step 2: globals.css에 폴백 키프레임 추가**

```css
.route-in { animation: 420ms var(--ease) both vt-new; }
.route-out { animation: 180ms ease-in both vt-old; }
```

- [ ] **Step 3: `app/template.tsx`를 폴백으로 교체**

```tsx
import RouteTransition from '@/components/RouteTransition'

export default function Template({ children }: { children: React.ReactNode }) {
  return <RouteTransition>{children}</RouteTransition>
}
```

> 이 경우 morph(공유 요소)는 생략되고 페이지 단위 fade/slide만 적용된다. globals.css의 `::view-transition-*` 규칙은 남겨둬도 무해.

- [ ] **Step 4: 빌드/프리뷰 재확인 후 커밋**

```bash
git add -A
git commit -m "fix: CSS route-transition fallback for static export"
```

---

## Self-Review (작성자 점검 결과)

**1. 스펙 커버리지** — 스펙 각 절을 태스크에 매핑:
- 비주얼 시스템(색/타이포/표면/배경) → T0.2, T0.3 ✅
- IA & 내비(+/about) → T2.1, T4.2 ✅
- 페이지별(홈·about·포트폴리오·블로그·404) → Phase 3,4,5,6,7 ✅
- 페이지 전환(View Transitions, 헤더 고정, morph) → T0.1, T0.3, T0.4, T3.3, T5.2 ✅
- 스크롤 등장(CSS+IO) → T1.1 + 각 컴포넌트 ✅
- 화려 고정/토글 없음 → T0.3(`--rise:46px`, 토글 미구현) ✅
- reduced-motion → T0.3 ✅
- 접근법 A(Framer Motion 미사용) → 전체 ✅
- 정적 export 호환 검증 → T8.2, 폴백 T8.5 ✅
- 비범위(콘텐츠/라이트모드/모션토글/FM) → 미포함 ✅

**2. 플레이스홀더 스캔** — "TBD/적절히 처리/생략" 등 없음. 모든 코드 단계에 완전한 코드 포함. ✅

**3. 타입/이름 일관성** — `Reveal`(stagger prop), `profile.*`(기존 스키마), `getFeaturedProjects/getAllProjects/getAllPosts`(기존 시그니처), morph name 규칙 `project-${slug}`(ProjectCard·상세 동일), CSS 클래스(`.glass/.chip/.btn-grad/.btn-glass/.pill/.section-label/.gradient-text/.card-hover/.reveal/.stagger`)가 globals.css 정의와 사용처 일치. ✅

**알려진 리스크**: `group-hover:gradient-text`(T3.3)는 Tailwind 임의-클래스 변형이 안 먹을 수 있어 대체안 명시. View Transitions × export 미동작 시 T8.5 폴백.

---

## 실행 방식 선택

플랜 저장 완료: `docs/superpowers/plans/2026-06-04-portfolio-redesign.md`

> 사용자 선호(메모): **태스크가 아니라 "단계(Phase)별로 서브에이전트 1개"**. 아래 1번을 고를 경우 Phase 단위로 디스패치합니다.

**1. Subagent-Driven (추천)** — Phase별 서브에이전트 디스패치 + Phase 사이 리뷰. 빠른 반복.
**2. Inline Execution** — 이 세션에서 직접 단계별 실행(executing-plans), 체크포인트마다 리뷰.

어느 방식으로 진행할까요?
