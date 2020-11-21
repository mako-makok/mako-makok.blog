import React, { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostData, PostData } from '../lib/post'

type Props = {
  allPostData: PostData[]
}

const Home: FC<Props> = (props) => {
  const { allPostData } = props
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>hello, my name is Makoto!</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostData.map(({ id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

 /**
  * getStaticPropsはサーバサイドでのみ実行される. クライアント用のバンドルにも含まれない.
  * また、Pageからのみexport可能.
  */
export async function getStaticProps(): Promise<{props: Props}> {
  const allPostData = getSortedPostData()
  return {
    props: {
      allPostData
    }
  }
}

export default Home