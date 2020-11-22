import React, { FC } from 'react'
import Link from 'next/link'
import styles from '../layout.module.css'
import utilStyles from '../../styles/utils.module.css'

export const ProfileIcon: FC = () => {
  return (
    <Link href="/">
      <a>
        <img
          src="/images/profile.jpg"
          className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
          alt="name"
        />
      </a>
    </Link>
  )
}
