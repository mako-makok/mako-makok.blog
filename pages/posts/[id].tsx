import React, { FC } from 'react'
import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData, PostData, Params } from '../../lib/post'
import utilStyles from '../../styles/utils.module.css'

type Props = {
  postData: PostData
}

export const Posts: FC<Props> = (props) => {
  const { postData } = props
  return (
    <Layout>
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

export async function getStaticPaths() {
  // id としてとりうる値のリストを返す
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: Params): Promise<{props: Props}> {
  // params.id を使用して、ブログの投稿に必要なデータを取得する
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default Posts