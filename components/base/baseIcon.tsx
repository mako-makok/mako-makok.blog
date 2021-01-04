import { FC } from 'react'

interface Props {
  url: string
  iconPath: string
}
export const BaseIcon: FC<Props> = (props) => {
  const { url, iconPath } = props
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <img src={iconPath} alt="name" />
    </a>
  )
}
