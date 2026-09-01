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
export interface AwardItem {
  year: number
  title: string
  titleEn: string
  result: string
  resultEn: string
  detail?: string
  detailEn?: string
  evidence: string
  evidenceEn: string
  evidenceUrl?: string
}
export interface CredentialItem {
  title: string
  titleEn: string
  detail: string
  detailEn: string
  evidence: string
  evidenceEn: string
}
export interface PublicActivityItem {
  year: number
  title: string
  titleEn: string
  detail: string
  detailEn: string
  source?: string
  sourceEn?: string
  url?: string
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
  awards: AwardItem[]
  credentials: CredentialItem[]
  publicActivities: PublicActivityItem[]
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
    { title: '대구·경북 사이버공격 방어대회 청소년부 최우수상 · 1위', org: '한국가스공사 사장상', period: '2026' },
    { title: '제2회 청소년 국제학술 컨퍼런스 대상', org: '제주특별자치도지사상', period: '2026' },
    { title: '제11회 정보보호영재교육원 정보보안경진대회 개인전 최우수상', period: '2025' },
    { title: '딥페이크 피해학교 지도 직접 개발 · 언론보도', org: '경기신문', period: '2024' },
  ],
  activitiesEn: [
    { title: '1st Place — Daegu·Gyeongbuk Cyber Attack Defense Competition, Youth Division', org: 'KOGAS President Award', period: '2026' },
    { title: 'Grand Prize — 2nd Youth International Academic Conference', org: 'Jeju Governor Award', period: '2026' },
    { title: 'Top Excellence Award — 11th Information Security Competition, Individual', period: '2025' },
    { title: 'Built a deepfake victim-school map · featured in the press', org: 'KG News', period: '2024' },
  ],
  awards: [
    {
      year: 2026,
      title: '대구·경북 사이버공격 방어대회 청소년부',
      titleEn: 'Daegu·Gyeongbuk Cyber Attack Defense Competition — Youth Division',
      result: '최우수상 · 1위',
      resultEn: 'Top Excellence Award · 1st Place',
      detail: 'OxB4DC0DE · 한국가스공사 사장상',
      detailEn: 'OxB4DC0DE · KOGAS President Award',
      evidence: '실물 상장 + 판넬 + 공식 게시물',
      evidenceEn: 'Certificate + award panel + official post',
      evidenceUrl: 'https://apply.gbsw.hs.kr/seemore.php?depth=31&idx=75',
    },
    {
      year: 2026,
      title: '경북SW고 프로그래밍 챌린지',
      titleEn: 'Gyeongbuk SW High School Programming Challenge',
      result: '금상 · 2위',
      resultEn: 'Gold Award · 2nd Place',
      evidence: '실물 상장',
      evidenceEn: 'Physical certificate',
    },
    {
      year: 2026,
      title: '제2회 청소년 국제학술 컨퍼런스',
      titleEn: '2nd Youth International Academic Conference',
      result: '대상 · Grand Prize',
      resultEn: 'Grand Prize',
      detail: '「URL 기반 피싱 탐지 랜덤포레스트 머신러닝 모델의 시계열적 무력화 분석」 · 제주특별자치도지사상',
      detailEn: 'Temporal degradation analysis of a URL-based phishing detection Random Forest model · Jeju Governor Award',
      evidence: '실물 증서 + 기사',
      evidenceEn: 'Certificate + news coverage',
      evidenceUrl: 'https://v.daum.net/v/tNFGopsAe2',
    },
    {
      year: 2026,
      title: 'CCE CTF',
      titleEn: 'CCE CTF',
      result: '본선 진출',
      resultEn: 'Finalist',
      detail: 'OxB4DC0DE · 본선 예정',
      detailEn: 'OxB4DC0DE · finals upcoming',
      evidence: '본선 예정',
      evidenceEn: 'Finals scheduled',
    },
    {
      year: 2025,
      title: '제5회 해킹메일 공격 아이디어 경진대회 고등부',
      titleEn: '5th Hacking Mail Attack Idea Contest — High School Division',
      result: '장려상',
      resultEn: 'Encouragement Award',
      detail: 'CURIOUS',
      detailEn: 'CURIOUS',
      evidence: '실물 표창장 + 수상팀 이미지',
      evidenceEn: 'Certificate + award-team image',
    },
    {
      year: 2025,
      title: '제11회 정보보호영재교육원 정보보안경진대회 개인전',
      titleEn: '11th Gifted Education Center Information Security Competition — Individual',
      result: '최우수상',
      resultEn: 'Top Excellence Award',
      evidence: '실물 상장',
      evidenceEn: 'Physical certificate',
    },
    {
      year: 2025,
      title: '제11회 정보보호영재교육원 정보보안경진대회 단체전',
      titleEn: '11th Gifted Education Center Information Security Competition — Team',
      result: '장려상',
      resultEn: 'Encouragement Award',
      evidence: '실물 상장',
      evidenceEn: 'Physical certificate',
    },
    {
      year: 2025,
      title: '정보보호영재교육원 교육과정',
      titleEn: 'Gifted Education Center for Information Security Program',
      result: '교육과정 우수상',
      resultEn: 'Program Excellence Award',
      evidence: '실물 상장',
      evidenceEn: 'Physical certificate',
    },
    {
      year: 2025,
      title: '정보보호영재교육원 버그바운티 프로그램',
      titleEn: 'Gifted Education Center for Information Security Bug Bounty Program',
      result: '포상',
      resultEn: 'Recognition',
      evidence: '포상 이력',
      evidenceEn: 'Recognition record',
    },
    {
      year: 2025,
      title: '제5회 KOSPO 정보보안 경진대회',
      titleEn: '5th KOSPO Information Security Competition',
      result: '본선 진출',
      resultEn: 'Finalist',
      evidence: '본선 진출 이력',
      evidenceEn: 'Finalist record',
    },
    {
      year: 2025,
      title: '제1회 영남권 사이버 공격 방어대회',
      titleEn: '1st Yeongnam Cyber Attack Defense Competition',
      result: '본선 진출',
      resultEn: 'Finalist',
      evidence: '본선 진출 이력',
      evidenceEn: 'Finalist record',
    },
    {
      year: 2024,
      title: '사이버가디언즈 보안캠프 경북대 권역',
      titleEn: 'Cyber Guardians Security Camp — Kyungpook National University Region',
      result: '최우수상',
      resultEn: 'Top Excellence Award',
      detail: '한국정보기술연구원장상',
      detailEn: 'KITRI President Award',
      evidence: '최우수상 판넬 사진',
      evidenceEn: 'Award-panel photo',
    },
    {
      year: 2024,
      title: '제4회 해킹메일 공격 아이디어 경진대회 중등부',
      titleEn: '4th Hacking Mail Attack Idea Contest — Middle School Division',
      result: '최우수상',
      resultEn: 'Top Excellence Award',
      detail: 'Curious',
      detailEn: 'Curious',
      evidence: '실물 표창장 + 공식 발표',
      evidenceEn: 'Certificate + official announcement',
      evidenceUrl: 'https://star.daegu.ac.kr/article/table_01/detail/148542?category_cd=&pageIndex=4&searchCondition=&searchKeyword=',
    },
    {
      year: 2024,
      title: '제10회 정보보호영재교육원 정보보안경진대회 개인전',
      titleEn: '10th Gifted Education Center Information Security Competition — Individual',
      result: '4위 · 본선 진출',
      resultEn: '4th Place · Finalist',
      evidence: '대회 자료 + 공식 갤러리',
      evidenceEn: 'Competition materials + official gallery',
      evidenceUrl: 'https://star.daegu.ac.kr/article/table_12/detail/148543',
    },
  ],
  credentials: [
    {
      title: 'ITQ 정보기술자격',
      titleEn: 'ITQ Information Technology Qualification',
      detail: '아래한글 B · 한글파워포인트 A',
      detailEn: 'Hangul Word Processor B · Hangul PowerPoint A',
      evidence: '한국생산성본부 자격취득내역서',
      evidenceEn: 'Korea Productivity Center qualification record',
    },
    {
      title: 'DIAT 디지털정보활용능력',
      titleEn: 'DIAT Digital Information Ability Test',
      detail: '고급 · 2023.03.03 취득',
      detailEn: 'Advanced · acquired 2023-03-03',
      evidence: '국가공인 실물 자격증',
      evidenceEn: 'Nationally recognized physical certificate',
    },
    {
      title: '정보보호영재교육원 수료증',
      titleEn: 'Gifted Education Center for Information Security Completion Certificate',
      detail: '2025 교육과정 수료',
      detailEn: 'Completed the 2025 program',
      evidence: '실물 수료증',
      evidenceEn: 'Physical completion certificate',
    },
    {
      title: '경북SW마이스터고 입학성적 우수 장학증서',
      titleEn: 'Gyeongbuk SW Meister High School Admission Excellence Scholarship',
      detail: '2026학년도 입학성적 우수',
      detailEn: '2026 admission excellence',
      evidence: '실물 장학증서',
      evidenceEn: 'Physical scholarship certificate',
    },
  ],
  publicActivities: [
    {
      year: 2024,
      title: '딥페이크 피해학교 지도 직접 개발',
      titleEn: 'Built a deepfake victim-school map',
      detail: '딥페이크 피해 확산 상황을 한눈에 확인할 수 있는 지도를 직접 제작했고, 제작 사실과 취지가 언론에 보도되었습니다.',
      detailEn: 'Built a map to visualize the spread of deepfake-related school incidents; the project and its purpose were covered by the press.',
      source: '경기신문',
      sourceEn: 'KG News',
      url: 'https://www.kgnews.co.kr/news/article.html?no=810032',
    },
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
    { org: '경북소프트웨어마이스터고등학교', degree: '소프트웨어개발과 · 재학', period: '2026 — 현재' },
    { org: '대구대학교 정보보호영재교육원', degree: '심화과정', period: '2026 — 현재' },
    { org: '대구대학교 정보보호영재교육원', degree: '심화과정', period: '2025' },
    { org: '대구대학교 정보보호영재교육원', degree: '주니어과정', period: '2024' },
    { org: '대구대학교 정보보호영재교육원', degree: '기초과정', period: '2023' },
    { org: '산자연중학교', degree: '학생', period: '2023 — 2025' },
    { org: '정평초등학교', degree: '학생', period: '2017 — 2022' },
  ],
  educationEn: [
    { org: 'Gyeongbuk Software Meister High School', degree: 'Software Development · Student', period: '2026 — Present' },
    { org: 'Daegu University Gifted Education Center for Information Security', degree: 'Advanced Course', period: '2026 — Present' },
    { org: 'Daegu University Gifted Education Center for Information Security', degree: 'Advanced Course', period: '2025' },
    { org: 'Daegu University Gifted Education Center for Information Security', degree: 'Junior Course', period: '2024' },
    { org: 'Daegu University Gifted Education Center for Information Security', degree: 'Basic Course', period: '2023' },
    { org: 'Sanjayeon Middle School', degree: 'Student', period: '2023 — 2025' },
    { org: 'Jeongpyeong Elementary School', degree: 'Student', period: '2017 — 2022' },
  ],
}
