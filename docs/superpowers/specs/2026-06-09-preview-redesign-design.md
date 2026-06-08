# /preview 배너 리디자인 + 전역 버그 수정 — 설계 문서

- **날짜**: 2026-06-09
- **상태**: 승인됨 (브레인스토밍 완료, 구현 계획 대기)
- **대상 저장소**: `yakisoba0728.github.io` (Next.js 16, `output: export`, GitHub Pages → `yaki.kr`)

## 1. 배경 / 현재 상태

홈(`app/page.tsx`)은 `Hero → Marquee → Counters → Bento → ContactCTA` 순으로 구성된다. 최근 ClickHouse 스타일 리디자인(near-black 캔버스 + 코랄 `#ec5a4d` 단색 강조)을 적용했고, `globals.css`는 의도적으로 그라데이션을 평면화했다(line 67 `.gradient-text` → flat color, *"no gradients in this system"*).

사용자 피드백 5건:
1. 배너에 주황 그라데이션을 더 넣고 싶다.
2. 기술 마퀴(흐르는 띠)가 "용암 같은 액체"처럼 흐르면 좋겠다.
3. 배너 분위기와 우측 코드창(`code-window`, `agent.py`)이 안 어울린다 → 반투명/외곽선 제거.
4. 파비콘(아이콘)이 네모로 보인다 → 둥글게.
5. 언어 전환 시 "연락하기/Get in touch" 버튼 너비가 바뀌며 KO/EN 토글이 움직인다 → 고정.

## 2. 목표 / 비목표

**목표**
- 원본(`yaki.kr/`)을 **시각적으로 그대로 유지**하면서, 리디자인 버전을 `yaki.kr/preview/`에서 동시에 볼 수 있게 한다.
- 명백한 버그(네비 흔들림, 네모 파비콘)는 원본 포함 **전역** 수정한다.
- 새 인프라/계정 없이 **기존 GitHub Pages 파이프라인 한 번의 빌드**로 두 버전을 모두 배포한다.

**비목표**
- 원본 디자인 시스템(코랄 단색, 평면) 자체를 바꾸지 않는다. 그라데이션/용암은 **`/preview` 한정 의도적 일탈**이다.
- 포트폴리오/블로그/about 등 다른 페이지의 시각 변경은 범위 밖. (단, 전역 버그 수정은 모든 페이지에 자연히 적용됨.)
- 이번 단계에서 변경본을 원본으로 "승격"하지 않는다(별도 후속 작업).

## 3. 배포 / 비교 아키텍처

- **라우트 분기**: `app/preview/page.tsx` 신규 추가 → 리디자인 홈. `app/page.tsx`(원본)는 **무수정**.
- `output: export`이므로 단일 빌드가 `out/index.html`(원본)과 `out/preview/index.html`(변경본)을 함께 생성. 같은 오리진이라 `basePath` 불필요, 자산 경로 문제 없음.
- 두 URL 모두 기존 루트 레이아웃(Nav/Footer/배경/grain)을 공유한다.
- **승격 경로(후속)**: `/preview`가 확정되면 `HeroV2/MarqueeV2`를 원본 컴포넌트로 승격(또는 `page.tsx` 내용 교체)하고 `.v2-*` 스타일을 표준 클래스로 이동하면 된다.

## 4. 컴포넌트 설계

**신규 (오직 `/preview`에서만 사용)**
- `components/home/HeroV2.tsx` — 원본 `Hero`와 동일한 레이아웃/콘텐츠, 단 코드창에 글래스 클래스(`code-window-glass`) 적용. 좌측 워밍 글로우 배경 요소(`v2-glow`) 포함.
- `components/MarqueeV2.tsx` — 원본 `Marquee`와 동일 데이터(`profile.skills` flatten), 단 항목에 용암 그라데이션 텍스트 클래스(`marquee-lava` 계열) 적용.
- `app/preview/page.tsx` — `HeroV2 → MarqueeV2 → Counters → Bento → ContactCTA` 조합. `Counters/Bento/ContactCTA`는 **원본 그대로 재사용**.

**무수정(재사용)**: `Counters`, `Bento`, `ContactCTA`, `Reveal`, `T`, `content/profile.ts`, 원본 `Hero.tsx`, 원본 `Marquee.tsx`.

