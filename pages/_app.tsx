import { AppProps } from 'next/app'
import '../styles/global.css'

export const _app = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />
}

export default _app
