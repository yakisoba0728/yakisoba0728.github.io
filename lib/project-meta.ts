import type { ProjectStatus, ProjectVisibility } from './types'

export const visibilityLabel = (visibility: ProjectVisibility): { ko: string; en: string } => {
  switch (visibility) {
    case 'private':
      return { ko: '비공개', en: 'Private' }
    case 'mixed':
      return { ko: '공개 + 비공개', en: 'Public + Private' }
    default:
      return { ko: '공개', en: 'Public' }
  }
}

export const statusLabel = (status: ProjectStatus): { ko: string; en: string } => {
  switch (status) {
    case 'ongoing':
      return { ko: '진행 중', en: 'Ongoing' }
    case 'released':
      return { ko: '릴리스', en: 'Released' }
    case 'service':
      return { ko: '운영 중', en: 'Live Service' }
    case 'prototype':
      return { ko: '프로토타입', en: 'Prototype' }
    default:
      return { ko: '완료', en: 'Completed' }
  }
}
