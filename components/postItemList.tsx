import { FC } from 'react'
import Link from 'next/link'
import { Date } from './date'
import { Tag } from './tag'
import { PostData } from '../lib/post'
import utilStyles from '../styles/utils.module.css'

interface Props {
  postDatas: PostData[]
}
export const PostItemList: FC<Props> = (props) => {
  const { postDatas } = props
  return (
    <ul>
      {postDatas.map(({ id, date, title, tags }) => (
        <li className={utilStyles.listItem} key={id}>
          <small className={utilStyles.lightText}>
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
