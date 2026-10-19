# yaki.kr

김동혁의 개인 포트폴리오·블로그입니다. Next.js App Router, React, TypeScript, Tailwind CSS 4와 MDX를 사용하며, 정적 파일로 빌드해 GitHub Pages에 배포합니다.

## 로컬 실행·검증

CI와 같은 Node.js 22 환경을 권장합니다.

```bash
npm ci
npm run dev
```

개발 서버: <http://localhost:3000>

```bash
npm run lint
npm test
npm run build
```

빌드 결과는 `out/`에 생성됩니다. `output: 'export'`이므로 운영에서는 Next.js 서버가 아니라 정적 파일 호스팅을 사용합니다.

## 콘텐츠 수정

- `content/profile.ts`: 한영 소개, 기술, 경력·학력, 수상·자격·언론보도. 학력 과정명은 이 파일에 적힌 값을 그대로 표시합니다.
- `content/projects/*.mdx`: 프로젝트 목록·상세. `order`로 정렬하고 `featured: true`인 프로젝트 중 앞의 3개를 홈에 표시합니다.
- `content/blog/*.mdx`: 블로그 글. 공개 글만 최신순으로 목록·상세·사이트맵에 포함합니다. 현재 샘플 글 2개는 `published: false`입니다.
- 글을 게시하려면 프런트매터의 `published`를 `true`로 바꾸고 다시 빌드합니다. 공개 글이 없으면 블로그는 빈 상태를 표시합니다.

## 배포

`main`에 푸시하면 `.github/workflows/deploy.yml`이 의존성 설치 → 린트 → 테스트 → 정적 빌드 → GitHub Pages 배포를 실행합니다. 수동 실행도 가능합니다.

- 도메인: `public/CNAME`의 `yaki.kr`
- 메타데이터·사이트맵 기본 URL: `https://yaki.kr`
- 다른 주소로 빌드하려면 `NEXT_PUBLIC_SITE_URL`을 지정합니다.

## 의존성 보안 상태

2026-10-19 기준 Next.js·ESLint 설정은 16.4.2, Vitest는 4.1.12로 검증했습니다. 수정 가능한 전이 의존성을 업데이트하고 사용하지 않는 Typography 플러그인을 제거했습니다.

`npm audit`에는 아직 패치가 없는 두 계열의 경고 9건(High 5, Moderate 4, Critical 0)이 남습니다.

- ESLint → fast-glob → micromatch → [braces](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): 린트 도구의 패턴 처리 경로입니다.
- gray-matter → js-yaml → argparse → [sprintf-js](https://github.com/advisories/GHSA-hp3w-g68c-fv3c): js-yaml의 CLI 의존성입니다. 사이트는 YAML 라이브러리 API를 사용하며 해당 CLI를 실행하지 않습니다.

MDX는 신뢰하는 저장소 파일만 처리하고 운영에는 정적 파일만 배포합니다. 위 경고가 해결된 것으로 간주하지 않으며, 상위 패키지의 패치가 나오면 다시 업데이트해야 합니다. `npm audit fix --force`가 제안하는 구버전 강제 다운그레이드는 적용하지 않습니다.

## 과거 설계 기록

`docs/superpowers/`는 과거 설계·작업 기록이며 체크박스는 현재 진행률을 나타내지 않습니다. `/preview` 실험은 2026-06-09에 홈으로 통합되어 별도 경로가 제거되었습니다(`7413402`). 현재 동작은 코드와 이 README를 기준으로 확인합니다.
