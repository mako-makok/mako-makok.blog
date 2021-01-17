import { FC } from 'react'
import Head from 'next/head'
import { PostItemList } from '../../components/postItemList'
import { Layout, SITE_TITLE } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostsByTag, PostData, TagPath, getAllTags } from '../../lib/post'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Props {
  postsAboutTag: PostData[]
  tag: string
}

const Posts: FC<Props> = (props) => {
  const { postsAboutTag, tag } = props
  return (
    <Layout home={true}>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <section>
        <h2 className={utilStyles.headingLg}>{`Articles about ${tag}`}</h2>
        <PostItemList postDatas={postsAboutTag} />
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths<TagPath> = async () => {
  const paths = getAllTags()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const postsAboutTag = getSortedPostsByTag((params as any).tag)
  return {
    props: {
      postsAboutTag,
      tag: (params as any).tag,
    },
  }
}
export default Posts
