import { afterEach, expect, it, vi } from 'vitest'
import { useEffect, useState } from 'react'
import LangToggle from './LangToggle'

vi.mock('react', async (importOriginal) => ({
  ...await importOriginal<typeof import('react')>(),
  useEffect: vi.fn(),
  useState: vi.fn(),
}))

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  vi.resetAllMocks()
})

it('두 토글의 언어를 동기화하고 구독을 해제한다', () => {
  vi.useFakeTimers()
  let language: string | null = null
  const desktopState = vi.fn()
  const mobileState = vi.fn()
  vi.mocked(useState)
    .mockReturnValueOnce(['ko', desktopState])
    .mockReturnValueOnce(['ko', mobileState])

  const events = new EventTarget()
  vi.stubGlobal('window', Object.assign(events, {
    matchMedia: () => ({ matches: true }),
  }))
  vi.stubGlobal('document', {
    documentElement: {
      getAttribute: () => language,
      setAttribute: (_name: string, value: string) => { language = value },
      removeAttribute: () => { language = null },
    },
  })
  vi.stubGlobal('localStorage', { setItem: vi.fn() })

  LangToggle()
  const mobile = LangToggle()
  const cleanups = vi.mocked(useEffect).mock.calls.map(([effect]) => effect())
  vi.runAllTimers()

  mobile.props.onClick()
  expect(language).toBe('en')
  expect(desktopState).toHaveBeenLastCalledWith('en')
  expect(mobileState).toHaveBeenLastCalledWith('en')

  vi.mocked(useState).mockReturnValueOnce(['en', desktopState])
  LangToggle().props.onClick()
  expect(language).toBeNull()
  expect(desktopState).toHaveBeenLastCalledWith('ko')
  expect(mobileState).toHaveBeenLastCalledWith('ko')

  desktopState.mockClear()
  mobileState.mockClear()
  events.dispatchEvent(new CustomEvent('langchange', { detail: 'invalid' }))
  expect(desktopState).not.toHaveBeenCalled()
  expect(mobileState).not.toHaveBeenCalled()

  cleanups.forEach((cleanup) => cleanup?.())
  events.dispatchEvent(new CustomEvent('langchange', { detail: 'en' }))
  expect(desktopState).not.toHaveBeenCalled()
  expect(mobileState).not.toHaveBeenCalled()
})
