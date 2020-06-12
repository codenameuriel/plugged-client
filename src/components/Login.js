import React from 'react'
import Nav from './Nav'

import LoginStyles from '../styles/Login.module.css'

export default function Login({
  history, links, logIn, usernameChange, username
}) {
  return (
    <div>
      <header className={LoginStyles.header} >
        <h1>Log in to Plugged</h1>
      </header>
      <Nav links={links}/>
      <form className={LoginStyles.form} onSubmit={event => {
        logIn(event, username)
        history.push(`/${username}/dashboard`)
        }}>
  
          <label>Username:</label><br />
          <input 
            className={LoginStyles.input}
            onChange={usernameChange} 
            type="text"
            value={username}
          />
     
        <section>
          <label>Password:</label><br />
          <input className={LoginStyles.input} type="password"/><br />
          <br />
        </section>
        <input className={LoginStyles.submitBtn} type="submit"/>
      </form>
    </div>
  )
}
