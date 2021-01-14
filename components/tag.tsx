import { FC } from 'react'

interface Props {
  tagName: string
}
export const Tag: FC<Props> = ({ tagName }) => {
  return (
    <a className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
      {tagName}
    </a>
  )
}
