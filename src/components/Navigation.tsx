import React from 'react';
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";
import navigation from './Navigation.module.css';
import { useRouter } from 'next/router';

const Navigation = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className={navigation.navbar}>
      <div className={navigation.links}>
        <Link className={currentRoute === '/' ? navigation.linkActive : navigation.link} data-cy='nav-home' href={`/`}>Home</Link>
        <Link className={currentRoute.startsWith('/posts') ? navigation.linkActive : navigation.link} data-cy='nav-posts' href={`/posts`}>Posts</Link>        
      </div>
      {!session ? (
        <button className={navigation.button} onClick={() => signIn()}>Sign in</button>
      ) : (
        <button className={navigation.button} onClick={() => signOut()}>Sign out</button>
      )}
    </div>
  )
}

export default Navigation;
