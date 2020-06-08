import React from 'react'
import Nav from './Nav'

export default function Login({
  history, links, logIn, usernameChange, username
}) {
  return (
    <div>
      <h1>Log in</h1>
      <Nav links={links}/>
      <form onSubmit={event => {
        logIn(event, username)
        history.push(`/${username}/dashboard`)
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
          <input type="password"/>
        </section>
        <input type="submit"/>
      </form>
    </div>
  )
}
