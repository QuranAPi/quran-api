import React from 'react'
import { useState } from 'react'

const Form = () => {
  const [data, setData] = useState({name: "", email: "", message: ""})
  // const handleChange = (e) =>{
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setData({...data, [name]: value})
  // }

  // const handleSubmit = (e) =>{
    
  // }
  return (
    <form method='post' onSubmit={handleSubmit}>
        <h1>Contact <span>Here</span></h1>
        <input type="text" name="name" id="" onChange={handleChange} value={data.name} placeholder='Name'></input>
        <input type="email" name="email" id="" onChange={handleChange} value={data.email} placeholder='example@email.com'></input>
        <textarea name="message" id=""  onChange={handleChange} value={data.message} cols={30} rows={10} placeholder='type here...'></textarea>
        <button type="submit">send</button>
    </form>
  )
}

export default Form