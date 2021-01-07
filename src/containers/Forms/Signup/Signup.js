import React, { Component } from 'react';

class Signup extends Component {
  render() {
    return (
      <form onSubmit={null}>
        <label>Username: </label><br/>
        <input type="text" required/><br/>
        <label>Password: </label><br/>
        <input type="password"/><br/><br/>
        <label>Select news categories of interest:</label><br/>
        <input type="checkbox" id="1" name="Business" value="Business"/>
        <label>Business</label><br/>
        <input type="checkbox" id="2" name="Entertainment" value="Entertainment"/>
        <label>Entertainment</label><br/>
        <input type="checkbox" id="4" name="Health" value="Health"/>
        <label>Health</label><br/>
        <input type="checkbox" id="5" name="Science" value="Science"/>
        <label>Science</label><br/>
        <input type="checkbox" id="6" name="Sports" value="Sports"/>
        <label>Sports</label><br/>
        <input type="checkbox" id="7" name="Technology" value="Technology"/>
        <label>Technology</label><br/><br/>
        <input type="submit" value="Sign up"/>
      </form>
    );
  }
}

export default Signup;