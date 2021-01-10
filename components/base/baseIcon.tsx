import { FC } from 'react'

interface Props {
  url: string
  iconPath: string
}
export const BaseIcon: FC<Props> = (props) => {
  const { url, iconPath } = props
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <img src={iconPath} alt="name" className="w-6 h-6 rounded-full mr-2 bg-gray-100" />
    </a>
  )
}
