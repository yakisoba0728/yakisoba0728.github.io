import Hero from '@/components/home/Hero'
import Skills from '@/components/home/Skills'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import About from '@/components/home/About'
import ContactCTA from '@/components/home/ContactCTA'
import Marquee from '@/components/Marquee'
import Counters from '@/components/Counters'
import Reveal from '@/components/Reveal'
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
      <Skills />
      <section className="py-10">
        <Reveal variant="scale">
          <Counters
            items={[
              { label: '다루는 기술 · 도구', value: skillCount, suffix: '+' },
              { label: 'AI 모델 · 도구', value: aiCount },
              { label: '만든 프로젝트', value: projectCount },
            ]}
          />
        </Reveal>
      </section>
      <FeaturedProjects />
      <About />
      <ContactCTA />
    </>
  )
}
