import { FC } from 'react'
import Link from 'next/link'
import styles from '../../styles/layout.module.css'
import utilStyles from '../../styles/utils.module.css'

interface Props {
  url: string
  isOpenTabWhenClicked: boolean
  iconPath: string
}
export const BaseIcon: FC<Props> = (props) => {
  const { url, isOpenTabWhenClicked, iconPath } = props
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <img src={iconPath} alt="name" />
    </a>
  )
}
