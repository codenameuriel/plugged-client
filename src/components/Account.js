import React, { Component } from 'react'
import SubscribedCategoryCard from './SubscribedCategoryCard'
import Nav from './Nav'
import { Link } from 'react-router-dom'

class Account extends Component {
  renderCategories = () => {
    const { loggedInUser, unsubscribeFromCategory } = this.props

    return (loggedInUser.categories || []).map((category, index) => {
      return <SubscribedCategoryCard key={index} category={category.name} unsubscribeFromCategory={unsubscribeFromCategory}/>
    })
  }

  renderDisplay = () => {
    const { loggedInUser, unsubscribeSubmit, links } = this.props
    let accountView;

    if (loggedInUser.username && loggedInUser.categories.length > 0) {
      accountView = 
        <>
          <Nav links={links} />
          <h1>Welcome to your Account, {loggedInUser.username}</h1>
          <form onSubmit={event => {
            unsubscribeSubmit(event)
            alert("You're all up to date!")
            // history.push(`/${loggedInUser.username}/dashboard`)
          }}>
            {/* <label>Change your password: </label>
            <input type="password" /> */}
            <h3>Current category subscriptions</h3>
            <h5>Select to unsubscribe</h5>
            {this.renderCategories()}
            <input type="submit" />
          </form>
        </>
    } else if (loggedInUser.username && loggedInUser.categories.length === 0) {
      accountView = 
        <>
          <Nav links={links} />
          <h1>Welcome to your Account, {loggedInUser.username}</h1>
          <h3>You're not currently subscribed to any Categories</h3>
        </>
    } else {
      accountView = <h1><Link to="/login">Log in</Link> to edit your Account</h1>
    }
    return accountView
  }

  render() {
    return (
      <div>
        {this.renderDisplay()}
      </div>
    )
  }
}

export default Account
