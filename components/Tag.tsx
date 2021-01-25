import { FC } from 'react'
import Link from 'next/link'

interface Props {
  tagName: string
  textSize: 'S' | 'M'
}
export const Tag: FC<Props> = ({ tagName, textSize }) => {
  return (
    <Link href={`/tags/${tagName}`}>
      <a
        className={`bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 ${getClassNameByTextSize(
          textSize
        )}`}
      >
        {tagName}
      </a>
    </Link>
  )
}

const getClassNameByTextSize = (size: Props['textSize']) => {
  switch (size) {
    case 'S':
      return 'text-xs'
    case 'M':
      return 'text-sm'
    default:
      // eslint-disable-next-line
      const invalid: never = size
      throw Error('invalid size value')
  }
}
