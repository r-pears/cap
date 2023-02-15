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
    }
    getPost();
  }, [])

  if (isLoading) return <h2>Loading...</h2>
  if (!data) return <h2>No available posts.</h2>

  return (
    <div>
    </div>
  )
}


export default Post;
