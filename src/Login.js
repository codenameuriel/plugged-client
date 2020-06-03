import React from 'react'
import Nav from './Nav'

export default function Login(props) {
  return (
    <div>
      <Nav links={props.links}/>
      <h1 id="login-h1">Log in</h1>
      <form>
        <section>
          <label>Username </label>
          <input type="text"/>
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
