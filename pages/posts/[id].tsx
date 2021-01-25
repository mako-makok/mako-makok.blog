import { FC } from 'react'
import Head from 'next/head'
import { Date } from '../../components/Date'
import { Layout } from '../../components/Layout'
import { Tag } from '../../components/Tag'
import { GetStaticPaths, GetStaticProps } from 'next'
import posts from '../../generate/posts.json'
import { convertHtml } from '../../lib/markdown'
import { TagIcon } from '../../components/icon/TagIcon'

interface Props {
  postData: {
    contentHtml: string
    title: string
    date: string
    tags: string[]
  }
}

type Id = keyof typeof posts

const Posts: FC<Props> = (props) => {
  const { contentHtml, title, date, tags } = props.postData
  return (
    <Layout home={false}>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="text-gray-400">
        <Date date={date} />
      </div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex items-center mt-2 mb-6">
        <TagIcon />
        <ul className="inline">
          {tags?.map((tag) => (
            <>
              <li className="inline-block">
                <Tag tagName={tag} textSize="S" key={tag} />
              </li>
            </>
          ))}
        </ul>
      </div>
      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(posts).map((id) => `/posts/${id}`)
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async (props) => {
  // todo return not found page
  const id = (props.params as any).id as Id
  const { content, title, date, tags } = posts[id]
  const contentHtml = await convertHtml(content)
  return {
    props: {
      postData: {
        contentHtml,
        title,
        date,
        tags,
      },
    },
  }
}

export default Posts
