import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import posts from '../../styles/posts.module.css'

const Posts = () => {
  const [data, setData] = useState(Array<any>)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
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
    <div className={posts.main}>
      <h1 className={posts.title}>All available posts</h1>
      <Link className={posts.links} href={`/posts/new`}><h2 className={posts.newpost}>Write new post</h2></Link>
      <div>
        {data.map((post: any, index: number) => {
          console.log(post)
          if (index === 0) {
            return (
              <div className={posts.posts} key={post.id}>
                <Link className={posts.links}
                  href={{
                    pathname: '/posts/' + post.id,
                  }}
                >
                  <h2 className={posts.firsttitle}>{post.title}</h2>
                  <h4 className={posts.firstauthor}>{post.author.name}</h4>
                </Link>
              </div>
            );
          } else {
            return (
              <div className={posts.posts} key={post.id}>
                <Link
                  className={posts.links}
                  href={{
                    pathname: '/posts/' + post.id,
                  }}
                >
                  <h2 className={posts.poststitle}>{post.title}</h2>
                  <h4 className={posts.postsauthor}>{post.author.name}</h4>
                </Link>
              </div>
            )
          }
        })}        
      </div>
    </div>
  )
}

export default Posts;
