import { useRouter } from 'next/router';
import React, { useState } from 'react';
import form from './Form.module.css';

interface ComponentProps {
  commentForm: boolean
}

const Form = (props: ComponentProps) => {
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
      const endpoint = props.commentForm ? '/api/post/comment' : '/api/post/new';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
      const response = await fetch(endpoint, options)
      const result = await response.json()
      props.commentForm ? router.reload() : router.push('/posts')
    }
  }

  return (
    <div>
      <form className={form.postform} onSubmit={handleSubmit}>
        <label className={form.label} htmlFor="title">Title</label>
        <input className={form.input} type="text" id="title" name="title" onChange={() => setFormError(false)} />

        <label className={form.label} htmlFor="content">Content</label>
        <textarea className={props.commentForm ? form.commentinput : form.forminput} id="content" name="content" onChange={() => setFormError(false)} />

        <div>
          <button className={form.button} type="submit">Submit</button>
        </div>
      </form>   
      {formError && 
        <div className={form.error}>Form missing data.</div>
      }
    </div>
  )
}

export default Form;
