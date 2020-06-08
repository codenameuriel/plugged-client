import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Login from './Login'
import Signup from './Signup'
import Account from './Account'

class Auth extends Component {
  state = {
    username: '',
    categories: []
  }

  logIn = (event, username) => {
    event.preventDefault()
    fetch(`http://localhost:4000/users/login/${username}`)
    .then(resp => resp.json())
    .then(this.props.setLoggedInUser)
  }

  signUp = (event, username, categories) => {
    event.preventDefault()
    fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        categories: categories
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

  checkBoxChange = event => {
    if (event.target.checked) {
      this.setState({
        categories: [...this.state.categories, event.target.id]
      })
    } else {
      this.setState({
        categories: [...this.state.categories].filter(id => id !== event.target.id)
      })
    }
  }

  render() {
    const [logout, collection, topNews, login, signup, categories, dashboard, ] = this.props.links
    const { loggedInUser } = this.props
    const accountLinks = [dashboard, topNews, collection, categories, logout]
    const loginLinks = [topNews, signup]
    const signUpLinks = [topNews, login]

    return (
      <div>
        <Route 
          path="/login"
          render={routerProps => <Login 
            {...routerProps}
            links={loginLinks}
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
            links={signUpLinks}
            loggedInUser={loggedInUser}
            username={this.state.username}
            categories={this.state.categories}
            signUp={this.signUp}
            usernameChange={this.usernameChange}
            checkBoxChange={this.checkBoxChange}
          />}
        />
        <Route
          exact path="/:username/account"
          render={routerProps => <Account 
            {...routerProps}
            links={accountLinks}
            loggedInUser={loggedInUser}
            username={this.state.username}
            categories={this.state.categories}
            signUp={this.signUp}
            usernameChange={this.usernameChange}
            checkBoxChange={this.checkBoxChange}
            unsubscribeFromCategory={this.props.unsubscribeFromCategory}
            unsubscribeSubmit={this.props.unsubscribeSubmit}
          />}
        />
      </div>
    )
  }
}

export default Auth
