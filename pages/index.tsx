import { FC } from 'react'
import { PostItemList, PostSummary } from '../components/postItemList'
import { Layout } from '../components/layout'
import { GetStaticProps } from 'next'
import posts from '../generate/posts.json'

interface Props {
  postSummarys: PostSummary[]
}

const Index: FC<Props> = (props) => {
  const { postSummarys } = props
  return (
    <Layout home>
      <section>
        <h2 className="text-2xl my-4">Articles</h2>
        <PostItemList postSummarys={postSummarys} />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postSummarys = Object.entries(posts).map(([id, post]) => {
    const { title, date, tags } = post
    return {
      id,
      title,
      date,
      tags,
    }
  })
  return {
    props: {
      postSummarys,
    },
  }
}

export default Index
