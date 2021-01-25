import { FC } from 'react'
import Link from 'next/link'

export const ProfileIcon: FC = () => {
  return (
    <Link href="/">
      <a>
        <img src="/images/profile.jpg" className="w-24 h-24 rounded-full mr-2" alt="name" />
      </a>
    </Link>
  )
}
