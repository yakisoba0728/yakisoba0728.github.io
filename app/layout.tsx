import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { profile } from '@/content/profile'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: `${profile.name} — 포트폴리오`, template: `%s — ${profile.name}` },
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — 포트폴리오`,
    description: profile.tagline,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bg text-fg font-sans antialiased">
        <div className="glow-bg" aria-hidden />
        <Nav />
        <main className="relative z-[1] mx-auto max-w-[1080px] px-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
