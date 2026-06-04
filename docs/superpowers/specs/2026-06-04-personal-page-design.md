# 개인 페이지 (개발자 포트폴리오 + 블로그) — 설계 문서

- **작성일:** 2026-06-04
- **상태:** 승인됨 (구현 계획 작성 전)
- **콘텐츠 언어:** 한국어 (기본)

## 1. 개요

다크/터미널 무드의 **개발자 포트폴리오 + MDX 블로그**. 루트 페이지(`/`)는 채용/이직 어필을 위한 한 페이지 스크롤형 자기소개이고, 포트폴리오와 블로그는 상단바를 통해 별도 페이지로 확장된다. Next.js(App Router)로 정적 생성(SSG)하여 Vercel에 배포한다.

## 2. 목표 / 비목표

**목표**
- 루트에서 "무슨 개발자인지"가 즉시 전달되는 자기소개 메인
- 프로젝트를 목록 + 상세로 보여주는 포트폴리오
- 마크다운(MDX)으로 작성·관리하는 블로그
- DB·CMS·백엔드 없이 파일 기반으로 운영, 배포 한 번으로 게시
- 빠른 로딩과 검색 노출(SSG + 메타데이터)

**비목표 (v1에서 제외, 추후 확장 여지만 확보)**
- 이력서 PDF 다운로드
- 라이트/다크 토글 (v1은 다크 고정)
- 블로그 검색, 태그 필터 페이지
- 댓글(giscus 등)
- 다국어(i18n)
- 관리자 UI / 인증 / 데이터베이스

## 3. 핵심 결정 요약

| 항목 | 결정 |
|---|---|
| 정체성 | 개발자 / 엔지니어 |
| 메인 페이지 성격 | 취업/이직 어필 중심의 자기소개 (한 페이지 스크롤) |
| 콘텐츠 요소 | 프로젝트(목록+상세), 기술 스택, 경력/학력 타임라인, 연락처/SNS, 블로그 |
| 블로그 운영 | 마크다운/MDX 파일 (DB 없음) |
| 비주얼 | 다크 & 개발자(터미널/코드) 무드 |
| 기술 스택 | Next.js(App Router) + TypeScript + Tailwind CSS + MDX |
| 배포 | Vercel |

## 4. 페이지 구조 (App Router)

| 경로 | 설명 |
|---|---|
| `/` | 한 페이지 스크롤: Hero → About → Skills → Experience/Education 타임라인 → Featured Projects(2~3) → Contact |
| `/portfolio` | 전체 프로젝트 그리드 |
| `/portfolio/[slug]` | 프로젝트 상세 (문제·해결·스택·스크린샷·링크) |
| `/blog` | 글 목록 (태그 표시) |
| `/blog/[slug]` | MDX 본문 (코드 하이라이트) |
| `not-found.tsx` | 404 |

**상단바:** `Home · Portfolio · Blog` + 우측 GitHub/이메일 아이콘. 모바일에서는 햄버거 메뉴. 다크 고정.

## 5. 콘텐츠 아키텍처 (전부 파일 기반)

### 5.1 블로그 — `content/blog/*.mdx`
프론트매터:
```yaml
title: string
date: string            # YYYY-MM-DD
summary: string
tags: string[]
published: boolean      # 기본 true, false면 목록에서 제외
```

### 5.2 프로젝트 — `content/projects/*.mdx`
프론트매터:
```yaml
title: string
period: string          # 예: "2024.03 – 2024.08"
role: string
stack: string[]
thumbnail: string       # /public 기준 경로
repo?: string           # 저장소 URL
demo?: string           # 데모 URL
featured: boolean       # true면 홈 Featured 섹션에 노출
order: number           # 정렬 우선순위
published: boolean      # 기본 true
```
본문은 케이스 스터디(문제 → 접근 → 결과)를 MDX로 자유롭게 작성.

### 5.3 프로필 — `content/profile.ts`
구조적 데이터는 타입 안전한 TS 데이터 파일로 관리:
```ts
name, tagline, bioShort
socials: { github, email, linkedin?, ... }
skills: { category: string; items: string[] }[]
experience: { org, role, period, summary }[]
education: { org, degree, period }[]
```

### 5.4 MDX 처리
- `next-mdx-remote/rsc` (React Server Component 호환 렌더)
- `gray-matter` (프론트매터 파싱)
- `rehype-pretty-code` + `shiki` (다크 코드 테마 하이라이트)
- `remark-gfm` (표·취소선·체크박스 등)

## 6. 컴포넌트 구조 (각 단위는 단일 책임)

