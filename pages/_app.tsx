import { Html, Head } from 'next/document'
import { AppProps } from 'next/app';
import { CrecoApp, Colors } from '@divops-packages/blog-creco-dev';

export default function App({ Component, pageProps }: AppProps) {
  pageProps.style = {
    ...pageProps.style,
    backgroundColor: Colors.Dark,
  }

  return (
    <Component {...pageProps} />
  )
}
