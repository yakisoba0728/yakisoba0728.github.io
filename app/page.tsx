import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Skills from '@/components/home/Skills'
import Timeline from '@/components/home/Timeline'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import ContactCTA from '@/components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <FeaturedProjects />
      <ContactCTA />
    </>
  )
}
