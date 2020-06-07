import React from 'react'
import Nav from './Nav'

export default function Signup({
  history, links, signUp, usernameChange, username, categories, checkBoxChange
}) { 
  return (
    <div>
      <Nav links={links}/>
      <h1>Sign up</h1>
      <form onSubmit={event => {
        signUp(event, username, categories)
        history.push('/top-news')
        }}>
        <label>Username: </label><br />
        <input 
          onChange={usernameChange} 
          type="text" 
          value={username}
        /><br />
        <label>Password: </label><br />
        <input type="text"/><br /><br />

        <label>News Categories:</label><br /><br />
        <input onChange={checkBoxChange} type="checkbox" id="1" name="Business" value="Business" />
        <label>Business</label><br />
        <input onChange={checkBoxChange} type="checkbox" id="2" name="Entertainment" value="Entertainment" />
        <label>Entertainment</label><br />
        <input onChange={checkBoxChange} type="checkbox" id="4" name="Health" value="Health" />
        <label>Health</label><br />
        <input onChange={checkBoxChange} type="checkbox" id="5" name="Science" value="Science" />
        <label>Science</label><br />
        <input onChange={checkBoxChange} type="checkbox" id="6" name="Sports" value="Sports" />
        <label>Sports</label><br />
        <input onChange={checkBoxChange} type="checkbox" id="7" name="Technology" value="Technology" />
        <label>Technology</label><br /><br />

        <input type="submit"/>
      </form>
    </div>
  )
}
