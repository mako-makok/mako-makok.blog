import { FC } from 'react'
import Link from 'next/link'
import { ProfileIcon } from './icon/profile'
import utilStyles from '../styles/utils.module.css'

const NAME = 'mako_makok'

interface Props {
  home: boolean
}
export const Header: FC<Props> = ({ home }) => {
  const className = 'self-end text-3xl font-semibold'
  return (
    <header>
      <div className="flex">
        <ProfileIcon />
        {home ? (
          <h1 className={className}>{NAME}</h1>
        ) : (
          <>
            <h2 className={className}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{NAME}</a>
              </Link>
            </h2>
          </>
        )}
      </div>
    </header>
  )
}
