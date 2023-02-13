import React, { useState, useEffect } from 'react';
import Link from 'next/link'

const Posts = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/post')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        console.log(data)
      })
  }, [])

  if (isLoading) return <h2>Loading...</h2>
  if (!data) return <h2>No available posts.</h2>

  return (
    <>
      <h1>All available posts</h1>
      <Link href={`/posts/new`}><h2>Write new post</h2></Link>

    </>
  )
}

export default Posts;
