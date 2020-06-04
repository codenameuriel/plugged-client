import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Login from './Login'
import Signup from './Signup'

export default class Auth extends Component {
  state = {
    username: ''
  }

  logIn = (event, username) => {
    event.preventDefault()
    fetch(`http://localhost:4000/users/login/${username}`)
    .then(resp => resp.json())
    .then(this.props.setLoggedInUser)
  }

  signUp = (event, username) => {
    event.preventDefault()
    fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
    .then(resp => resp.json())
    .then(this.props.setLoggedInUser)
  }

  usernameChange = event => {
    this.setState({
      username: event.target.value
    })
  }

  render() {
    const [dashboard, login, signup] = this.props.links
    const { loggedInUser } = this.props

    return (
      <div>
        <Route 
          exact path="/login"
          render={routerProps => <Login 
            {...routerProps}
            links={[dashboard, signup]}
            loggedInUser={loggedInUser}
            username={this.state.username}
            logIn={this.logIn}
            usernameChange={this.usernameChange}
          />}
        />
        <Route
          exact path="/signup"
          render={routerProps => <Signup 
            {...routerProps}
            links={[dashboard, login]}
            loggedInUser={loggedInUser}
            username={this.state.username}
            signUp={this.signUp}
            usernameChange={this.usernameChange}
          />}
        />
      </div>
    )
  }
}
