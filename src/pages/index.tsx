import Head from 'next/head'
import { Inter } from '@next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to</title>
        <meta name="description" content="The best way to find hidden gems is by locals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div>
        <h1>Welcome to...</h1>
        <h2>Guides, tips, and posts written by locals. The best way to learn about hidden gems in the area.</h2>
        <div>
          <Link href={`/posts`}><h3>Explore posts</h3></Link>
          <Link href={`/posts/new`}><h3>Add your own post</h3></Link>
          <Link href={`/user`}><h3>Login</h3></Link>
        </div>
      </div>
    </>
  )
}
