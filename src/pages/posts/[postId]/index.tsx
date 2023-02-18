import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import CommentForm from 'tsx/components/CommentForm';
import { useSession, signIn } from "next-auth/react";

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

  console.log(data)
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>

      <h3>Add your own comment</h3>
      {(session && session.user) ?
        <>
          <CommentForm />
        </>
        :
        <>
          <h2>You have to be signed in to add your own comment</h2>
          <button onClick={() => signIn()}>Sign in</button>    
        </>
      }

      <div>
          <>
            {comments.map((comment: any) => {
              return (
                <div key={comment.id}>
                  {comment.content}
                </div>
              )
            })}
          </>

      </div>

      
    </div>
  )
}

export default Post;