**CSS 격리 원칙**: `globals.css`의 기존 규칙은 건드리지 않는다. 파일 하단에 `/* ===== /preview variant (scoped) ===== */` 블록을 **추가만** 하고 모든 선택자는 `.v2-`/`-glass`/`-lava` 네임스페이스를 쓴다 → 원본 클래스(`.code-window`, `.marquee`, `.pink-glow`)에 0 영향.

## 5. 시각 스펙 (브레인스토밍에서 확정된 값)

### 5.1 배너 그라데이션 — `.v2-glow` (확정: "A↔C 중간 · 균형")
위쪽 코랄 글로우 + 아래쪽 주황 불씨의 균형.
```css
background:
  radial-gradient(96% 72% at 50% 119%, rgba(249,115,22,0.27), rgba(236,90,77,0.14) 40%, transparent 64%),
  radial-gradient(ellipse 80% 55% at 50% -8%, rgba(236,90,77,0.27), transparent 60%);
```
- **스코프(필수 구조 결정)**: 이 글로우는 **`HeroV2` 내부에 `position: absolute`로, 히어로/배너 영역 크기에 맞춰** 렌더한다. 전역 `.pink-glow`처럼 `position: fixed; inset: 0`(풀뷰포트)로 깔면 **안 된다**.
  - 이유: 위 그라데이션 정지점은 **박스 상대 퍼센트**(예: 불씨 `at 50% 119%`)로, 목업의 배너 높이(~300–400px) 박스에 맞춰 보정된 값이다. 풀뷰포트로 늘리면 불씨가 화면 맨 아래로 가고 워시가 Bento/ContactCTA까지 번져 목업과 달라지고 "배너부분" 요청에도 어긋난다.
  - 따라서 `HeroV2`는 `position: relative` 컨테이너로 두고, `.v2-glow`는 그 안의 absolute 레이어(`inset: 0` 또는 배너 높이만큼), 히어로 콘텐츠는 `position: relative; z-index: 1`로 글로우 위에 둔다.
- z-index/스태킹 미세값과 세기는 구현 후 라이브 `/preview`에서 육안 검증하여 확정(grain은 기존대로 최상단 유지).

### 5.2 마퀴 용암 — `.marquee-lava` (확정: "A · 글자 속 용암 흐름")
```css
.marquee-lava .marquee-item {           /* 항목 텍스트에 흐르는 그라데이션 */
  color: transparent;
  -webkit-background-clip: text; background-clip: text;
  background-image: linear-gradient(90deg, #7c2d12, #f59e0b, #ff7a18, #ec5a4d, #7c2d12);
  background-size: 300% 100%;
  animation: lava-molten 4s linear infinite;
  filter: drop-shadow(0 0 7px rgba(249,115,22,0.40));
}
@keyframes lava-molten { to { background-position: 300% 0; } }
```
- 구분자 `/`는 muted 색 유지(그라데이션 영향 제외 — `-webkit-text-fill-color` 등으로 분리).
- 기존 마퀴의 좌우 mask-fade, 가로 스크롤(`marquee` 16~40s), hover-pause는 유지.
- **reduced-motion**: 기존 규칙과 일관되게 스크롤 + molten 애니메이션 모두 정지(정적 워밍 텍스트로 표시).

### 5.3 코드창 글래스 — `.code-window-glass` (확정: "A · 글래스")
```css
.code-window-glass {
  background: rgba(22,22,22,0.55);
  backdrop-filter: blur(10px) saturate(1.1);
  -webkit-backdrop-filter: blur(10px) saturate(1.1);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: 0 20px 60px rgba(0,0,0,0.45);
  border-radius: 12px;
}
.code-window-glass .code-window-bar { border-bottom: 1px solid rgba(255,255,255,0.07); }
```
- 코드 본문/도트/하이라이트 색은 원본 `.code-body .c-*` 재사용.
- 투명도/블러 세기는 구현 후 미세조정 가능.

## 6. 전역 버그 수정 (원본 포함, 모든 페이지)

### 6.1 네비 언어전환 레이아웃 흔들림 (⑤)
**원인 분석**: `Nav`의 우측 클러스터는 `justify-between`으로 오른쪽 끝이 고정된다. 클러스터 내부에서 KO/EN 토글의 위치는 **그 오른쪽에 있는 요소들의 총 너비**(divider + GitHub + Instagram + 연락하기 버튼)에 의해 결정된다. GitHub/Instagram/divider는 고정폭이므로, 토글이 움직이는 유일한 원인은 **연락하기 버튼의 너비 변화**(`연락하기` ↔ `Get in touch`)다. (좌측 네비 링크들의 너비 변화는 토글 왼쪽이라 토글 위치에 영향 없음.)

