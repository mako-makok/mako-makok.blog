import { FC } from 'react'
import Link from 'next/link'
import { Date } from './Date'
import { Tag } from './Tag'
import { TagIcon } from './icon/TagIcon'

interface Props {
  postSummarys: PostSummary[]
}

export type PostSummary = {
  id: string
  title: string
  date: string
  tags: string[]
  excerpt: string
}

export const PostSummarys: FC<Props> = (props) => {
  const { postSummarys } = props
  return (
    <ul>
      {postSummarys.map(({ id, date, title, tags, excerpt }) => (
        <li className="mx-0 mt-0 mb-5" key={id}>
          <div className="mt-6 p-5 bg-white rounded-lg transition-all shadow-md hover:shadow-xl">
            <div className="flex justify-between items-center">
              <span className="font-light text-md text-gray-600">
                <Date date={date} />
              </span>
              <span className="flex items-center">
                <TagIcon />
                <ul className="inline">
                  {tags.map((tag) => (
                    <li className="inline-block" key={tag}>
                      <Tag tagName={tag} textSize="S" />
                    </li>
                  ))}
                </ul>
              </span>
            </div>
            <div className="mt-2">
              <Link href={`/posts/${id}`}>
                <a className="text-xl text-gray-700 font-bold hover:underline">{title}</a>
              </Link>
              <p className="mt-2 text-gray-600 break-all">{excerpt}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Link href={`/posts/${id}`}>
                <a className="hover:underline">Read more</a>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
