import { FC } from 'react'
import { PostItemList, PostSummary } from '../components/postItemList'
import { Layout } from '../components/layout'
import { GetStaticProps } from 'next'
import posts from '../generate/posts.json'

interface Props {
  allPostSummarys: PostSummary[]
}

const Home: FC<Props> = (props) => {
  const { allPostSummarys } = props
  return (
    <Layout home={true}>
      <section>
        <h2 className="text-2xl my-4">Articles</h2>
        <PostItemList postDatas={allPostSummarys} />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostSummarys = Object.entries(posts).map(([id, post]) => {
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
      allPostSummarys,
    },
  }
}

export default Home
