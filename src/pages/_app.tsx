import 'tsx/styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from 'tsx/components/Navigation'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation/>
      <Component {...pageProps} />
    </>
  )
}
