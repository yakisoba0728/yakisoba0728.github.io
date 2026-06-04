import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { profile } from '@/content/profile'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-10 text-center">
        <div className="flex gap-5">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent-2"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={`mailto:${profile.socials.email}`}
            className="text-muted hover:text-accent-2"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-accent-2"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
          )}
        </div>
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  )
}
