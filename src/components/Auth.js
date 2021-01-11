import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';;
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import AuthStyles from '../styles/Auth.module.css';

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
    .then(this.setState({
      username: ''
    }))
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
    .then(this.setState({
      username: ''
    }))
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
    const authTopNewsLink =
      <NavLink className={`${AuthStyles.link} ${AuthStyles.right}`} to="/top-news">TOP NEWS</NavLink>

    const [logout, collection, topNews, login, signup, categories, dashboard, account, sources, newspaper] = this.props.links
    const { loggedInUser } = this.props
    const accountLinks = [dashboard, topNews, categories, sources, collection, newspaper, logout]
    const loginLinks = [signup, authTopNewsLink]
    const signUpLinks = [login, authTopNewsLink]

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
