export function educationDegree(org: string, period: string, fallback: string, lang: 'ko' | 'en') {
  if (!org.includes('정보보호영재교육원') && !org.includes('Gifted Education Center for Information Security')) {
    return fallback
  }

  if (period.startsWith('2026')) return lang === 'ko' ? '심화과정' : 'Advanced Course'
  if (period.startsWith('2025')) return lang === 'ko' ? '고등과정' : 'High School Course'
  if (period.startsWith('2024')) return lang === 'ko' ? '중등과정' : 'Middle School Course'
  if (period.startsWith('2023')) return lang === 'ko' ? '기초과정' : 'Basic Course'
  return fallback
}
