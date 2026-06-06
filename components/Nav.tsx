'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Mail, Menu, X } from 'lucide-react'
import { GithubIcon, InstagramIcon } from '@/components/icons'
import { profile } from '@/content/profile'
import T from '@/components/T'
import LangToggle from '@/components/LangToggle'

const links = [
  { href: '/', ko: '홈', en: 'Home' },
  { href: '/about', ko: '자기소개', en: 'About' },
  { href: '/portfolio', ko: '포트폴리오', en: 'Portfolio' },
  { href: '/blog', ko: '블로그', en: 'Blog' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/avatar.png" alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
          <span className="text-[15px] font-bold tracking-tight text-fg"><T ko={profile.name} en={profile.nameEn} /></span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-[14px] font-medium transition-colors hover:text-fg ${
                isActive(l.href) ? 'text-fg' : 'text-muted'
              }`}
            >
              <T ko={l.ko} en={l.en} />
            </Link>
          ))}
          <span className="mx-2 h-4 w-px bg-border" />
          <LangToggle />
          <span className="mx-1 h-4 w-px bg-border" />
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="px-1 text-muted transition-colors hover:text-fg" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          {profile.socials.instagram && (
            <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="px-1 text-muted transition-colors hover:text-fg" aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
          )}
          {profile.socials.email && (
            <a href={`mailto:${profile.socials.email}`} className="btn-grad ml-2 !h-9 !px-4 !py-0 text-[13px]">
              <T ko="연락하기" en="Get in touch" />
            </a>
          )}
        </div>

        <button className="text-muted md:hidden" onClick={() => setOpen(!open)} aria-label="메뉴 토글">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`py-2 text-sm ${isActive(l.href) ? 'text-fg' : 'text-muted'}`}
              >
                <T ko={l.ko} en={l.en} />
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-4">
              <LangToggle />
              <span className="h-4 w-px bg-border" />
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-muted hover:text-fg" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              {profile.socials.instagram && (
                <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="text-muted hover:text-fg" aria-label="Instagram">
                  <InstagramIcon size={18} />
                </a>
              )}
              {profile.socials.email && (
                <a href={`mailto:${profile.socials.email}`} className="text-muted hover:text-fg" aria-label="Email">
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
