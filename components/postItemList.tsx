import { FC } from 'react'
import Link from 'next/link'
import { Date } from './date'
import { Tag } from './tag'
import utilStyles from '../styles/utils.module.css'

interface Props {
  postDatas: PostSummary[]
}

export type PostSummary = {
  id: string
  title: string
  date: string
  tags: string[]
}

export const PostItemList: FC<Props> = (props) => {
  const { postDatas } = props
  return (
    <ul>
      {postDatas.map(({ id, date, title, tags }) => (
        <li className={utilStyles.listItem} key={id}>
          <small className="text-gray-400">
            <Date dateString={date} />
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
