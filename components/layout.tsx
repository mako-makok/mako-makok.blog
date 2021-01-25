import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Header } from './header'
import { Footer } from './footer'

const SITE_TITLE = 'mako-makok.dev'

interface Props {
  home: boolean
}
export const Layout: FC<Props> = ({ children, home }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="mako_makokのブログ" />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {home || <title>{SITE_TITLE}</title>}
      </Head>
      <div className="flex flex-1 flex-col min-h-screen max-w-5xl mx-auto px-2 w-full justify-start items-center">
        <div className="mb-16">
          <Header home={home} />
        </div>
        <main>{children}</main>
        {home || (
          <div className="mt-12 mb-12">
            <Link href="/">
              <a>← back to home</a>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
