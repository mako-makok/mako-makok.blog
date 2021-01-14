import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Header } from './header'
import { Footer } from './footer'
import styles from '../styles/layout.module.css'

export const SITE_TITLE = 'mako-makok.dev'

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
      </Head>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow max-w-3xl mx-auto mb-16">
          <div className="mb-16">
            <Header home={home} />
          </div>
          <main>{children}</main>
          {!home && (
            <div className={styles.backToHome}>
              <Link href="/">
                <a>← back to home</a>
              </Link>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  )
}
