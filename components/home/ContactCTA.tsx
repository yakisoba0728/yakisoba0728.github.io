import Reveal from '@/components/Reveal'
import { GithubIcon, InstagramIcon } from '@/components/icons'
import { profile } from '@/content/profile'

export default function ContactCTA() {
  return (
    <section id="contact" className="py-14">
      <Reveal>
        <div className="glass overflow-hidden p-12 text-center" style={{ background: 'linear-gradient(120deg, rgba(124,58,237,.12), rgba(34,211,238,.08))' }}>
          <h2 className="text-3xl font-bold tracking-tight">함께 좋은 제품을 만들어요</h2>
          <p className="mt-3 text-muted">새로운 기회와 협업에 열려 있습니다.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {profile.socials.instagram && (
              <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="btn-grad"><InstagramIcon size={16} /> Instagram</a>
            )}
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="btn-glass"><GithubIcon size={16} /> GitHub</a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
