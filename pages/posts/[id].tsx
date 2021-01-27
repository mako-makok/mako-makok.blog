import { FC } from 'react'
import Head from 'next/head'
import { Date } from '../../components/Date'
import { Layout } from '../../components/Layout'
import { Tag } from '../../components/Tag'
import { GetStaticPaths, GetStaticProps } from 'next'
import posts from '../../generate/posts.json'
import { convertHtml } from '../../lib/markdown'
import { TagIcon } from '../../components/icon/TagIcon'
import { TwitterIcon, TwitterShareButton, HatenaIcon, HatenaShareButton } from 'react-share'

interface Props {
  postData: {
    id: string
    contentHtml: string
    title: string
    date: string
    tags: string[]
  }
}

type Id = keyof typeof posts

const Posts: FC<Props> = (props) => {
  const { id, contentHtml, title, date, tags } = props.postData
  const url = `https://makomakok.dev/posts/${id}`
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
              <li className="inline-block" key={tag}>
                <Tag tagName={tag} textSize="S" />
              </li>
            </>
          ))}
        </ul>
      </div>
      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <div className="my-12">
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <span className="mx-4">
          <HatenaShareButton url={url} title={title}>
            <HatenaIcon size={32} round />
          </HatenaShareButton>
        </span>
      </div>
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
        id,
        contentHtml,
        title,
        date,
        tags,
      },
    },
  }
}

export default Posts
