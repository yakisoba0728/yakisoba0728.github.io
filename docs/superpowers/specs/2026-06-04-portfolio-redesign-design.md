# 포트폴리오 리디자인 설계 — Modern Dark Premium

- **날짜**: 2026-06-04
- **상태**: 설계 확정 (구현 계획 대기)
- **대상**: 개인 포트폴리오 사이트 (`yaki.kr`, GitHub Pages 정적 호스팅)

## 1. 목표

기존 "GitHub 다크 / 터미널" 템플릿 톤을 버리고, **실제 포트폴리오 + 자기소개 + 블로그** 느낌의
세련된 사이트로 전면 리디자인한다. 상단 내비로 페이지를 오가며, **페이지 전환·스크롤 등장 등 화려한
애니메이션**을 입힌다. 콘텐츠(이름/경력/프로젝트/글)는 당분간 **세련된 더미**로 유지하고, 디자인과
모션 완성에 집중한다.

## 2. 확정된 결정 사항

| 항목 | 결정 |
| --- | --- |
| 비주얼 방향 | **C — Modern Dark Premium** (딥네이비 + 글래스 + 보라→시안 글로우) |
| 모션 강도 | **"화려"로 고정** (데모의 은은/화려 토글 버튼은 **미탑재**) |
| 구현 접근 | **A — 네이티브 View Transitions + CSS/IntersectionObserver** (Framer Motion 미사용) |
| 콘텐츠 | 더미 유지 (`content/profile.ts`, `content/projects/*`, `content/blog/*`) |
| 범위 | 전 페이지(홈·자기소개·포트폴리오·블로그·404) + 내비/푸터 |

참고 시각 자료: `.superpowers/brainstorm/25920-1780549688/content/design-c-prototype.html` (동작하는 인터랙티브 프로토타입, gitignore 대상).

## 3. 비주얼 시스템

Tailwind v4 `@theme` 토큰(`app/globals.css`)으로 정의한다. 기존 GitHub 다크 팔레트는 교체.

### 색
- 배경: `--color-bg: #070a12`, 보조 배경 `#0b0f1a`
- 전경: `--color-fg: #eef1f8`, 뮤트 `#9aa3b8` / `#6b7384`
- 라인: `rgba(255,255,255,.09)`
- 글래스 표면: `rgba(255,255,255,.045)` + 보더 `rgba(255,255,255,.10)`
- 액센트: 보라 `#a78bfa` → 시안 `#22d3ee` 그라데이션 (`--grad`), 단색 포인트 `#7c3aed` / `#22d3ee`

### 타이포
- 한글 본문/제목: **Pretendard** (가변, CDN 또는 self-host)
- 라틴/숫자/라벨: **Space Grotesk** (`next/font/google`)
- 기존 Inter / JetBrains Mono 제거. 라벨은 `Space Grotesk` + `letter-spacing` 대문자.

### 표면 & 컴포넌트 (공통 UI 토큰)
- **글래스 카드**: 반투명 배경 + 보더 + `backdrop-blur`, `border-radius:16px`
- **칩/태그**: 스킬·기술 태그 (글래스 + 시안 보더 변형)
- **버튼**: `b1`(그라데이션 채움), `b2`(글래스 아웃라인) — hover 시 살짝 떠오름/글로우
- **pill**: "지금 협업 가능" 등 상태 배지 (펄스 도트)
- **배경 레이어**: 고정 `radial-gradient` 글로우 2개(보라/시안, 느리게 drift) + 마스킹된 그리드

### 레이아웃
- 컨테이너 `max-width: 1080px`, 좌우 패딩 24px (기존 max-w-5xl에서 소폭 확장)
- 섹션 상하 패딩 넉넉히, 섹션 라벨(`// SKILLS` 식) + 콘텐츠 패턴

## 4. 정보구조(IA) & 내비게이션

- 상단 **sticky 내비** (backdrop-blur): 좌측 브랜드(마크+이름), 중앙/우측 링크 **홈 · 자기소개 · 포트폴리오 · 블로그**, 우측 "연락하기".
- 라우트: `/`(홈) · `/about`(자기소개, 신규) · `/portfolio` + `/portfolio/[slug]` · `/blog` + `/blog/[slug]`.
  - 현재 자기소개는 홈 내 About 섹션만 존재 → **독립 `/about` 페이지 신설** (내비 "자기소개" 대응). 홈에는 요약 About 유지.
- 내비 링크는 모두 `next/link` 사용 (View Transitions 활성화 전제).

## 5. 페이지별 구성

### 홈 `/`
히어로 → 스킬 → Featured 프로젝트(3) → 자기소개 요약 → 컨택 CTA.
- 히어로: 상태 pill, 그라데이션 타이틀, 리드 문구, `프로젝트 보기`/`연락하기` 버튼, 배경 글로우.

### 자기소개 `/about` (신규)
인트로 + 경력/학력 타임라인 + (선택) 스킬 상세. 글래스 타임라인 카드.

### 포트폴리오 `/portfolio`, `/portfolio/[slug]`
- 목록: 프로젝트 글래스 카드 그리드(호버 글로우/리프트), 썸네일/제목/요약/태그.
- 상세: 큰 헤더 + 본문(MDX) + 메타(기술/링크). **목록 썸네일 → 상세 헤더 이미지** 간 shared-element morph 대상.

### 블로그 `/blog`, `/blog/[slug]`
- 목록: 글 카드(날짜/제목/요약).
- 상세: 타이포그래피 중심 본문(MDX, `@tailwindcss/typography` 다크 튜닝).

