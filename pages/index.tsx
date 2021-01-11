import { FC } from 'react'
import Head from 'next/head'
import { PostItemList } from '../components/postItemList'
import { Layout, SITE_TITLE } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostData, PostData } from '../lib/post'
import { GetStaticProps } from 'next'

interface Props {
  allPostData: PostData[]
}

const Home: FC<Props> = (props) => {
  const { allPostData } = props
  return (
    <Layout home={true}>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <section>
        <h2 className={utilStyles.headingLg}>Articles</h2>
        <PostItemList postDatas={allPostData} />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostData = getSortedPostData()
  return {
    props: {
      allPostData,
    },
  }
}

export default Home
