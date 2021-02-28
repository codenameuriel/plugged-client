/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../../store/actions/index'

import LoginStyles from './Login.module.css';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  clearInputs = () => {
    this.setState({ username: '', password: '' })
  }

  formHandler = event => {
    event.preventDefault()
    const { onLogin } = this.props
    const { username, password } = this.state
    const userData = { username, password }
    onLogin(userData)
    this.clearInputs()
  }

  render() {
    const { username, password } = this.state
    return (
      <form className={LoginStyles.Form} onSubmit={this.formHandler}>
        <div className={LoginStyles.UsernameContainer}>
          <label>Username:</label>
          <br />
          <input
            className={LoginStyles.Username}
            type='text'
            name='username'
            value={username}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <br />
        <div className={LoginStyles.PasswordContainer}>
          <label>Password:</label>
          <br />
          <input
            className={LoginStyles.Password}
            type='password'
            name='password'
            value={password}
            onChange={this.handleInputChange}
          />
        </div>
        <br />

        <input className={LoginStyles.Submit} type='submit' value='Log in' />
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: userData => dispatch(actionCreators.login(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
