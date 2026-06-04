import { describe, it, expect } from 'vitest'
import { parsePost, parseProject, byDateDesc, byOrderAsc, selectPublished } from './content'

describe('parsePost', () => {
  it('프론트매터와 본문을 파싱한다', () => {
    const raw = `---\ntitle: Hello\ndate: 2026-01-01\nsummary: Hi\ntags: [a, b]\npublished: true\n---\nBody here`
    const post = parsePost('hello', raw)
    expect(post.slug).toBe('hello')
    expect(post.frontmatter.title).toBe('Hello')
    expect(post.frontmatter.tags).toEqual(['a', 'b'])
    expect(post.content.trim()).toBe('Body here')
  })

  it('published 기본값은 true, tags 기본값은 []', () => {
    const raw = `---\ntitle: NoPub\ndate: 2026-01-01\nsummary: s\n---\nx`
    const post = parsePost('nopub', raw)
    expect(post.frontmatter.published).toBe(true)
    expect(post.frontmatter.tags).toEqual([])
  })
})

describe('parseProject', () => {
  it('featured=false, order=0, published=true 기본값', () => {
    const raw = `---\ntitle: P\nperiod: 2024\nrole: dev\nstack: [Go]\n---\nbody`
    const proj = parseProject('p', raw)
    expect(proj.frontmatter.featured).toBe(false)
    expect(proj.frontmatter.order).toBe(0)
    expect(proj.frontmatter.published).toBe(true)
    expect(proj.frontmatter.stack).toEqual(['Go'])
  })
})

describe('comparators & filters', () => {
  it('byDateDesc는 최신 날짜를 앞으로 정렬', () => {
    const a = { frontmatter: { date: '2026-01-01' } } as never
    const b = { frontmatter: { date: '2026-02-01' } } as never
    expect([a, b].sort(byDateDesc)[0]).toBe(b)
  })

  it('byOrderAsc는 작은 order를 앞으로 정렬', () => {
    const a = { frontmatter: { order: 2 } } as never
    const b = { frontmatter: { order: 1 } } as never
    expect([a, b].sort(byOrderAsc)[0]).toBe(b)
  })

  it('selectPublished는 published=false를 제거', () => {
    const items = [
      { frontmatter: { published: true } },
      { frontmatter: { published: false } },
    ] as never[]
    expect(selectPublished(items)).toHaveLength(1)
  })
})
