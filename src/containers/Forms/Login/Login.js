import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

class Login extends Component {
  state = {
    username: ""
  }

  usernameChange = event => {
    this.setState({ username: event.target.value });
  }

  render() {
    const { username } = this.state;
    const { onLogin } = this.props;
    const formHandler = event => {
      event.preventDefault();
      onLogin(username);
    };

    return (
      <form onSubmit={formHandler}>
        <label>Username:</label><br/>
        <input type="text" value={username} onChange={this.usernameChange}/><br/>
        <label>Password:</label><br/>
        <input type="password"/><br/>
        <input type="submit" value="Log in"/>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: username => dispatch(actionCreators.login(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);