import { FC } from 'react'
import Link from 'next/link'
import { Date } from './date'
import { Tag } from './tag'
import { TagIcon } from '../components/icon/tagIcon'

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
            <a className="hover:underline">{title}</a>
          </Link>
          <span className="flex items-center">
            <TagIcon />
            <ul className="inline">
              {tags?.map((tag) => (
                <>
                  <li className="inline-block">
                    <Tag tagName={tag} textSize="S" key={tag} />
                  </li>
                </>
              ))}
            </ul>
          </span>
        </li>
      ))}
    </ul>
  )
}
