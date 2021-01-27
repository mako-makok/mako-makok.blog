import { FC } from 'react'
import { PostSummarys, PostSummary } from '../../components/PostSummarys'
import { Layout } from '../../components/Layout'
import { Tag } from '../../components/Tag'
import { TagIcon } from '../../components/icon/TagIcon'
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
      <>
        <span className="flex items-center">
          <TagIcon />
          <Tag tagName={tag} textSize="S" />
        </span>

        <PostSummarys postSummarys={postSummarys} />
      </>
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
