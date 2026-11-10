import { expect, test } from '@playwright/test'

test('모바일에서 선택한 언어가 데스크톱 토글과 새로고침에도 유지된다', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: '메뉴 토글' }).click()
  await page.getByRole('button', { name: 'Switch language — current KO' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Donghyeok Kim' })).toBeVisible()

  await page.setViewportSize({ width: 1440, height: 900 })
  const desktopToggle = page.getByRole('button', { name: 'Switch language — current EN' })
  await expect(desktopToggle).toBeVisible()
  await page.reload()
  await expect(desktopToggle).toBeVisible()
  await desktopToggle.click()
  await expect(page.getByRole('heading', { level: 1, name: '김동혁' })).toBeVisible()
})

test('모바일 메뉴로 페이지를 이동하면 메뉴가 닫힌다', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const header = page.getByRole('banner')
  await header.getByRole('button', { name: '메뉴 토글' }).click()
  await header.getByRole('link', { name: '자기소개', exact: true }).click()

  await expect(page).toHaveURL('/about')
  await expect(page.getByRole('heading', { level: 1, name: /안녕하세요/ })).toBeVisible()
  await expect(header.getByRole('link', { name: '자기소개', exact: true })).toBeHidden()
})

test('프로젝트 카드에서 상세를 열고 목록으로 돌아온다', async ({ page }) => {
  await page.goto('/portfolio')
  const card = page.getByRole('main').getByRole('link').filter({ has: page.getByRole('heading') }).first()
  const title = await card.getByRole('heading').innerText()
  await card.click()

  await expect(page).toHaveURL(/\/portfolio\/[^/]+\/?$/)
  await expect(page.getByRole('heading', { level: 1, name: title, exact: true })).toBeVisible()
  await page.getByRole('main').getByRole('link', { name: '← 포트폴리오', exact: true }).click()
  await expect(page).toHaveURL('/portfolio')
})

test('숨겨진 맨 위로 버튼은 포커스를 받지 않고 모션 감소 설정을 따른다', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const backToTop = page.getByLabel('맨 위로', { exact: true })
  await expect(backToTop).toBeHidden()
  await backToTop.evaluate((button) => button.focus())
  await expect(backToTop).not.toBeFocused()
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')

  await page.evaluate(() => window.scrollTo(0, 800))
  await expect(backToTop).toBeVisible()
  await backToTop.click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await expect(backToTop).toBeHidden()
})

test('홈은 세 화면 너비에서 가로 스크롤이 생기지 않는다', async ({ page }, testInfo) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: '김동혁' })).toBeVisible()
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), animations: 'disabled' })
  }
})

test('비공개 샘플 글은 직접 접근과 사이트맵에서 제외된다', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBe(true)
  const xml = await sitemap.text()
  for (const slug of ['hello-world', 'nextjs-app-router']) {
    expect((await request.get(`/blog/${slug}`)).status()).toBe(404)
    expect(xml).not.toContain(`/blog/${slug}`)
  }
})

test('정적 미리보기는 빌드 디렉터리 밖의 파일과 잘못된 요청을 거부한다', async ({ request }) => {
  expect((await request.get('/package.json')).status()).toBe(404)
  expect((await request.get('/%2F..%2Fpackage.json')).status()).toBe(404)
  expect((await request.get('/%')).status()).toBe(400)
  expect((await request.get('/%00')).status()).toBe(400)
  expect((await request.post('/')).status()).toBe(405)
})
