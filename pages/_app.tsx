import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {


  useEffect(() => {
      document.getElementById("__next")!.className = "next";
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
