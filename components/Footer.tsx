import { Mail } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/icons'
import { profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="relative z-[1] mt-32 border-t border-border">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-4 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-display text-sm text-muted-2">© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex gap-5">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-muted hover:text-accent-2" aria-label="GitHub">
            <GithubIcon size={20} />
          </a>
          {profile.socials.instagram && (
            <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="text-muted hover:text-accent-2" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
          )}
          {profile.socials.email && (
            <a href={`mailto:${profile.socials.email}`} className="text-muted hover:text-accent-2" aria-label="Email">
              <Mail size={20} />
            </a>
          )}
          {profile.socials.linkedin && (
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-accent-2" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
