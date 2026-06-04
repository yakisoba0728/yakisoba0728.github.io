# 개인 페이지 (개발자 포트폴리오 + 블로그) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 다크/터미널 무드의 개발자 포트폴리오 + MDX 블로그를 Next.js로 구축해 Vercel에 배포한다.

**Architecture:** Next.js(App Router)로 전부 정적 생성(SSG). 콘텐츠는 DB 없이 파일 기반 — 블로그/프로젝트는 `content/*.mdx`(gray-matter 프론트매터), 프로필은 타입 지정 TS 데이터. `lib/content.ts`의 순수 파싱/정렬 로직은 TDD. 렌더는 `next-mdx-remote/rsc`.

**Tech Stack:** Next.js 16(App Router) · TypeScript · Tailwind CSS v4 · next-mdx-remote · gray-matter · remark-gfm · rehype-pretty-code(+shiki) · @tailwindcss/typography · lucide-react · Vitest

---

## File Structure

| 파일 | 책임 |
|---|---|
| `lib/types.ts` | Post/Project 및 프론트매터 타입 정의 |
| `lib/content.ts` | 콘텐츠 파싱(순수) + 파일시스템 로더/정렬/필터 |
| `lib/format.ts` | 날짜 포맷 유틸 |
| `lib/content.test.ts` | content 순수 로직 단위 테스트 |
| `content/profile.ts` | 프로필 구조 데이터(이름·소개·skills·경력·학력·소셜) |
| `content/blog/*.mdx` | 블로그 글 |
| `content/projects/*.mdx` | 프로젝트 케이스 스터디 |
| `app/layout.tsx` | 루트 레이아웃(폰트·다크·Nav·Footer) |
| `app/globals.css` | Tailwind v4 import + 테마 토큰 |
| `app/page.tsx` | 홈(한 페이지 스크롤) |
| `app/portfolio/page.tsx` · `app/portfolio/[slug]/page.tsx` | 프로젝트 목록/상세 |
| `app/blog/page.tsx` · `app/blog/[slug]/page.tsx` | 블로그 목록/상세 |
| `app/not-found.tsx` | 404 |
| `components/Nav.tsx` · `components/Footer.tsx` | 상단바 / 푸터 |
| `components/mdx/index.tsx` | MDX 렌더러 + 요소 오버라이드 |
| `components/ProjectCard.tsx` · `components/PostCard.tsx` | 카드 |
| `components/home/*.tsx` | 홈 섹션(Hero/About/Skills/Timeline/FeaturedProjects/ContactCTA) |

각 파일은 단일 책임을 가진다. 컴포넌트는 `content`/`lib`에서 데이터를 받아 표현만 담당하고, 데이터 로딩/가공은 `lib/content.ts`에 격리한다.

---

## Task 1: Next.js 프로젝트 스캐폴딩

**Files:**
- Create: 프로젝트 전반(create-next-app 생성물)
- Delete: `.superpowers/` (gitignore된 브레인스토밍 목업, 역할 종료)

- [ ] **Step 1: 브레인스토밍 산출물 정리**

```bash
rm -rf /Users/yakihyuk0728/Desktop/port/.superpowers
```

- [ ] **Step 2: Next.js 앱 생성 (현재 디렉터리에)**

`docs/`, `.git`, `.gitignore`는 create-next-app 허용 목록에 포함되어 그대로 둔 채 생성된다.

Run:
```bash
cd /Users/yakihyuk0728/Desktop/port
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
```
Expected: `app/`, `package.json`, `next.config.ts`, `tsconfig.json`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx` 생성. 기존 `.git`을 감지해 git 재초기화는 건너뜀.

- [ ] **Step 3: 개발 빌드로 정상 동작 확인**

Run: `npm run build`
Expected: 빌드 성공(스캐폴딩 기본 페이지). 에러 없음.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app (TS, Tailwind, App Router)"
```

---

## Task 2: 의존성 및 테스트 도구 설치

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (scripts에 test 추가)

