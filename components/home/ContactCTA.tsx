import { Mail } from 'lucide-react'
import Reveal from '@/components/Reveal'
import T from '@/components/T'
import { GithubIcon, InstagramIcon } from '@/components/icons'
import { profile } from '@/content/profile'

export default function ContactCTA() {
  return (
    <section id="contact" className="py-12 md:py-16">
      <Reveal variant="scale">
        <div className="cta-band text-center">
          <h2 className="t-display-md" style={{ color: '#ffffff' }}>
            <T ko="함께 좋은 제품을 만들어요" en="Let's build great products" />
          </h2>
          <p className="mt-3 text-[16px] font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
            <T ko="새로운 기회와 협업에 열려 있습니다." en="Open to new opportunities and collaboration." />
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {profile.socials.email && (
              <a href={`mailto:${profile.socials.email}`} className="btn-grad"><Mail size={16} /> <T ko="이메일 보내기" en="Email me" /></a>
            )}
            {profile.socials.instagram && (
              <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-semibold" style={{ color: '#ffffff' }}>
                <InstagramIcon size={16} /> Instagram
              </a>
            )}
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-semibold" style={{ color: '#ffffff' }}>
              <GithubIcon size={16} /> GitHub
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
