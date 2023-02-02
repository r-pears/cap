import React from 'react'

interface ComponentProps {
  username?: string | null
}

const Form = (props: ComponentProps) => {

  const handleSubmit = async (event:any) => {
    event.preventDefault()

  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" required />

      <label htmlFor="desc">Description</label>
      <input type="text" id="desc" name="desc" required />

      <label htmlFor="img">Image</label>
      <input type="text" id="img" name="img" required />

      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" required />

      <button type="submit">Submit</button>
    </form>
  )
}

export default Form;
