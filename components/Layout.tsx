import { FC } from 'react'
import Head from 'next/head'
import { Header } from './Header'
import { Footer } from './Footer'

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
        {home && <title>{SITE_TITLE}</title>}
      </Head>
      <Header />
      <section className=" bg-gray-100">
        <div className="flex flex-1 flex-col min-h-screen max-w-5xl mx-auto px-2 py-8 w-full">
          <main>{children}</main>
        </div>
        <Footer />
      </section>
    </>
  )
}