- [ ] **Step 1: 런타임/콘텐츠 의존성 설치**

Run:
```bash
npm install next-mdx-remote gray-matter remark-gfm rehype-pretty-code shiki lucide-react @tailwindcss/typography
```
Expected: 설치 성공, `package.json` dependencies에 추가됨.

- [ ] **Step 2: 테스트 도구 설치**

Run: `npm install -D vitest`
Expected: devDependencies에 `vitest` 추가.

- [ ] **Step 3: Vitest 설정 작성**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['lib/**/*.test.ts'],
  },
})
```

- [ ] **Step 4: package.json에 test 스크립트 추가**

`package.json`의 `"scripts"` 객체에 다음 줄을 추가한다:
```json
"test": "vitest run"
```

- [ ] **Step 5: 테스트 러너 동작 확인 (테스트 없음 상태)**

Run: `npm test`
Expected: "No test files found" 또는 0 테스트로 정상 종료(에러 아님).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add MDX/content deps and Vitest"
```

---

## Task 3: 콘텐츠 타입과 프로필 데이터

**Files:**
- Create: `lib/types.ts`
- Create: `content/profile.ts`

- [ ] **Step 1: 타입 정의 작성**

Create `lib/types.ts`:
```ts
export interface PostFrontmatter {
  title: string
  date: string // YYYY-MM-DD
  summary: string
  tags: string[]
  published: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string // raw MDX body
}

export interface ProjectFrontmatter {
  title: string
  period: string
  role: string
  stack: string[]
  thumbnail?: string
  repo?: string
  demo?: string
  featured: boolean
  order: number
  published: boolean
}

export interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
  content: string
}
```

- [ ] **Step 2: 프로필 데이터 작성 (플레이스홀더)**

Create `content/profile.ts`:
```ts
export interface SocialLinks {
  github: string
  email: string
  linkedin?: string
}
export interface SkillGroup {
  category: string
  items: string[]
}
export interface ExperienceItem {
  org: string
  role: string
  period: string
  summary: string
}
export interface EducationItem {
  org: string
  degree: string
  period: string
}
export interface Profile {
  name: string
  tagline: string
  bioShort: string
  socials: SocialLinks
  skills: SkillGroup[]
  experience: ExperienceItem[]
  education: EducationItem[]
}

export const profile: Profile = {
  name: '홍길동',
  tagline: '문제를 코드로 푸는 백엔드 개발자입니다.',
  bioShort:
    '안정적이고 확장 가능한 백엔드 시스템을 설계하고 운영하는 것을 좋아합니다. 작은 개선을 꾸준히 쌓아 사용자에게 가치를 전달하는 데 집중합니다.',
  socials: {
    github: 'https://github.com/yourname',
    email: 'you@example.com',
    linkedin: 'https://www.linkedin.com/in/yourname',
  },
  skills: [
    { category: 'Languages', items: ['TypeScript', 'Go', 'Python'] },
    { category: 'Backend', items: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis'] },
    { category: 'Infra', items: ['Docker', 'Kubernetes', 'AWS'] },
  ],
  experience: [
    {
      org: 'OOO 컴퍼니',
      role: 'Backend Engineer',
      period: '2023.01 – 현재',
      summary: '결제 시스템 백엔드 설계 및 운영, 일 평균 트래픽 30% 처리 개선.',
    },
  ],
  education: [{ org: 'OO대학교', degree: '컴퓨터공학 학사', period: '2017 – 2023' }],
}
```

- [ ] **Step 3: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 없음.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add content types and profile data"
```

---

## Task 4: 콘텐츠 로직 (TDD)

**Files:**
- Test: `lib/content.test.ts`
- Create: `lib/content.ts`
- Create: `lib/format.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

