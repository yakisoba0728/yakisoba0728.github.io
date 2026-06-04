import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'

const prettyCodeOptions: PrettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: true,
}

const components = {
  a: (props: React.ComponentPropsWithoutRef<'a'>) => (
    <a className="text-accent-2 underline underline-offset-2 hover:text-accent" {...props} />
  ),
}

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-a:text-accent-2 prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-code:text-accent-2">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </div>
  )
}
