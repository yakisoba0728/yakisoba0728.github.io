import Hero from '@/components/home/Hero'
import Marquee from '@/components/Marquee'
import Counters from '@/components/Counters'
import Bento from '@/components/home/Bento'
import ContactCTA from '@/components/home/ContactCTA'
import Parallax from '@/components/Parallax'
import { profile } from '@/content/profile'
import { getAllProjects } from '@/lib/content'

export default function HomePage() {
  const skillCount = profile.skills.reduce((sum, g) => sum + g.items.length, 0)
  const aiCount = profile.skills.find((g) => g.category === 'AI / ML')?.items.length ?? 0
  const projectCount = getAllProjects().length
  return (
    <>
      <Hero />
      <Marquee />
      <Parallax speed={0.05} className="block py-8">
        <Counters
          items={[
            { label: '다루는 기술 · 도구', value: skillCount, suffix: '+' },
            { label: 'AI 모델 · 도구', value: aiCount },
            { label: '만든 프로젝트', value: projectCount },
          ]}
        />
      </Parallax>
      <Bento />
      <ContactCTA />
    </>
  )
}