Create `lib/content.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { parsePost, parseProject, byDateDesc, byOrderAsc, selectPublished } from './content'

describe('parsePost', () => {
  it('프론트매터와 본문을 파싱한다', () => {
    const raw = `---\ntitle: Hello\ndate: 2026-01-01\nsummary: Hi\ntags: [a, b]\npublished: true\n---\nBody here`
    const post = parsePost('hello', raw)
    expect(post.slug).toBe('hello')
    expect(post.frontmatter.title).toBe('Hello')
    expect(post.frontmatter.tags).toEqual(['a', 'b'])
    expect(post.content.trim()).toBe('Body here')
  })

  it('published 기본값은 true, tags 기본값은 []', () => {
    const raw = `---\ntitle: NoPub\ndate: 2026-01-01\nsummary: s\n---\nx`
    const post = parsePost('nopub', raw)
    expect(post.frontmatter.published).toBe(true)
    expect(post.frontmatter.tags).toEqual([])
  })
})

describe('parseProject', () => {
  it('featured=false, order=0, published=true 기본값', () => {
    const raw = `---\ntitle: P\nperiod: 2024\nrole: dev\nstack: [Go]\n---\nbody`
    const proj = parseProject('p', raw)
    expect(proj.frontmatter.featured).toBe(false)
    expect(proj.frontmatter.order).toBe(0)
    expect(proj.frontmatter.published).toBe(true)
    expect(proj.frontmatter.stack).toEqual(['Go'])
  })
})

describe('comparators & filters', () => {
  it('byDateDesc는 최신 날짜를 앞으로 정렬', () => {
    const a = { frontmatter: { date: '2026-01-01' } } as never
    const b = { frontmatter: { date: '2026-02-01' } } as never
    expect([a, b].sort(byDateDesc)[0]).toBe(b)
  })

  it('byOrderAsc는 작은 order를 앞으로 정렬', () => {
    const a = { frontmatter: { order: 2 } } as never
    const b = { frontmatter: { order: 1 } } as never
    expect([a, b].sort(byOrderAsc)[0]).toBe(b)
  })

  it('selectPublished는 published=false를 제거', () => {
    const items = [
      { frontmatter: { published: true } },
      { frontmatter: { published: false } },
    ] as never[]
    expect(selectPublished(items)).toHaveLength(1)
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test`
Expected: FAIL — `./content` 모듈/함수가 없어 import 에러.

- [ ] **Step 3: content.ts 구현**

Create `lib/content.ts`:
```ts
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Post, PostFrontmatter, Project, ProjectFrontmatter } from './types'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

export function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw)
  const frontmatter: PostFrontmatter = {
    title: data.title ?? '',
    date: data.date ?? '',
    summary: data.summary ?? '',
    tags: data.tags ?? [],
    published: data.published ?? true,
  }
  return { slug, frontmatter, content }
}

export function parseProject(slug: string, raw: string): Project {
  const { data, content } = matter(raw)
  const frontmatter: ProjectFrontmatter = {
    title: data.title ?? '',
    period: data.period ?? '',
    role: data.role ?? '',
    stack: data.stack ?? [],
    thumbnail: data.thumbnail,
    repo: data.repo,
    demo: data.demo,
    featured: data.featured ?? false,
    order: data.order ?? 0,
    published: data.published ?? true,
  }
  return { slug, frontmatter, content }
}

export const byDateDesc = (a: Post, b: Post): number =>
  a.frontmatter.date < b.frontmatter.date ? 1 : a.frontmatter.date > b.frontmatter.date ? -1 : 0

export const byOrderAsc = (a: Project, b: Project): number =>
  a.frontmatter.order - b.frontmatter.order

export function selectPublished<T extends { frontmatter: { published: boolean } }>(
  items: T[],
): T[] {
  return items.filter((i) => i.frontmatter.published)
}

function readDir(dir: string): { slug: string; raw: string }[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({
      slug: f.replace(/\.mdx$/, ''),
      raw: fs.readFileSync(path.join(dir, f), 'utf8'),
    }))
}

export function getAllPosts(): Post[] {
  return selectPublished(readDir(BLOG_DIR).map(({ slug, raw }) => parsePost(slug, raw))).sort(
    byDateDesc,
  )
}

export function getPost(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null
}

export function getAllProjects(): Project[] {
  return selectPublished(
    readDir(PROJECTS_DIR).map(({ slug, raw }) => parseProject(slug, raw)),
  ).sort(byOrderAsc)
}

export function getProject(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.frontmatter.featured)
}
```

