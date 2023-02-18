import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'

const Posts = () => {
  const [data, setData] = useState(Array<any>)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/post')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
  if (isLoading) return <h2>Loading...</h2>
  if (!data) return <h2>No available posts.</h2>

  return (
    <>
      <h1>All available posts</h1>
      <Link href={`/posts/new`}><h2>Write new post</h2></Link>
      <div>
        {data.map((post: any, index: number) => {
          if (index === 0) {
            return (
              <div key={post.id}>
                <Link
                  href={{
                    pathname: '/posts/' + post.id,
                  }}
                >
                  <h2>{post.title}</h2>
                    {post.image !== undefined &&
                      <> {post.image.includes('http') &&
                        <Image
                          src={post.image}
                          alt="post image"
                          width={450}
                          height={400}
                        />          
                      }
                      </>
                    }
                  <h4>{post.author.name}</h4>
                </Link>
              </div>
            );
          } else {
            return (
              <div key={post.id}>
                <Link
                  href={{
                    pathname: '/posts/' + post.id,
                  }}
                >
                  <h2>{post.title}</h2>
                  <h4>{post.author.name}</h4>
                </Link>
              </div>
            )
          }
        })}        
      </div>
    </>
  )
}

export default Posts;
