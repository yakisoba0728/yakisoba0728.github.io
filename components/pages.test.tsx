import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import BlogPage from '@/app/blog/page'
import { generateStaticParams } from '@/app/blog/[slug]/page'
import Timeline from './home/Timeline'
import * as content from '@/lib/content'

vi.mock('@/content/profile', async (importOriginal) => {
  const { profile } = await importOriginal<typeof import('@/content/profile')>()
  return {
    profile: {
      ...profile,
      education: [{ org: '대구대학교 정보보호영재교육원', degree: '프로필의 과정명', period: '2025' }],
      educationEn: [{ org: 'Gifted Education Center for Information Security', degree: 'Profile course name', period: '2025' }],
    },
  }
})

afterEach(() => vi.restoreAllMocks())

it('학력 과정명을 연도로 덮어쓰지 않고 프로필 그대로 표시한다', () => {
  const html = renderToStaticMarkup(<Timeline />)
  expect(html).toContain('대구대학교 정보보호영재교육원 — 프로필의 과정명')
  expect(html).toContain('Gifted Education Center for Information Security — Profile course name')
})

describe('블로그 목록', () => {
  it('공개 글이 없으면 빈 상태를 표시한다', () => {
    vi.spyOn(content, 'getAllPosts').mockReturnValue([])
    const html = renderToStaticMarkup(<BlogPage />)
    expect(html).toContain('어… 비어있네요?')
    expect(html).not.toContain('/blog/example')
    expect(generateStaticParams()).toEqual([{ slug: '_empty' }])
    expect(content.getPost('_empty')).toBeNull()
  })

  it('공개 글이 있으면 기존 글 카드를 표시한다', () => {
    vi.spyOn(content, 'getAllPosts').mockReturnValue([
      content.parsePost('example', '---\ntitle: 공개 글\ndate: 2026-10-01\n---\n본문'),
    ])
    const html = renderToStaticMarkup(<BlogPage />)
    expect(html).toContain('href="/blog/example"')
    expect(html).toContain('공개 글')
    expect(html).not.toContain('어… 비어있네요?')
    expect(generateStaticParams()).toEqual([{ slug: 'example' }])
  })
})
