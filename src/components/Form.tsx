import axios from 'axios'
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface ComponentProps {
  username?: string | null
}

const Form = (props: ComponentProps) => {
  const [formError, setFormError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (event.target.title.value.length <= 0) {
      setFormError(true)
    } else if (event.target.desc.value.length <= 0) {
      setFormError(true)
    } else if (event.target.img.value.length <= 0) {
      setFormError(true)
    } else if (event.target.content.value.length <= 0) {
      setFormError(true)
    } else {
      const data = {
        title: event.target.title.value,
        author: props.username,
        description: event.target.desc.value,
        image: event.target.img.value,
        content: event.target.content.value,
      }

      const JSONdata = JSON.stringify(data)
      const endpoint = '/api/post/new'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
      const response = await fetch(endpoint, options)
      const result = await response.json()
      router.push('/posts')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" onChange={() => setFormError(false)} />

        <label htmlFor="desc">Description</label>
        <input type="text" id="desc" name="desc" onChange={() => setFormError(false)} />

        <label htmlFor="img">Image</label>
        <input type="text" id="img" name="img" onChange={() => setFormError(false)} />

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

export default Form;
