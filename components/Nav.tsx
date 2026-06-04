'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Mail, Menu, X } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { profile } from '@/content/profile'

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-mono font-bold text-accent">
          ~/{profile.name}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors hover:text-fg ${
                isActive(l.href) ? 'text-fg' : 'text-muted'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-border" />
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent-2"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.socials.email}`}
            className="text-muted hover:text-accent-2"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <button
          className="text-muted md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="메뉴 토글"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`py-2 text-sm ${isActive(l.href) ? 'text-fg' : 'text-muted'}`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-4">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-accent-2"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={`mailto:${profile.socials.email}`}
                className="text-muted hover:text-accent-2"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
