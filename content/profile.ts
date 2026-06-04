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
