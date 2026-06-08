import HeroV2 from '@/components/home/HeroV2'
import MarqueeV2 from '@/components/MarqueeV2'
import Counters from '@/components/Counters'
import Bento from '@/components/home/Bento'
import ContactCTA from '@/components/home/ContactCTA'
import T from '@/components/T'
import { profile } from '@/content/profile'

export default function PreviewHomePage() {
  const skillCount = profile.skills.reduce((sum, g) => sum + g.items.length, 0)
  const aiCount = profile.skills.find((g) => g.category === 'AI / ML')?.items.length ?? 0
  return (
    <>
      <HeroV2 />
      <MarqueeV2 />
      <section className="py-12 md:py-16">
        <Counters
          items={[
            { label: <T ko="다루는 기술 · 도구" en="Tools & tech" />, value: skillCount, suffix: '+' },
            { label: <T ko="AI 모델 · 도구" en="AI models & tools" />, value: aiCount },
            { label: <T ko="만든 프로젝트" en="Projects shipped" />, value: 0 },
          ]}
        />
      </section>
      <Bento />
      <ContactCTA />
    </>
  )
}
