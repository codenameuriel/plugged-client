import React from 'react'
import Nav from './Nav'

import SignupStyles from '../styles/Signup.module.css'

const Signup = ({
  history, links, signUp, usernameChange, username, categories, checkBoxChange
}) => { 

  return (
    <div>
      <header className={SignupStyles.header} >
        <h1>Sign up for Plugged</h1>
      </header>
      <Nav links={links}/>
      <form className={SignupStyles.form} onSubmit={event => {
        signUp(event, username, categories)
        history.push(`/${username}/dashboard`)
        }}>
        <label>Username: </label><br />
        <input 
          className={SignupStyles.input}
          onChange={usernameChange} 
          type="text" 
          value={username}
          required
        /><br />
        <label>Password: </label><br />
        <input
         className={SignupStyles.input}
          type="password" /><br /><br />

        <label>Select news categories of interest:</label><br /><br />
        <input className={SignupStyles.checkbox} onChange={checkBoxChange} type="checkbox" id="1" name="Business" value="Business" />
        <label className={SignupStyles.business} >Business</label><br />
        <input className={SignupStyles.checkbox} onChange={checkBoxChange} type="checkbox" id="2" name="Entertainment" value="Entertainment" />
        <label className={SignupStyles.entertainment} >Entertainment</label><br />
        <input className={SignupStyles.checkbox} onChange={checkBoxChange} type="checkbox" id="4" name="Health" value="Health" />
        <label className={SignupStyles.health} >Health</label><br />
        <input className={SignupStyles.checkbox} onChange={checkBoxChange} type="checkbox" id="5" name="Science" value="Science" />
        <label className={SignupStyles.science}>Science</label><br />
        <input className={SignupStyles.checkbox} onChange={checkBoxChange} type="checkbox" id="6" name="Sports" value="Sports" />
        <label className={SignupStyles.sports}>Sports</label><br />
        <input className={SignupStyles.checkbox} onChange={checkBoxChange} type="checkbox" id="7" name="Technology" value="Technology" />
        <label className={SignupStyles.technology} >Technology</label><br /><br />

        <input className={SignupStyles.submitBtn} type="submit" value="Sign up" />
      </form>
    </div>
  )
}

export default Signup
