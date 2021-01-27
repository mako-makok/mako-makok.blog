import { FC } from 'react'
import { PostItemList, PostSummary } from '../components/PostItemList'
import { Layout } from '../components/Layout'
import { GetStaticProps } from 'next'
import posts from '../generate/posts.json'

interface Props {
  postSummarys: PostSummary[]
}

const Index: FC<Props> = (props) => {
  const { postSummarys } = props
  return (
    <Layout home>
      <PostItemList postSummarys={postSummarys} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postSummarys = Object.entries(posts).map(([id, post]) => {
    const { title, date, tags, excerpt } = post
    return {
      id,
      title,
      date,
      tags,
      excerpt,
    }
  })
  return {
    props: {
      postSummarys,
    },
  }
}

export default Index
