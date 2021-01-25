import { FC } from 'react'
import { PostItemList, PostSummary } from '../../components/postItemList'
import { Layout } from '../../components/layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import tagmap from '../../generate/tagmap.json'

interface Props {
  postSummarys: PostSummary[]
  tag: string
}

type Tag = keyof typeof tagmap

const Posts: FC<Props> = (props) => {
  const { postSummarys, tag } = props
  return (
    <Layout home>
      <section>
        <h2 className="text-2xl my-4">{`Articles about ${tag}`}</h2>
        <PostItemList postSummarys={postSummarys} />
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

export const getStaticProps: GetStaticProps<Props> = async (props) => {
  const tag = (props.params as any).tag as Tag
  return {
    props: {
      postSummarys: tagmap[tag],
      tag,
    },
  }
}
export default Posts
