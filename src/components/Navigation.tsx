import React from 'react';
import Link from 'next/link'

const Navigation = () => {
  return (
    <div>
      <Link href={`/`}>Home</Link>
      <Link href={`/posts`}>Posts</Link>
    </div>
  )
}

export default Navigation;
