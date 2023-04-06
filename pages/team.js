import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getFileBySlug, getFiles } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'TeamLayout'

export async function getStaticProps() {
  const slugs = await getFiles('authors')
  const files = slugs.map((slug) => formatSlug(slug))
  const authorDetails = await Promise.all(
    files.map(async (author) => {
      const details = await getFileBySlug('authors', [author])
      return details
    })
  )
  return { props: { authorDetails, files } }
}

export default function About({ authorDetails }) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Team
      </h1>
      {authorDetails.map((author) => {
        return (
          <MDXLayoutRenderer
            key={author.name}
            layout={author.frontMatter.layout || DEFAULT_LAYOUT}
            mdxSource={author.mdxSource}
            frontMatter={author.frontMatter}
          />
        )
      })}
    </div>
  )
}
