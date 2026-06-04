import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm text-accent">$ cat /page</p>
      <h1 className="mt-4 text-5xl font-bold">404</h1>
      <p className="mt-3 text-muted">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg hover:opacity-90"
      >
        홈으로 →
      </Link>
    </div>
  )
}
