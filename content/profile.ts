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
  tagline: '아이디어를 실제로 동작하는 제품으로 만드는 엔지니어',
  taglineEn: 'An engineer who turns ideas into working products',
  lead: '웹부터 시스템·보안·인프라·AI까지, 아이디어를 직접 설계하고 실제로 동작하는 제품으로 완성합니다.',
  leadEn: 'I design and build working products across web, systems, security, infrastructure, and AI.',
  roles: ['풀스택 개발자', '시스템 엔지니어', '보안 연구자', 'AI 엔지니어', '경북SW마이스터고 학생'],
  rolesEn: ['Full-stack Developer', 'Systems Engineer', 'Security Researcher', 'AI Engineer', 'SW Meister H.S. Student'],
  creedLines: ['변화를 따라가는 게 아니라,', '변화와 함께 성장하는 개발자'],
  creedLinesEn: ["I don't just keep up with change —", 'I grow with it.'],
  creedHighlight: ['변화', '성장'],
  creedHighlightEn: ['change', 'grow'],
  bioShort:
    '웹 서비스부터 시스템 소프트웨어, 보안·리버스 엔지니어링, AI까지 분야를 가리지 않고 필요한 기술을 직접 익혀 실제로 동작하는 제품을 만듭니다. 정보보호·CTF 대회에서도 여러 차례 수상하며 보안 문제를 깊게 파고드는 것을 좋아합니다.',
  bioShortEn:
    'I build working products across web, systems software, security, reverse engineering, and AI. I also enjoy digging deeply into security problems and have earned multiple awards in cybersecurity and CTF competitions.',
  bioLong: [
    '아이디어가 생기면 직접 설계하고 구현해 실제로 동작하는 제품까지 완성하는 엔지니어입니다. 웹·백엔드뿐 아니라 시스템 소프트웨어, 인프라, AI 등 문제에 필요한 영역을 가리지 않고 파고듭니다.',
    '보안과 리버스 엔지니어링에도 깊은 관심을 갖고 있으며, 정보보호·CTF 대회에서 여러 차례 수상했습니다. 단순히 기능을 만드는 데서 끝내지 않고 내부 동작을 이해하고 검증하며 안정적으로 운영할 수 있는 구조까지 고민합니다.',
  ],
  bioLongEn: [
    'I am an engineer who takes an idea from design to implementation and turns it into a working product. I work across web and backend development, systems software, infrastructure, and AI whenever the problem calls for it.',
    'I am also deeply interested in security and reverse engineering, and have earned multiple awards in cybersecurity and CTF competitions. I care not only about building features, but also about understanding how systems work, validating them, and designing them to operate reliably.',
  ],
  socials: {
    github: 'https://github.com/yakisoba0728',
    instagram: 'https://www.instagram.com/yakisoba0728/',
    email: 'yakisoba0728@yaki.kr',
  },
  skills: [
    { category: 'Languages', items: ['Python', 'TypeScript', 'Node.js', 'Java'] },
    { category: 'Security', items: ['Reverse Engineering', 'CTF', 'Binary Analysis', 'Ghidra'] },
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
    { title: '정보보호·CTF 대회 다수 수상', period: '2023 — 현재' },
    { title: '교내 AI 해커톤 대상', org: '경북소프트웨어마이스터고', period: '2025' },
    { title: '오픈소스 컨트리뷰션 (LLM 생태계)', period: '2025 — 현재' },
    { title: '사이드 프로젝트 다수 기획·배포', period: '2024 — 현재' },
  ],
  activitiesEn: [
    { title: 'Multiple awards in cybersecurity & CTF competitions', period: '2023 — Present' },
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
