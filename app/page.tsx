import Hero from '@/components/home/Hero'
import Marquee from '@/components/Marquee'
import Counters from '@/components/Counters'
import Bento from '@/components/home/Bento'
import ContactCTA from '@/components/home/ContactCTA'
import T from '@/components/T'
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
      <section className="py-12 md:py-16">
        <Counters
          items={[
            { label: <T ko="다루는 기술 · 도구" en="Tools & tech" />, value: skillCount, suffix: '+' },
            { label: <T ko="AI 모델 · 도구" en="AI models & tools" />, value: aiCount },
            { label: <T ko="만든 프로젝트" en="Projects shipped" />, value: projectCount },
          ]}
        />
      </section>
      <Bento />
      <ContactCTA />
    </>
  )
}