**수정**: 데스크톱 연락하기 버튼(`Nav.tsx:61`, `mailto` `btn-grad`)에 **두 언어 중 넓은 쪽(`Get in touch`)을 수용하는 고정 `min-width`** + 가운데 정렬 부여 → 너비 불변 → 토글 고정.
- 폰트 스왑(Pretendard/Inter FOUT)을 고려해 약간의 버퍼 폭을 둔다.
- 모바일 메뉴의 연락은 텍스트가 아닌 `Mail` 아이콘이라 흔들림 없음 → 수정 불필요.
- 적용 위치: 전역(원본 + `/preview` 공통 `Nav`).

### 6.2 파비콘 둥글게 (④)
현재 `app/icon.jpg`, `app/apple-icon.jpg`는 아바타의 **정사각 JPEG**(투명도 없음) → 탭에서 네모.

**수정**:
- `app/icon.jpg` → **원형 크롭 + 투명 배경 PNG**(`app/icon.png`)로 교체하고 기존 `icon.jpg` 제거(Next가 `icon.png` 자동 인식, 확장자 중복 방지).
- 소스는 `public/avatar.png`를 원형 마스킹(권장 512×512). 생성 도구는 구현 계획에서 가용성 확인(ImageMagick `magick`/`convert` 우선, 없으면 Node 캔버스/스크립트 대안).
- **apple-icon은 정사각 유지**: iOS가 홈화면 아이콘을 자동으로 둥글게 마스킹하므로 투명 원형 PNG는 모서리가 비쳐 오히려 부자연스럽다. 따라서 `apple-icon`은 현행(불투명 정사각) 유지가 기술적으로 옳다.

## 7. 변경 파일 목록

| 파일 | 작업 |
|---|---|
| `app/preview/page.tsx` | 신규 — 리디자인 홈 조합 |
| `components/home/HeroV2.tsx` | 신규 — 글래스 코드창 + 워밍 글로우 |
| `components/MarqueeV2.tsx` | 신규 — 용암 텍스트 마퀴 |
| `app/globals.css` | **추가만** — `.v2-glow` / `.marquee-lava` / `.code-window-glass` 스코프 블록 (+ reduced-motion) |
| `components/Nav.tsx` | 수정 — 연락하기 버튼 `min-width` 고정(전역) |
| `app/icon.png` | 신규 — 원형 투명 파비콘 |
| `app/icon.jpg` | 제거 |
| `app/apple-icon.jpg` | **유지(무수정)** |
| `app/page.tsx`, `Hero.tsx`, `Marquee.tsx` | **무수정(원본 보존)** |

## 8. 검증

- `npm run build` (정적 export) 성공 + `npm run lint` 통과.
- 로컬 dev 서버를 **`0.0.0.0` 바인딩**으로 띄워 원격에서 확인(`next dev -H 0.0.0.0`).
- 육안 체크:
  - `/` (원본): 시각적으로 변경 없음(네비 버튼 폭/파비콘 제외).
  - `/preview`: 워밍 그라데이션 + 용암 마퀴 + 글래스 코드창 정상.
  - 네비: KO↔EN 전환 시 토글 위치 고정(원본·preview 모두).
  - 파비콘: 브라우저 탭에서 원형 표시.
  - reduced-motion: 마퀴 정지.
- 빌드 산출물 확인: `out/index.html`, `out/preview/index.html` 둘 다 존재.

## 9. 리스크 / 참고

- **디자인 시스템 일탈**: 그라데이션/용암은 현 시스템의 "no gradients" 원칙과 상반되나, **`/preview` 한정 의도적 선택**이므로 일관성 위반이 아니라 비교 실험으로 본다.
- **`backdrop-filter` 지원**: 구형 브라우저 미지원 시 글래스가 불투명 폴백으로 보임 — 허용 가능(개인 사이트, 최신 브라우저 타깃).
- **승격 미수행**: 이번 범위는 비교까지. 승격은 사용자 확인 후 별도.
