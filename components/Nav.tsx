'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { GithubIcon, InstagramIcon } from '@/components/icons'
import { profile } from '@/content/profile'

const links = [
  { href: '/', label: '홈' },
  { href: '/about', label: '자기소개' },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/blog', label: '블로그' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className="sticky top-0 z-50 border-b border-border bg-bg/55 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-[17px] font-bold tracking-tight">
          <span className="h-[11px] w-[11px] rounded-[3px]" style={{ background: 'var(--grad)', boxShadow: '0 0 12px rgba(124,58,237,.7)' }} />
          {profile.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-fg ${
                isActive(l.href) ? 'text-fg' : 'text-muted'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <span className="mx-2 h-4 w-px bg-border" />
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="px-1 text-muted hover:text-accent-2" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          {profile.socials.instagram && (
            <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="px-1 text-muted hover:text-accent-2" aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
          )}
        </div>

        <button className="text-muted md:hidden" onClick={() => setOpen(!open)} aria-label="메뉴 토글">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-[1080px] flex-col gap-1 px-6 py-3">
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
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-muted hover:text-accent-2" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              {profile.socials.instagram && (
                <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="text-muted hover:text-accent-2" aria-label="Instagram">
                  <InstagramIcon size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
