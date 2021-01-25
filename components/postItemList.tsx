import { FC } from 'react'
import Link from 'next/link'
import { Date } from './date'
import { Tag } from './tag'

interface Props {
  postSummarys: PostSummary[]
}

export type PostSummary = {
  id: string
  title: string
  date: string
  tags: string[]
}

export const PostItemList: FC<Props> = (props) => {
  const { postSummarys } = props
  return (
    <ul>
      {postSummarys.map(({ id, date, title, tags }) => (
        <li className="mx-0 mt-0 mb-5" key={id}>
          <small className="text-gray-400">
            <Date date={date} />
          </small>
          <br />
          <Link href={`/posts/${id}`}>
            <a>{title}</a>
          </Link>
          <div className="mt-1">
            {tags?.map((tag) => (
              <Tag tagName={tag} textSize="S" key={tag} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
