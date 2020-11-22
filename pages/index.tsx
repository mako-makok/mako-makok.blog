import React, { FC } from 'react'
import Head from 'next/head'
import { PostItemList } from '../components/PostItemList'
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
      <section className={utilStyles.headingMd}>
        <p>mako_makokの技術的に関するアウトプットなど</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
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
