import { FC } from 'react'
import Link from 'next/link'

interface Props {
  url: string
  iconPath: string
}
export const BaseIcon: FC<Props> = (props) => {
  const { url, iconPath } = props
  return (
    <Link href={url}>
      <a target="_blank" rel="noreferrer">
        <img src={iconPath} alt="name" className="w-6 h-6 rounded-full mr-2" />
      </a>
    </Link>
  )
}
