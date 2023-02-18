import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Form from 'tsx/components/Form';
import { useSession, signIn } from "next-auth/react";
import post from '../../../styles/post.module.css'

const Post = () => {
  const [data, setData] = useState({} as any)
  const [isLoading, setLoading] = useState(false)
  const [comments, setComments] = useState(Array<any>)

  const router = useRouter()
  const { postId } = router.query
  const { data: session } = useSession();

  useEffect(() => {
    setLoading(true)
    async function getPost() {
      const data = {
        id: postId
      }

      const JSONdata = JSON.stringify(data)
      const endpoint = '/api/post/[postId]'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
      const response = await fetch(endpoint, options)
      const result = await response.json()      
      setData(result)
      setComments(result.comments)
      if (result.comments !== undefined) {
        setLoading(false)        
      }
    }
    getPost();
  }, [postId])

  if (isLoading) return <h2>Loading...</h2>
  if (!data) return <h2>Cannot find the post.</h2>

  return (
    <div className={post.main}>
      <h1 className={post.title}>{data.title}</h1>
      <p className={post.content}>{data.content}</p>

      <h3 className={post.addcomment}>Add your own comment</h3>
      {(session && session.user) ?
        <>
          <Form commentForm={true} />
        </>
        :
        <>
          <h2 className={post.signin}>You have to be signed in to add your own comment</h2>
          <button  className={post.button} onClick={() => signIn()}>Sign in</button>    
        </>
      }

      <div>
          <>
          {comments.map((comment: any) => {
              return (
                <div className={post.comment} key={comment.id}>
                  <h4>{comment.title}</h4>
                  <p></p>
                  <p>{comment.content}</p>
                </div>
              )
            })}
          </>

      </div>

      
    </div>
  )
}

export default Post;