- `app/layout.tsx` — 루트 레이아웃, 폰트, 다크 배경, Nav/Footer 배치
- `components/Nav.tsx` — 상단바(데스크톱/모바일), 스크롤 시 sticky
- `components/Footer.tsx` — 연락처/SNS
- 홈 섹션: `Hero` · `About` · `Skills` · `Timeline` · `FeaturedProjects` · `ContactCTA`
- `components/ProjectCard.tsx` · `components/PostCard.tsx`
- `components/mdx/*` — MDX 요소 오버라이드(코드블록, 헤딩, 링크, 이미지)
- `lib/content.ts` — 콘텐츠 로딩/가공:
  - `getAllPosts()` / `getPost(slug)`
  - `getAllProjects()` / `getProject(slug)` / `getFeaturedProjects()`
  - published 필터, 날짜/`order` 정렬 포함
- `lib/mdx.ts` — MDX 컴파일 옵션(rehype/remark 플러그인) 모음

각 단위는 명확한 입력/출력 인터페이스를 갖고 독립적으로 이해·테스트 가능해야 한다.

## 7. 렌더링 / SEO

- 모든 페이지 **SSG**. 동적 경로는 `generateStaticParams`로 슬러그 생성 → 빌드 타임 정적화
- Next.js **Metadata API**로 페이지별 title/description/OpenGraph 설정
- v1 OG 이미지는 정적(추후 `next/og` 동적 생성 여지)

## 8. 비주얼 시스템 (다크 개발자)

- 색: 배경 `#0d1117` / 표면 `#161b22` / 경계 `#21262d` / 텍스트 `#e6edf3` / 뮤트 `#7d8590`
- 액센트: 그린 `#3fb950`(primary) + 블루 `#58a6ff`(secondary) — 정확한 팔레트는 구현 초기에 시안으로 한 번 더 조율
- 타이포: 본문 산세리프(예: Inter) + 라벨/액센트/코드는 모노스페이스(예: JetBrains Mono)
- 모티프: 터미널 프롬프트(`$`, `~/path`), 코드형 라벨. 과하지 않게 절제

## 9. 디렉토리 구조 (제안)

```
app/
  layout.tsx
  page.tsx                  # 홈
  globals.css
  not-found.tsx
  portfolio/page.tsx
  portfolio/[slug]/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
components/
  Nav.tsx  Footer.tsx
  home/ Hero.tsx About.tsx Skills.tsx Timeline.tsx FeaturedProjects.tsx ContactCTA.tsx
  ProjectCard.tsx  PostCard.tsx
  mdx/ index.tsx
content/
  profile.ts
  blog/*.mdx
  projects/*.mdx
lib/
  content.ts  mdx.ts
public/
  images/...
tailwind.config.ts
next.config.mjs
```

## 10. 에러 처리 / 엣지 케이스

- 존재하지 않는 슬러그 → `notFound()` (404). `generateStaticParams`가 유효 슬러그만 빌드
- 빈 상태: 글/프로젝트가 없을 때 안내 문구 표시
- `published: false` 콘텐츠는 목록·상세 모두에서 제외
- 프론트매터 누락/형식 오류 시 빌드에서 인지 가능하도록 타입/검증 처리

## 11. 테스트 전략

- 로직 핵심인 `lib/content.ts`는 **TDD** (Vitest):
  - 프론트매터 파싱 정확성
  - `published: false` 제외
  - 날짜/`order` 정렬
  - featured 필터
- UI 컴포넌트는 브라우저/프리뷰로 시각 검증
- 빌드 스모크(빌드 성공 = 모든 정적 경로 생성 확인)

## 12. 기술 스택 / 주요 의존성

- 런타임/프레임워크: `next`, `react`, `react-dom`, `typescript`
- 스타일: `tailwindcss`, `postcss`, `autoprefixer`, `clsx`/`tailwind-merge`
- 콘텐츠: `next-mdx-remote`, `gray-matter`, `rehype-pretty-code`, `shiki`, `remark-gfm`
- 보조: 아이콘(`lucide-react`), 날짜 포맷(`date-fns`)
- 테스트: `vitest`
- 배포: Vercel (프레임워크 자동 인식)

## 13. 범위 (v1)

**포함:** 4의 모든 페이지, 5의 콘텐츠 모델, 6의 컴포넌트, 8의 다크 비주얼, SSG/SEO, `lib/content.ts` 테스트

**제외(추후):** 이력서 PDF, 라이트 토글, 검색, 태그 필터 페이지, 댓글, 다국어, 관리자/DB

## 14. 열린 질문

- 정확한 액센트 팔레트(그린/블루 비중)는 구현 초기에 시안으로 확정
- 실제 콘텐츠(이름·프로젝트·경력 데이터)는 사용자 제공 시점에 채움 (초기엔 플레이스홀더)
