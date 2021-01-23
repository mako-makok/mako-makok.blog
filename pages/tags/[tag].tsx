import { FC } from 'react'
import Head from 'next/head'
import { PostItemList, PostSummary } from '../../components/postItemList'
import { Layout, SITE_TITLE } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticPaths, GetStaticProps } from 'next'
import tagmap from '../../generate/tagmap.json'

interface Props {
  postSummary: PostSummary[]
  tag: string
}

type Tag = keyof typeof tagmap

const Posts: FC<Props> = (props) => {
  const { postSummary, tag } = props
  return (
    <Layout home={true}>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <section>
        <h2 className={utilStyles.headingLg}>{`Articles about ${tag}`}</h2>
        <PostItemList postDatas={postSummary} />
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(tagmap).map((tag) => `/tags/${tag}`)
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (props) => {
  const tag = (props.params as any).tag as Tag
  return {
    props: {
      postSummary: tagmap[tag],
      tag,
    },
  }
}
export default Posts
