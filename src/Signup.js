import React from 'react'
import Nav from './Nav'

export default function Signup({
  history, links, signUp, usernameChange, username
}) { 
  return (
    <div>
      <Nav links={links}/>
      <h1>Sign up</h1>
      <form onSubmit={event => {
        signUp(event, username)
        history.push('/top=news')
        }}>
        <section>
          <label>Username: </label>
          <input 
            onChange={usernameChange} 
            type="text" 
            value={username}
          />
        </section>
        <section>
          <label>Password: </label>
          <input type="text"/>
        </section>
        <input type="submit"/>
      </form>
    </div>
  )
}
