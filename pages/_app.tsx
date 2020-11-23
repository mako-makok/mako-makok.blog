import { AppProps } from 'next/app'
import '../styles/tailwind.css'
import 'prismjs/themes/prism-tomorrow.css'

export const _app = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />
}

export default _app
