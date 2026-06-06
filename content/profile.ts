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
  summary: string
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
    '멀티 에이전트 오케스트레이션 프레임워크를 만드는 중',
    'vLLM 기반 로컬 LLM 추론 최적화를 실험하는 중',
    'RAG 파이프라인 평가 자동화를 공부하는 중',
  ],
  nowEn: [
    'Building a multi-agent orchestration framework',
    'Experimenting with local LLM inference on vLLM',
    'Studying automated RAG evaluation',
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
  experience: [],
  education: [
    { org: '경북소프트웨어마이스터고등학교', degree: '소프트웨어 개발', period: '재학 중' },
  ],
  educationEn: [
    { org: 'Gyeongbuk Software Meister High School', degree: 'Software Development', period: 'Enrolled' },
  ],
}