### 404 `not-found`
C 톤 + 글로우 배경, 홈 복귀 CTA.

## 6. 애니메이션 설계

### 6.1 페이지 전환 — React `<ViewTransition>` (네이티브)
- `next.config.ts`에 `experimental.viewTransition: true` 추가.
- 페이지 콘텐츠를 `<ViewTransition>`로 감싸 **방향성 슬라이드** 적용:
  - 내비/`<Link>`에 `transitionTypes`로 `nav-forward` / `nav-back` 태깅, `enter`/`exit`를 타입별 매핑.
  - `::view-transition-old/new(.nav-*)` CSS 키프레임(slide + fade, 약 60px 오프셋).
- **헤더 고정**: `viewTransitionName: 'site-header'` + `::view-transition-group(site-header){animation:none}`.
- **shared-element morph**: 포트폴리오 목록 썸네일과 상세 헤더에 동일 `name` → 자연스러운 확대 이동(`share="morph"`, 블러 보정).
- 미지원 브라우저: 애니메이션만 생략, 기능은 정상(점진적 향상).

### 6.2 스크롤 등장 — CSS + IntersectionObserver
- 재사용 클라이언트 컴포넌트 `<Reveal>` (또는 `useReveal` 훅): 뷰포트 진입 시 `.in` 토글 → `opacity`/`translateY` 트랜지션.
- 컨테이너 `stagger`로 자식 순차 지연.
- "화려" 고정값: 이동거리 ~46px, 지속 ~0.95s, ease `cubic-bezier(.2,.75,.2,1)` (프로토타입 `body.rich` 값 채택). **토글 없음 — 상수로 하드코딩.**

### 6.3 호버 / 배경
- 카드 hover: 리프트 + 보더 글로우 + 포인터 추종 radial 하이라이트.
- 배경 글로우 orb 2개 느린 `@keyframes drift`, 버튼 hover 글로우.

### 6.4 접근성 — reduced-motion
- 전역 `@media (prefers-reduced-motion: reduce)`로 트랜지션/애니메이션 무력화, `.reveal`은 즉시 표시.
- View Transitions도 `::view-transition-*` 지속시간 0 처리.

## 7. 기술 접근 & 제약

- **접근법 A 확정**: 네이티브 View Transitions(페이지 전환) + CSS/IO(등장·호버). Framer Motion 미도입(번들 최소화). 추후 스프링 필요 시 한정 도입 가능(현재 비범위).
- **정적 export 제약**: `output: "export"`, `images.unoptimized: true` 유지. View Transitions는 클라이언트 네비게이션 시 동작하므로 export와 호환(구현 중 실제 빌드/네비로 **검증 필수**).
- **GitHub Pages**: 커스텀 도메인 `yaki.kr`(루트) → `basePath` 불필요. `public/CNAME` 유지.
- **스타일**: Tailwind v4 `@theme` 토큰 + 글로벌 CSS(키프레임/뷰트랜지션). 인라인 스타일 최소화.
- **폰트**: Space Grotesk는 `next/font/google`. Pretendard는 self-host(`public/`) 또는 CDN — 구현 시 결정(정적 export·성능 고려해 self-host 권장).

## 8. 컴포넌트 아키텍처 (상위 레벨, 상세는 구현 계획에서)

- **신규**: `app/about/page.tsx`, `components/Reveal.tsx`(IO 등장), `components/ui/`(Button·Card·Chip·Pill·SectionLabel·GlowBackground 등 토큰화), 페이지 전환 래퍼(`<ViewTransition>` 적용 컴포넌트 또는 `template.tsx`).
- **개편**: `app/globals.css`(토큰·키프레임·뷰트랜지션 전면 교체), `app/layout.tsx`(폰트·헤더 viewTransitionName·`<main>`), `components/Nav.tsx`(sticky·`transitionTypes`), `components/Footer.tsx`, `components/home/*`(C 톤·Reveal 적용), `components/ProjectCard.tsx`/`PostCard.tsx`(글래스·morph name), `components/mdx/index.tsx`(다크 타이포), `app/not-found.tsx`.
- **유지**: `content/*`(더미), `lib/*`, 라우팅 구조(`/about` 추가 외).

## 9. 접근성

- `prefers-reduced-motion` 대응(6.4).
- 충분한 대비(뮤트 텍스트도 본문 가독 기준 확인), 포커스 링 유지, 키보드 내비 가능.
- 모션은 의미 전달용(전환 방향=네비 방향), 과한 자동재생 지양.

## 10. 비범위 (Non-goals)

- 실제 개인정보/프로젝트/글 채우기 (이후 별도).
- 블로그 CMS/검색/태그 시스템 신규.
- 다국어, 다크/라이트 토글(다크 단일), 모션 강도 토글.
- Framer Motion 등 추가 애니메이션 라이브러리.

## 11. 검증 계획

- 로컬 dev에서 각 페이지/전환/스크롤 등장/호버를 프리뷰로 확인(스크린샷).
- `next build`(static export) 성공 + `out/` 산출물에서 페이지 전환·등장 동작 확인.
- reduced-motion 시 무애니메이션 동작 확인.
- 콘솔 에러 0, 기존 `lib/content.test.ts` 통과 유지.

## 12. 리스크 / 미해결

- **View Transitions × static export**: 호환 예상되나 빌드 산출물에서 반드시 실측. 미동작 시 폴백(라우트 단위 CSS 전환).
- **Pretendard 제공 방식**: self-host vs CDN (성능/오프라인) — 구현 시 확정.
- 모달/상세 morph가 카드 레이아웃과 잘 맞물리는지 실측 필요.
