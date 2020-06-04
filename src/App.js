import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Dashboard from './Dashboard'
import Auth from './Auth'

class App extends Component {
  state = {
    loggedInUser: {}
  }

  setLoggedInUser = user => {
    this.setState({
      loggedInUser: user
    })
  }

  logOutUser = () => {
    this.setState({
      loggedInUser: {}
    })
  }

  render() {
    const links = [
      <NavLink to="/dashboard">Home</NavLink>,
      <NavLink to="/login">Log in</NavLink>, 
      <NavLink to="/signup">Sign up</NavLink>,
      <NavLink onClick={this.logOutUser} to="/dashboard">Log out</NavLink>
    ]

    return (
      <div className="App">
        <Auth
          links={links}
          loggedInUser={this.state.loggedInUser}
          setLoggedInUser={this.setLoggedInUser}
        />
        <Route 
          exact path="/dashboard" 
          render={routerProps => <Dashboard
            {...routerProps}
            links={links}
            loggedInUser={this.state.loggedInUser}
            />}
        />
      </div>
    );
  }
}

export default App;
