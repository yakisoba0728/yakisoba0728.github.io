import Hero from '@/components/home/Hero'
import Skills from '@/components/home/Skills'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import About from '@/components/home/About'
import ContactCTA from '@/components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Skills />
      <FeaturedProjects />
      <About />
      <ContactCTA />
    </>
  )
}
