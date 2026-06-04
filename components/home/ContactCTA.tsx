import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { profile } from '@/content/profile'

export default function ContactCTA() {
  return (
    <section id="contact" className="border-t border-border py-16">
      <p className="font-mono text-sm text-accent">$ ./contact.sh</p>
      <h2 className="mt-4 text-2xl font-bold">함께 일하거나 이야기 나누고 싶다면</h2>
      <p className="mt-2 text-muted">언제든 편하게 연락 주세요.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${profile.socials.email}`}
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:border-muted"
        >
          <Mail size={16} /> {profile.socials.email}
        </a>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:border-muted"
        >
          <GithubIcon size={16} /> GitHub
        </a>
        {profile.socials.linkedin && (
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:border-muted"
          >
            <LinkedinIcon size={16} /> LinkedIn
          </a>
        )}
      </div>
    </section>
  )
}
