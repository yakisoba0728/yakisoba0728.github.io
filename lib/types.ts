export interface PostFrontmatter {
  title: string
  date: string // YYYY-MM-DD
  summary: string
  tags: string[]
  published: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string // raw MDX body
}

export interface ProjectFrontmatter {
  title: string
  period: string
  role: string
  stack: string[]
  thumbnail?: string
  repo?: string
  demo?: string
  featured: boolean
  order: number
  published: boolean
}

export interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
  content: string
}
