import { FC } from 'react'
import Head from 'next/head'
import { Date } from '../../components/date'
import { Layout } from '../../components/layout'
import { Tag } from '../../components/tag'
import { getAllPostIds, PostData, PostPath, getPostDataById } from '../../lib/post'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Props {
  postData: PostData
}

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
      <article className="prose" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths<PostPath> = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, PostPath> = async ({ params }) => {
  // todo return not found page
  const postData: PostData = await getPostDataById((params as PostPath).id as string)
  return {
    props: {
      postData,
    },
  }
}

export default Posts
