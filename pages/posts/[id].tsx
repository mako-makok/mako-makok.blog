import { FC, useEffect } from 'react'
import Head from 'next/head'
import { Date } from '../../components/date'
import { Layout } from '../../components/layout'
import { getAllPostIds, PostData, PostPath, getPostDataById } from '../../lib/post'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticPaths, GetStaticProps } from 'next'
import Prism from 'prismjs'

interface Props {
  postData: PostData
}

const Posts: FC<Props> = (props) => {
  const { postData } = props
  useEffect(() => {
    Prism.highlightAll
  }, [])
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className="my-6 text-3xl font-bold">{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
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
