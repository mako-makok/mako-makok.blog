import { FC } from 'react'
import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { ProfileIcon } from './icon/profile'

const NAME = 'mako_makok'
export const SITE_TITLE = 'mako-makok.dev'

export const Layout: FC<{ home: boolean }> = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="mako_makokのブログ" />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <ProfileIcon />
            <h1 className={utilStyles.heading2Xl}>{NAME}</h1>
          </>
        ) : (
          <>
            <ProfileIcon />
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{NAME}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
