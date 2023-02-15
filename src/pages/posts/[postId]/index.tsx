import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const Post = () => {
  const [data, setData] = useState({} as any)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { postId } = router.query

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
      setLoading(false)
      setData(result)
      console.log(result)
      console.log(result.comments.length)
    }
    getPost();
  }, [postId])

  if (isLoading) return <h2>Loading...</h2>
  if (!data) return <h2>Cannot find the post.</h2>

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>

      <div>
        {data.comments.length > 0 ?
          <>
            {data.comments.map((comment: any) => {
              return (
                <div key={comment.id}>
                  {comment}
                </div>
              )
            })}
          </>
          :
          <h4>No comments</h4>
        }
      </div>

      
    </div>
  )
}


export default Post;
