import { FC } from 'react'
import Link from 'next/link'
import { Date } from './date'
import { PostData } from '../lib/post'
import utilStyles from '../styles/utils.module.css'

interface Props {
  postDatas: PostData[]
}
export const PostItemList: FC<Props> = (props) => {
  const { postDatas } = props
  return (
    <ul className={utilStyles.list}>
      {postDatas.map(({ id, date, title }) => (
        <li className={utilStyles.listItem} key={id}>
          <Link href={`/posts/${id}`}>
            <a>{title}</a>
          </Link>
          <br />
          <small className={utilStyles.lightText}>
            <Date dateString={date} />
          </small>
        </li>
      ))}
    </ul>
  )
}
