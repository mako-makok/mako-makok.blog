import { FC } from 'react'
import Head from 'next/head'
import { Date } from '../../components/date'
import { Layout } from '../../components/layout'
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
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
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