- [ ] **Step 4: format 유틸 작성**

Create `lib/format.ts`:
```ts
export function formatDate(date: string): string {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npm test`
Expected: PASS (모든 테스트 통과).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add content loading/parsing with tests"
```

---

## Task 5: 시드 콘텐츠 작성

**Files:**
- Create: `content/blog/hello-world.mdx`, `content/blog/nextjs-app-router.mdx`
- Create: `content/projects/realtime-chat.mdx`, `content/projects/payment-gateway.mdx`, `content/projects/cli-tool.mdx`

- [ ] **Step 1: 블로그 글 2개 작성**

Create `content/blog/hello-world.mdx`:
```mdx
---
title: 블로그를 시작하며
date: 2026-05-20
summary: 개인 블로그를 열며 앞으로 어떤 글을 쓸지 적어봅니다.
tags: [회고, 시작]
published: true
---

안녕하세요. 이 공간에는 개발하면서 배운 것들을 정리해 두려고 합니다.

## 앞으로 쓸 것들

- 백엔드 설계에서 마주친 문제와 해결 과정
- 도구를 다루며 얻은 작은 팁

```ts
function greet(name: string): string {
  return `Hello, ${name}!`
}
```

꾸준히 적어보겠습니다.
```

Create `content/blog/nextjs-app-router.mdx`:
```mdx
---
title: Next.js App Router로 정적 사이트 만들기
date: 2026-05-28
summary: App Router의 SSG와 generateStaticParams를 활용한 콘텐츠 사이트 구성 메모.
tags: [Next.js, 프론트엔드]
published: true
---

App Router에서는 `generateStaticParams`로 빌드 타임에 경로를 생성할 수 있습니다.

```tsx
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}
```

덕분에 별도 서버 없이도 빠른 정적 페이지를 얻습니다.
```

- [ ] **Step 2: 프로젝트 3개 작성 (2개 featured)**

Create `content/projects/realtime-chat.mdx`:
```mdx
---
title: 실시간 채팅 서비스
period: 2024.03 – 2024.08
role: Backend Lead
stack: [TypeScript, NestJS, WebSocket, Redis]
featured: true
order: 1
published: true
repo: https://github.com/yourname/realtime-chat
---

## 문제

기존 폴링 방식의 채팅은 지연이 크고 서버 부하가 높았습니다.

## 접근

WebSocket과 Redis Pub/Sub으로 메시지 전파 구조를 재설계했습니다.

## 결과

평균 메시지 지연을 800ms에서 60ms로 줄였습니다.
```

Create `content/projects/payment-gateway.mdx`:
```mdx
---
title: 결제 게이트웨이 연동
period: 2023.09 – 2024.02
role: Backend Engineer
stack: [Go, PostgreSQL, Kafka]
featured: true
order: 2
published: true
---

## 문제

여러 PG사를 개별 연동하다 보니 코드 중복과 장애 전파가 잦았습니다.

## 접근

PG 추상화 레이어와 멱등 처리·재시도 큐를 도입했습니다.

## 결과

신규 PG 연동 기간을 2주에서 3일로 단축했습니다.
```

Create `content/projects/cli-tool.mdx`:
```mdx
---
title: 사내 배포 CLI 도구
period: 2023.05 – 2023.07
role: Maintainer
stack: [Go, Cobra]
featured: false
order: 3
published: true
repo: https://github.com/yourname/deploy-cli
---

## 문제

배포 절차가 문서로만 존재해 휴먼 에러가 잦았습니다.

## 접근

대화형 CLI로 절차를 코드화하고 검증 단계를 넣었습니다.

## 결과

