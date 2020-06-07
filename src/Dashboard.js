import React, { Component } from 'react'
import Nav from './Nav'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Nav links={this.props.links}/>
        <h1>Welcome to your dashboard, {this.props.loggedInUser.username}</h1>
      </div>
    )
  }
}

export default Dashboard
