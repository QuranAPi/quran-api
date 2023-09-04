import React from 'react'

const Form = () => {
  return (
    <form>
        <h1>Contact <span>Here</span></h1>
        <input type="text" name="name" id="" placeholder='Name'></input>
        <input type="email" name="email" id="" placeholder='example@email.com'></input>
        <textarea name="message" id="" cols={30} rows={10} placeholder='type here...'></textarea>
        <button type="submit">send</button>
    </form>
  )
}

export default Form