import React from 'react';
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";
import navigation from './Navigation.module.css';

const Navigation = () => {
  const { data: session } = useSession();

  return (
    <div className={navigation.navbar}>
      <Link href={`/`}>Home</Link>
      <Link href={`/posts`}>Posts</Link>
      {!session ? (
        <button onClick={() => signIn()}>Sign in</button>
      ) : (
        <button onClick={() => signOut()}>Sign out</button>
      )}
    </div>
  )
}

export default Navigation;
