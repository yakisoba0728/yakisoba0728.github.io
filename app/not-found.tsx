import Link from 'next/link'
import T from '@/components/T'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="section-label">{'// 404'}</p>
      <h1 className="mt-4 text-7xl font-extrabold tracking-tight"><span className="gradient-text">404</span></h1>
      <p className="mt-4 text-muted"><T ko="페이지를 찾을 수 없습니다." en="Page not found." /></p>
      <Link href="/" className="btn-grad mt-8"><T ko="홈으로 →" en="Back home →" /></Link>
    </div>
  )
}
