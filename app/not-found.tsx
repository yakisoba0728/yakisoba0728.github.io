import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="section-label">{'// 404'}</p>
      <h1 className="mt-4 text-7xl font-extrabold tracking-tight"><span className="gradient-text">404</span></h1>
      <p className="mt-4 text-muted">페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="btn-grad mt-8">홈으로 →</Link>
    </div>
  )
}
