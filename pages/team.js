import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'TeamLayout'

export async function getStaticProps() {
  const authors = ['joshuayullu', 'dyllonmulindi']
  const authorDetails = await Promise.all(
    authors.map(async (author) => {
      const details = await getFileBySlug('authors', [author])
      return details
    })
  )
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  console.log(authorDetails)

  return (
    <div>
      <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Team
      </h1>
      {authorDetails.map((author) => {
        return (
          <MDXLayoutRenderer
            key={author.frontMatter.name}
            layout={author.frontMatter.layout || DEFAULT_LAYOUT}
            mdxSource={author.mdxSource}
            frontMatter={author.frontMatter}
          />
        )
      })}
    </div>
  )
}
