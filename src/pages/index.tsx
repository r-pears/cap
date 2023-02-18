import Head from 'next/head'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import main from '../styles/main.module.css';


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
      <div className={main.main}>
        <h1 className={main.title}>Welcome to...</h1>
        <h2 className={main.subtitle}>Guides, tips, and posts written by locals. The best way to learn about hidden gems in the area.</h2>
        <div>
          <Link className={main.links} href={`/posts`}><h3 className={main.link}>Explore posts</h3></Link>
          <Link className={main.links} href={`/posts/new`}><h3 className={main.link}>Add your own post</h3></Link>
        </div>
      </div>
    </>
  )
}