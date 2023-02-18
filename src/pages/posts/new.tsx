import React from 'react';
import { useSession, signIn } from "next-auth/react";
import Form from 'tsx/components/Form';
import main from '../../styles/main.module.css'

const NewPost = () => {
  const { data: session } = useSession();

  return (
    <div className={main.main}>
      <h1 className={main.title}>Add your own Post</h1>
      {(session && session.user) ?
        <>
          <Form commentForm={false} />
        </>
        :
        <>
          <h2 className={main.subtitle}>You have to be signed in to add your own posts</h2>
          <button className={main.button} onClick={() => signIn()}>Sign in</button>    
        </>
      }
    </div>
  )
}

export default NewPost;
