import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Form from 'tsx/components/Form';

const NewPost = () => {
  const { data: session } = useSession();

  return (
    <>
      <h1>Add your own Post</h1>
      {(session && session.user) ?
        <>
          <Form username={session.user.name} />
        </>
        :
        <>
          <h2>You have to be signed in to add your own posts</h2>
          <button onClick={() => signIn()}>Sign in</button>    
        </>
      }
    </>
  )
}

export default NewPost;
