import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import NavigationWarmup from '@/components/NavigationWarmup'
import { profile } from '@/content/profile'
import { getAllPosts, getAllProjects } from '@/lib/content'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })
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
  const warmRoutes = [
    '/',
    '/about',
    '/portfolio',
    '/blog',
    ...getAllProjects().map((project) => `/portfolio/${project.slug}`),
    ...getAllPosts().map((post) => `/blog/${post.slug}`),
  ]

  return (
    <html lang="ko" className={`${inter.variable} ${jetbrains.variable} ${pretendard.variable}`} suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('lang')==='en')document.documentElement.setAttribute('data-lang','en')}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-bg text-body font-sans antialiased" suppressHydrationWarning>
        <NavigationWarmup routes={warmRoutes} />
        <ScrollProgress />
        <div className="pink-glow" aria-hidden />
        <div className="grain" aria-hidden />
        <Nav />
        <main className="relative mx-auto max-w-[1280px] px-6">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
