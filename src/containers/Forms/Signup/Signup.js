import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    categories: []
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

  generateCategoryCheckboxes() {
    const categories = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"];

    return categories.map((category, idx) => {
      return (
        <>
          <label for={`${category}`} key={idx}>
            <input 
              type="checkbox"
              id={`${idx + 1}`}
              name={`${category}`}
              value={`${category}`}
            />
            {category}
          </label>
          <br />
        </>
      );
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.formHandler}>
        <fieldset>
          <legend>Create a Username and Password</legend>
            <br />
            <label for="username">
              Username:
              <br />
              <input
                id="username"
                type="text" 
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={this.handleInputChange}
                required />
            </label>
            <br />
            <label for="password">
              Password:
              <br />
              <input 
                id="password"
                type="password" 
                name="password"
                placeholder="Enter password"
                value={password} 
                onChange={this.handleInputChange} 
                required />
            </label>
        </fieldset>
        <fieldset>
          <legend>Select news categories of interest</legend>
          {this.generateCategoryCheckboxes()}
        </fieldset>
        <input type="submit" value="Sign up" />
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