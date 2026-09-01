export interface SocialLinks {
  github: string
  instagram?: string
  email?: string
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
  summary?: string
  highlights?: string[]
}
export interface EducationItem {
  org: string
  degree: string
  period: string
}
export interface ActivityItem {
  title: string
  org?: string
  period?: string
}
export interface Profile {
  name: string
  nameEn: string
  tagline: string
  taglineEn: string
  lead: string
  leadEn: string
  roles: string[]
  rolesEn: string[]
  creedLines: string[]
  creedLinesEn: string[]
  creedHighlight: string[]
  creedHighlightEn: string[]
  bioShort: string
  bioShortEn: string
  bioLong: string[]
  bioLongEn: string[]
  socials: SocialLinks
  skills: SkillGroup[]
  now: string[]
  nowEn: string[]
  activities: ActivityItem[]
  activitiesEn: ActivityItem[]
  experience: ExperienceItem[]
  experienceEn: ExperienceItem[]
  education: EducationItem[]
  educationEn: EducationItem[]
}

export const profile: Profile = {
  name: '김동혁',
  nameEn: 'Donghyeok Kim',
  tagline: 'AI 에이전트로 만들고 싶은 걸 완성하는 에이전틱 엔지니어',
  taglineEn: 'An agentic engineer who ships what you imagine — with AI agents',
  lead: 'AI 에이전트와 함께, 아이디어를 빠르게 동작하는 제품으로 만듭니다.',
  leadEn: 'I turn ideas into working products, fast — together with AI agents.',
  roles: ['풀스택 개발자', 'AI 엔지니어', '에이전틱 엔지니어', '경북SW마이스터고 학생'],
  rolesEn: ['Full-stack Developer', 'AI Engineer', 'Agentic Engineer', 'SW Meister H.S. Student'],
  creedLines: ['변화를 따라가는 게 아니라,', '변화와 함께 성장하는 개발자'],
  creedLinesEn: ["I don't just keep up with change —", 'I grow with it.'],
  creedHighlight: ['변화', '성장'],
  creedHighlightEn: ['change', 'grow'],
  bioShort:
    '바이브코딩을 넘어 AI 에이전트를 오케스트레이션하는 에이전틱 엔지니어예요. 익숙하지 않은 언어·스택도 명확한 스펙과 컨텍스트로 빠르게 완성합니다.',
  bioShortEn:
    'An agentic engineer who orchestrates AI agents beyond vibe coding. I ship working products fast — even in unfamiliar stacks — with clear specs and context.',
  bioLong: [
    '바이브코딩을 넘어, AI 에이전트를 오케스트레이션해 제품을 만드는 에이전틱 엔지니어입니다. 경북소프트웨어마이스터고등학교에 재학 중이에요.',
    '명확한 스펙과 컨텍스트를 설계해, 익숙하지 않은 언어·스택도 실제로 동작하는 제품으로 빠르게 완성합니다. 만들고 싶은 게 생기면 일단 만들어보는 편이에요.',
  ],
  bioLongEn: [
    'An agentic engineer who builds products by orchestrating AI agents, beyond vibe coding. Currently a student at Gyeongbuk Software Meister High School.',
    'By designing clear specs and context, I quickly turn even unfamiliar languages and stacks into working products. When I want to build something, I just start building.',
  ],
  socials: {
    github: 'https://github.com/yakisoba0728',
    instagram: 'https://www.instagram.com/yakisoba0728/',
    email: 'yakisoba0728@yaki.kr',
  },
  skills: [
    { category: 'Languages', items: ['Python', 'TypeScript', 'Node.js', 'Java'] },
    { category: 'AI / ML', items: ['PyTorch', 'Hugging Face', 'LangChain', 'Claude API', 'vLLM', 'Ollama'] },
    { category: 'Web', items: ['Next.js', 'React', 'FastAPI', 'Tailwind CSS'] },
    { category: 'Infra / Tools', items: ['PostgreSQL', 'pgvector', 'Docker', 'AWS', 'Vercel', 'Git'] },
  ],
  now: [
    'Waple — macOS용 Wallpaper Engine 호환 런타임과 Metal 렌더러 개발',
    'VALORANT Replay Intelligence — .vrf 파서와 경기 분석 파이프라인 고도화',
    'GBSW Platform — 교내 통합관리시스템 기능·안정성 개선',
  ],
  nowEn: [
    'Waple — building a Wallpaper Engine-compatible runtime and Metal renderer for macOS',
    'VALORANT Replay Intelligence — improving the .vrf parser and match-analysis pipeline',
    'GBSW Platform — improving features and reliability of the school management platform',
  ],
  activities: [
    { title: '교내 AI 해커톤 대상', org: '경북소프트웨어마이스터고', period: '2025' },
    { title: '오픈소스 컨트리뷰션 (LLM 생태계)', period: '2025 — 현재' },
    { title: '사이드 프로젝트 다수 기획·배포', period: '2024 — 현재' },
  ],
  activitiesEn: [
    { title: 'Grand Prize — In-school AI Hackathon', org: 'Gyeongbuk SW Meister H.S.', period: '2025' },
    { title: 'Open-source contributions (LLM ecosystem)', period: '2025 — Present' },
    { title: 'Shipped numerous side projects', period: '2024 — Present' },
  ],
  experience: [
    {
      org: 'Weirdhost',
      role: 'R&D',
      period: '현재',
      highlights: [
        '프로덕션 서비스를 엔드투엔드로 관리·개발·운영했습니다.',
        '음성 생성 AI를 위한 데이터셋을 수집하고 정제했습니다.',
      ],
    },
  ],
  experienceEn: [
    {
      org: 'Weirdhost',
      role: 'R&D',
      period: 'Present',
      highlights: [
        'Managed, developed, and operated production services end-to-end.',
        'Collected and curated datasets for voice generation AI.',
      ],
    },
  ],
  education: [
    { org: '경북소프트웨어마이스터고등학교', degree: '학생', period: '2026 — 현재' },
    { org: '대구대학교 정보보호영재교육원', degree: '심화과정', period: '2026 — 현재' },
    { org: '대구대학교 정보보호영재교육원', degree: '심화과정', period: '2025' },
    { org: '대구대학교 정보보호영재교육원', degree: '주니어과정', period: '2024' },
    { org: '대구대학교 정보보호영재교육원', degree: '기초과정', period: '2023' },
    { org: '산자연중학교', degree: '학생', period: '2023 — 2025' },
    { org: '정평초등학교', degree: '학생', period: '2017 — 2022' },
  ],
  educationEn: [
    { org: 'Gyeongbuk Software Meister High School', degree: 'Student', period: '2026 — Present' },
    { org: 'Daegu University Gifted Education Center for Information Security', degree: 'Advanced Course', period: '2026 — Present' },
    { org: 'Daegu University Gifted Education Center for Information Security', degree: 'Advanced Course', period: '2025' },
    { org: 'Daegu University Gifted Education Center for Information Security', degree: 'Junior Course', period: '2024' },
    { org: 'Daegu University Gifted Education Center for Information Security', degree: 'Basic Course', period: '2023' },
    { org: 'Sanjayeon Middle School', degree: 'Student', period: '2023 — 2025' },
    { org: 'Jeongpyeong Elementary School', degree: 'Student', period: '2017 — 2022' },
  ],
}
