import { FC } from 'react'
import Link from 'next/link'

export const Header: FC = () => {
  return (
    <header className="flex items-center justify-between p-2 border-b bg-gray-800">
      <Link href="/">
        <a className="text-gray-100  font-bold text-2xl no-underline">{'mako_makok.dev'}</a>
      </Link>
      <ul className="inline-flex items-center">
        <li className="px-2 md:px-4">
          <a href="/" className="text-gray-300 font-semibold hover:text-gray-200">
            {'Home'}
          </a>
        </li>
      </ul>
    </header>
  )
}
