import React from 'react'

interface ComponentProps {
  username?: string | null
}

const Form = (props: ComponentProps) => {

  const handleSubmit = async (event:any) => {
    event.preventDefault()
    // Get data from the form.
    const data = {
      title: event.target.title.value,
      description: event.target.desc.value,
      image: event.target.img.value,
      content: event.target.content.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/form'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`Is this your full name: ${result.title}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" />

      <label htmlFor="desc">Description</label>
      <input type="text" id="desc" name="desc" />

      <label htmlFor="img">Image</label>
      <input type="text" id="img" name="img" />

      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" />

      <button type="submit">Submit</button>
    </form>
  )
}

export default Form;
