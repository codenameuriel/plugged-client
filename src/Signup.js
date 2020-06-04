import React, { useState } from 'react'
import Nav from './Nav'

export default function Signup({history, links, setLoggedInUser}) { 
  const [form, setForm] = useState({
    username: ''
  })

  const signUp = (event, username) => {
    event.preventDefault()
    fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
    .then(resp => resp.json())
    .then(setLoggedInUser)
  }

  const usernameChange = event => {
    setForm({
      username: event.target.value
    })
  }

  return (
    <div>
      <Nav links={links}/>
      <h1>Sign up</h1>
      <form onSubmit={event => {
        signUp(event, form.username)
        history.push('/dashboard')
        }}>
        <section>
          <label>Username </label>
          <input onChange={usernameChange} type="text" value={form.username}/>
        </section>
        <section>
          <label>Password </label>
          <input type="text"/>
        </section>
        <input type="submit"/>
      </form>
    </div>
  )
}