배포 실수로 인한 롤백이 분기당 5건에서 0건이 되었습니다.
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "content: add seed blog posts and projects"
```

---

## Task 6: 테마·레이아웃·Nav·Footer (앱 셸)

**Files:**
- Modify: `app/globals.css` (전체 교체)
- Modify: `app/layout.tsx` (전체 교체)
- Modify: `app/page.tsx` (임시 플레이스홀더로 교체)
- Create: `components/Nav.tsx`, `components/Footer.tsx`

- [ ] **Step 1: globals.css 교체 (테마 토큰)**

Replace entire `app/globals.css`:
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-bg: #0d1117;
  --color-surface: #161b22;
  --color-border: #21262d;
  --color-fg: #e6edf3;
  --color-muted: #7d8590;
  --color-accent: #3fb950;
  --color-accent-2: #58a6ff;

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, SFMono-Regular, monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-fg);
}
```

- [ ] **Step 2: 루트 레이아웃 교체**

Replace entire `app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { profile } from '@/content/profile'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

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
    <html lang="ko" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-bg text-fg font-sans antialiased">
        <Nav />
        <main className="mx-auto max-w-5xl px-5">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: 홈 임시 플레이스홀더**

Replace entire `app/page.tsx`:
```tsx
export default function HomePage() {
  return <div className="py-20 font-mono text-muted">home (구현 예정)</div>
}
```

- [ ] **Step 4: Nav 작성**

Create `components/Nav.tsx`:
```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Github, Mail, Menu, X } from 'lucide-react'
import { profile } from '@/content/profile'

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-mono font-bold text-accent">
          ~/{profile.name}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors hover:text-fg ${
                isActive(l.href) ? 'text-fg' : 'text-muted'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-border" />
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent-2"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={`mailto:${profile.socials.email}`}
            className="text-muted hover:text-accent-2"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <button
          className="text-muted md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="메뉴 토글"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-3">
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
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-accent-2"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={`mailto:${profile.socials.email}`}
                className="text-muted hover:text-accent-2"
                aria-label="Email"
              >
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

- [ ] **Step 5: Footer 작성**

Create `components/Footer.tsx`:
```tsx
import { Github, Mail, Linkedin } from 'lucide-react'
import { profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-10 text-center">
        <div className="flex gap-5">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent-2"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={`mailto:${profile.socials.email}`}
            className="text-muted hover:text-accent-2"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-accent-2"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          )}
        </div>
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공.

- [ ] **Step 7: 시각 확인 (선택)**

Run: `npm run dev` 후 브라우저에서 `http://localhost:3000` 확인 — 다크 배경, 상단바(브랜드/메뉴/아이콘), 푸터가 보여야 함.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: dark theme, root layout, nav and footer"
```

---

## Task 7: MDX 렌더러

**Files:**
- Create: `components/mdx/index.tsx`

- [ ] **Step 1: MDX 렌더러 작성**

Create `components/mdx/index.tsx`:
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
    <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-pre:border prose-pre:border-border prose-pre:bg-surface">
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

- [ ] **Step 2: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 없음.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add MDX renderer with gfm and syntax highlighting"
```

---

## Task 8: 홈 페이지 섹션

**Files:**
- Create: `components/home/Hero.tsx`, `About.tsx`, `Skills.tsx`, `Timeline.tsx`, `FeaturedProjects.tsx`, `ContactCTA.tsx`
- Create: `components/ProjectCard.tsx`
- Modify: `app/page.tsx` (실제 홈으로 교체)

- [ ] **Step 1: ProjectCard 작성 (홈/포트폴리오 공용)**

Create `components/ProjectCard.tsx`:
```tsx
import Link from 'next/link'
import type { Project } from '@/lib/types'

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, frontmatter } = project
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-muted"
    >
      <div className="flex h-28 items-center justify-center bg-gradient-to-br from-accent/15 to-accent-2/15">
        <span className="font-mono text-sm text-muted">{frontmatter.period}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-fg group-hover:text-accent">{frontmatter.title}</h3>
        <p className="mt-1 text-sm text-muted">{frontmatter.role}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {frontmatter.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Hero**

Create `components/home/Hero.tsx`:
```tsx
import Link from 'next/link'
import { profile } from '@/content/profile'

export default function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <p className="font-mono text-sm text-accent">$ whoami</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted sm:text-xl">{profile.tagline}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/portfolio"
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
        >
          프로젝트 보기 →
        </Link>
        <a
          href="#contact"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-muted"
        >
          연락하기
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: About**

Create `components/home/About.tsx`:
```tsx
import { profile } from '@/content/profile'

export default function About() {
  return (
    <section className="border-t border-border py-16">
      <p className="font-mono text-sm text-accent-2">// about</p>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-fg/90">{profile.bioShort}</p>
    </section>
  )
}
```

- [ ] **Step 4: Skills**

Create `components/home/Skills.tsx`:
```tsx
import { profile } from '@/content/profile'

export default function Skills() {
  return (
    <section className="border-t border-border py-16">
      <p className="font-mono text-sm text-accent-2">// skills</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => (
          <div key={group.category} className="rounded-lg border border-border bg-surface p-5">
            <h3 className="font-mono text-sm text-accent">{group.category}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border px-2.5 py-1 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Timeline (경력 + 학력)**

Create `components/home/Timeline.tsx`:
```tsx
import { profile } from '@/content/profile'

export default function Timeline() {
  return (
    <section className="border-t border-border py-16">
      <p className="font-mono text-sm text-accent-2">// experience</p>
      <ol className="mt-6 space-y-6 border-l border-border pl-6">
        {profile.experience.map((e, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="font-mono text-xs text-muted">{e.period}</p>
            <h3 className="mt-1 font-semibold text-fg">
              {e.role} · {e.org}
            </h3>
            <p className="mt-1 text-sm text-muted">{e.summary}</p>
          </li>
        ))}
      </ol>

      <p className="mt-12 font-mono text-sm text-accent-2">// education</p>
      <ol className="mt-6 space-y-6 border-l border-border pl-6">
        {profile.education.map((e, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-2" />
            <p className="font-mono text-xs text-muted">{e.period}</p>
            <h3 className="mt-1 font-semibold text-fg">
              {e.degree} · {e.org}
            </h3>
          </li>
        ))}
      </ol>
    </section>
  )
}
```

- [ ] **Step 6: FeaturedProjects**

Create `components/home/FeaturedProjects.tsx`:
```tsx
import Link from 'next/link'
import { getFeaturedProjects } from '@/lib/content'
import ProjectCard from '@/components/ProjectCard'

export default function FeaturedProjects() {
  const projects = getFeaturedProjects().slice(0, 3)
  if (projects.length === 0) return null
  return (
    <section className="border-t border-border py-16">
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm text-accent">// featured projects</p>
        <Link href="/portfolio" className="text-sm text-muted hover:text-fg">
          전체 보기 →
        </Link>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 7: ContactCTA**

Create `components/home/ContactCTA.tsx`:
```tsx
import { Github, Mail, Linkedin } from 'lucide-react'
import { profile } from '@/content/profile'

export default function ContactCTA() {
  return (
    <section id="contact" className="border-t border-border py-16">
      <p className="font-mono text-sm text-accent">$ ./contact.sh</p>
      <h2 className="mt-4 text-2xl font-bold">함께 일하거나 이야기 나누고 싶다면</h2>
      <p className="mt-2 text-muted">언제든 편하게 연락 주세요.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${profile.socials.email}`}
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:border-muted"
        >
          <Mail size={16} /> {profile.socials.email}
        </a>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:border-muted"
        >
          <Github size={16} /> GitHub
        </a>
        {profile.socials.linkedin && (
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:border-muted"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 8: 홈 페이지 조립**

Replace entire `app/page.tsx`:
```tsx
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Skills from '@/components/home/Skills'
import Timeline from '@/components/home/Timeline'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import ContactCTA from '@/components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <FeaturedProjects />
      <ContactCTA />
    </>
  )
}
```

- [ ] **Step 9: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공, `/` 정적 생성.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: home page sections (hero, about, skills, timeline, featured, contact)"
```

---

## Task 9: 포트폴리오 페이지 (목록 + 상세)

**Files:**
- Create: `app/portfolio/page.tsx`
- Create: `app/portfolio/[slug]/page.tsx`

- [ ] **Step 1: 포트폴리오 목록**

Create `app/portfolio/page.tsx`:
```tsx
import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/content'
import ProjectCard from '@/components/ProjectCard'

export const metadata: Metadata = { title: 'Portfolio', description: '프로젝트 모음' }

export default function PortfolioPage() {
  const projects = getAllProjects()
  return (
    <div className="py-16">
      <p className="font-mono text-sm text-accent">~/portfolio</p>
      <h1 className="mt-3 text-3xl font-bold">프로젝트</h1>
      {projects.length === 0 ? (
        <p className="mt-8 text-muted">아직 등록된 프로젝트가 없습니다.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: 포트폴리오 상세**

Create `app/portfolio/[slug]/page.tsx`:
```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Github, ExternalLink } from 'lucide-react'
import { getAllProjects, getProject } from '@/lib/content'
import { Mdx } from '@/components/mdx'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return { title: project.frontmatter.title, description: project.frontmatter.role }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const { frontmatter, content } = project

  return (
    <article className="py-16">
      <Link href="/portfolio" className="font-mono text-sm text-muted hover:text-fg">
        ← portfolio
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{frontmatter.title}</h1>
      <p className="mt-2 font-mono text-sm text-muted">
        {frontmatter.period} · {frontmatter.role}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {frontmatter.stack.map((s) => (
          <span
            key={s}
            className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        {frontmatter.repo && (
          <a
            href={frontmatter.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-accent-2 hover:underline"
          >
            <Github size={15} /> 저장소
          </a>
        )}
        {frontmatter.demo && (
          <a
            href={frontmatter.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-accent-2 hover:underline"
          >
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

- [ ] **Step 3: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공, `/portfolio` 및 각 프로젝트 슬러그 정적 생성(`/portfolio/realtime-chat` 등).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: portfolio list and detail pages"
```

---

## Task 10: 블로그 페이지 (목록 + 상세)

**Files:**
- Create: `components/PostCard.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: PostCard**

Create `components/PostCard.tsx`:
```tsx
import Link from 'next/link'
import type { Post } from '@/lib/types'
import { formatDate } from '@/lib/format'

export default function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter } = post
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-lg border border-border bg-surface p-5 transition-colors hover:border-muted"
    >
      <p className="font-mono text-xs text-muted">{formatDate(frontmatter.date)}</p>
      <h3 className="mt-2 text-lg font-semibold text-fg group-hover:text-accent">
        {frontmatter.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{frontmatter.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {frontmatter.tags.map((t) => (
          <span key={t} className="font-mono text-[11px] text-accent-2">
            #{t}
          </span>
        ))}
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: 블로그 목록**

Create `app/blog/page.tsx`:
```tsx
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/content'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = { title: 'Blog', description: '기술 블로그' }

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="py-16">
      <p className="font-mono text-sm text-accent-2">~/blog</p>
      <h1 className="mt-3 text-3xl font-bold">블로그</h1>
      {posts.length === 0 ? (
        <p className="mt-8 text-muted">아직 작성된 글이 없습니다.</p>
      ) : (
        <div className="mt-8 grid gap-4">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: 블로그 상세**

Create `app/blog/[slug]/page.tsx`:
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: post.frontmatter.title, description: post.frontmatter.summary }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const { frontmatter, content } = post

  return (
    <article className="py-16">
      <Link href="/blog" className="font-mono text-sm text-muted hover:text-fg">
        ← blog
      </Link>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{frontmatter.title}</h1>
      <p className="mt-2 font-mono text-sm text-muted">{formatDate(frontmatter.date)}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {frontmatter.tags.map((t) => (
          <span key={t} className="font-mono text-xs text-accent-2">
            #{t}
          </span>
        ))}
      </div>
      <hr className="my-8 border-border" />
      <Mdx source={content} />
    </article>
  )
}
```

- [ ] **Step 4: 빌드 확인**

Run: `npm run build`
Expected: 빌드 성공, `/blog` 및 각 글 슬러그 정적 생성(`/blog/hello-world` 등).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: blog list and post pages"
```

---

## Task 11: 404 페이지 + 최종 SEO/빌드 점검

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/robots.ts`

- [ ] **Step 1: not-found 페이지**

Create `app/not-found.tsx`:
```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm text-accent">$ cat /page</p>
      <h1 className="mt-4 text-5xl font-bold">404</h1>
      <p className="mt-3 text-muted">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg hover:opacity-90"
      >
        홈으로 →
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: robots 작성**

Create `app/robots.ts`:
```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
  }
}
```

- [ ] **Step 3: 전체 빌드 스모크 + 린트**

Run: `npm run build`
Expected: 빌드 성공. 생성 경로에 `/`, `/portfolio`, `/portfolio/[slug]`(3개), `/blog`, `/blog/[slug]`(2개), `/_not-found` 포함.

Run: `npm run lint`
Expected: 린트 통과(또는 경고만).

Run: `npm test`
Expected: 모든 단위 테스트 통과.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: 404 page and robots; final build pass"
```

---

## Task 12: Vercel 배포 (수동/선택)

**Files:** 없음 (배포 단계)

- [ ] **Step 1: GitHub 리포지토리 생성 및 푸시** (사용자 확인 후)

```bash
gh repo create <repo-name> --private --source=. --remote=origin --push
```

- [ ] **Step 2: Vercel 연결**

`https://vercel.com/new`에서 리포지토리 import → 프레임워크 Next.js 자동 인식 → Deploy. (또는 `vercel` CLI 설치 후 `vercel` 실행)

- [ ] **Step 3: 환경 변수 (선택)**

`NEXT_PUBLIC_SITE_URL`에 실제 배포 도메인 설정(OG/메타데이터 절대 URL용).

---

## Self-Review

**1. Spec coverage:**
- 페이지 구조(spec §4) → Task 6/8/9/10/11에서 `/`, `/portfolio`, `/portfolio/[slug]`, `/blog`, `/blog/[slug]`, 404 모두 구현 ✅
- 콘텐츠 모델(spec §5) → Task 3(types/profile), Task 4(parse/load), Task 5(seed), Task 7(MDX 렌더) ✅
- 컴포넌트 단위(spec §6) → Nav/Footer(T6), mdx(T7), 홈 섹션·ProjectCard(T8), PostCard(T10), `lib/content.ts`(T4) ✅
- 렌더링/SEO(spec §7) → SSG + generateStaticParams + Metadata + robots(T9~T11) ✅
- 비주얼 시스템(spec §8) → 테마 토큰·폰트(T6), 터미널 모티프(Hero/섹션 라벨) ✅
- 테스트(spec §11) → `lib/content.ts` TDD(T4), 빌드 스모크(T11) ✅
- 배포(spec §12) → Task 12 ✅
- 제외 항목(이력서 PDF·라이트 토글·검색·댓글·다국어) → 계획에 미포함(의도적) ✅

**2. Placeholder scan:** "TODO/TBD/적절히 처리" 없음. 모든 코드 스텝에 실제 코드 포함. 프로필/시드의 더미 데이터는 "사용자 실제 데이터로 교체"가 명시된 의도적 시드.

**3. Type consistency:** `Post`/`Project`/`*Frontmatter`(types.ts) ↔ `parsePost`/`parseProject`/getter 반환 타입 일치. `Mdx({ source })`, `ProjectCard({ project })`, `PostCard({ post })` 시그니처가 호출부와 일치. `byDateDesc`/`byOrderAsc`/`selectPublished` 이름이 테스트와 구현에서 동일. Next 15/16 규약대로 `params: Promise<{slug}>` + `await` 사용.
