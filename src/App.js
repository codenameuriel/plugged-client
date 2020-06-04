import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Dashboard from './Dashboard'
import Auth from './Auth'

const links = [
  <NavLink to="/dashboard">Home</NavLink>,
  <NavLink to="/login">Log in</NavLink>, 
  <NavLink to="/signup">Sign up</NavLink>
]

class App extends Component {
  state = {
    loggedInUser: {}
  }

  setLoggedInUser = user => {
    this.setState({
      loggedInUser: user
    })
  }

  render() {
    const [, login, signup] = links

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
            links={[login, signup]}
            loggedInUser={this.state.loggedInUser}
            />}
        />
      </div>
    );
  }
}

export default App;
