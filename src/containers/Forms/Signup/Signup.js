import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

class Signup extends Component {
  state = {
    username: "",
    password: ""
  }

  handleInputChange = ({ target: { value, name }}) => {
    this.setState({ [name]: value });
  }

  formHandler = event => {
    event.preventDefault();
    const { onSignup } = this.props;
    const { username, password } = this.state;
    const newUserData = { username, password };
    onSignup(newUserData);
  };

  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.formHandler}>
        <label>Username: </label><br/>
        <input 
          type="text" 
          name="username"
          value={username}
          onChange={this.handleInputChange} 
          required />
        <br/>

        <label>Password: </label><br/>
        <input 
          type="password" 
          name="password"
          value={password} 
          onChange={this.handleInputChange} 
          required />
        <br/><br/>

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

const mapDispatchToProps = dispatch => {
  return {
    onSignup: newUserData => dispatch(actionCreators.signup(newUserData))
  };
};

export default connect(null, mapDispatchToProps)(Signup);