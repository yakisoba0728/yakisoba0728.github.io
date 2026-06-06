import { Mail } from 'lucide-react'
import Reveal from '@/components/Reveal'
import Magnetic from '@/components/Magnetic'
import T from '@/components/T'
import { GithubIcon, InstagramIcon } from '@/components/icons'
import { profile } from '@/content/profile'

export default function ContactCTA() {
  return (
    <section id="contact" className="py-14">
      <Reveal variant="scale">
        <div className="glass overflow-hidden p-12 text-center" style={{ background: 'linear-gradient(120deg, rgba(124,58,237,.12), rgba(34,211,238,.08))' }}>
          <h2 className="text-3xl font-bold tracking-tight"><T ko="함께 좋은 제품을 만들어요" en="Let's build great products together" /></h2>
          <p className="mt-3 text-muted"><T ko="새로운 기회와 협업에 열려 있습니다." en="Open to new opportunities and collaboration." /></p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {profile.socials.email && (
              <Magnetic>
                <a href={`mailto:${profile.socials.email}`} className="btn-grad"><Mail size={16} /> <T ko="이메일 보내기" en="Email me" /></a>
              </Magnetic>
            )}
            {profile.socials.instagram && (
              <Magnetic>
                <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="btn-glass"><InstagramIcon size={16} /> Instagram</a>
              </Magnetic>
            )}
            <Magnetic>
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="btn-glass"><GithubIcon size={16} /> GitHub</a>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
