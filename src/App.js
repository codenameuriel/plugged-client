import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Dashboard from './Dashboard'
import Login from './Login'
import Signup from './Signup'

const links = [
  <NavLink to="/dashboard">Home</NavLink>,
  <NavLink to="/login">Log in</NavLink>, 
  <NavLink to="/signup">Sign up</NavLink>
]

class App extends Component {
  render() {
    const [home, login, signup] = links

    return (
      <div className="App">
        <Route 
            exact path="/dashboard" 
            render={routerProps => <Dashboard
              {...routerProps}
              links={[login, signup]}
              />}
          />
          <Route 
            exact path="/login" 
            render={routerProps => <Login 
              {...routerProps}
              links={[home, signup]}
              />}
          />
          <Route 
            exact path="/signup" 
            render={routerProps => <Signup 
              {...routerProps}
              links={[home, login]}
              />}
          />
      </div>
    );
  }
}

export default App;
