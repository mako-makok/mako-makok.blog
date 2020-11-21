import React from "react";
import { AppProps } from "next/app";
import '../styles/global.css'

export default ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}