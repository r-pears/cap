import { useRouter } from 'next/router';
import React, { useState } from 'react';

const CommentForm = () => {
  const [formError, setFormError] = useState(false);
  const router = useRouter();
  const { postId } = router.query;

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (event.target.title.value.length <= 0) {
      setFormError(true)
    } else if (event.target.content.value.length <= 0) {
      setFormError(true)
    } else {
      const data = {
        title: event.target.title.value,
        content: event.target.content.value,
        id: postId
      }

      const JSONdata = JSON.stringify(data)
      const endpoint = '/api/post/comment'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
      const response = await fetch(endpoint, options)
      const result = await response.json()
      router.reload();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" onChange={() => setFormError(false)} />

        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" onChange={() => setFormError(false)} />

        <button type="submit">Submit</button>
      </form>   
      {formError && 
      <div>Form missing data</div>
      }
    </>
  )
}

export default CommentForm;
