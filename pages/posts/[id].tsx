import { FC } from 'react'
import Head from 'next/head'
import { Date } from '../../components/date'
import { Layout } from '../../components/layout'
import { Tag } from '../../components/tag'
import { GetStaticPaths, GetStaticProps } from 'next'
import posts from '../../generate/posts.json'
import { convertHtml } from '../../lib/markdown'

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
  const { postData } = props
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className="text-gray-400">
        <Date dateString={postData.date} />
      </div>
      <h1 className="text-3xl font-bold">{postData.title}</h1>
      <div className="mt-2 mb-6">
        {postData.tags?.map((tag) => (
          <Tag tagName={tag} textSize="M" key={tag} />
        ))}
      </div>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
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
