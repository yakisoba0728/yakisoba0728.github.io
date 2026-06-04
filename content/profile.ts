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
  name: '김동혁',
  tagline: 'AI 에이전트로 만들고 싶은 걸 완성하는 에이전틱 엔지니어',
  bioShort:
    '바이브코딩을 넘어, AI 에이전트를 오케스트레이션해 제품을 만듭니다. 경북소프트웨어마이스터고등학교에 재학 중이며, 명확한 스펙과 컨텍스트로 익숙하지 않은 언어·스택도 실제로 동작하는 제품으로 완성합니다. 만들고 싶은 게 생기면 일단 만들어보는 편이에요.',
  socials: {
    github: 'https://github.com/yakisoba0728',
    instagram: 'https://www.instagram.com/yakisoba0728/',
  },
  skills: [
    { category: 'Languages', items: ['Python', 'Node.js', 'Java'] },
    { category: 'AI / ML', items: ['PyTorch', 'Hugging Face', 'vLLM', 'Ollama'] },
    { category: 'Web', items: ['Next.js', 'React', 'Tailwind CSS'] },
    { category: 'Infra / Tools', items: ['Docker', 'AWS', 'Vercel', 'Git'] },
  ],
  experience: [],
  education: [
    { org: '경북소프트웨어마이스터고등학교', degree: '소프트웨어 개발', period: '재학 중' },
  ],
}
