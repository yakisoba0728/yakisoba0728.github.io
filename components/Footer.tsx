import { Mail } from 'lucide-react'
import T from '@/components/T'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/icons'
import { profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="band mt-24 border-t border-border">
      <div className="band-inner flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[17px] font-bold tracking-tight text-fg"><T ko={profile.name} en={profile.nameEn} /></p>
          <p className="mt-1 text-[13px] text-muted">© {new Date().getFullYear()} · <T ko={profile.tagline} en={profile.taglineEn} /></p>
        </div>
        <div className="flex gap-5">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-fg" aria-label="GitHub">
            <GithubIcon size={19} />
          </a>
          {profile.socials.instagram && (
            <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-fg" aria-label="Instagram">
              <InstagramIcon size={19} />
            </a>
          )}
          {profile.socials.email && (
            <a href={`mailto:${profile.socials.email}`} className="text-muted transition-colors hover:text-fg" aria-label="Email">
              <Mail size={19} />
            </a>
          )}
          {profile.socials.linkedin && (
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-fg" aria-label="LinkedIn">
              <LinkedinIcon size={19} />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
