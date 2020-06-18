import React, { Component } from 'react'
import SubscribedCategoryCard from './SubscribedCategoryCard'
import Nav from './Nav'
import { Link } from 'react-router-dom'
import AccountStyles from "../styles/Account.module.css"

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
          <header className={AccountStyles.header} >
            <h1><span className={AccountStyles.span} >{loggedInUser.username}</span>'s Account</h1>
            <p>You can edit your subscriptions and newspapers</p>
          </header>
          <Nav links={links} />
          <form onSubmit={event => {
            unsubscribeSubmit(event)
            alert("You're all up to date!")
            // history.push(`/${loggedInUser.username}/dashboard`)
          }}>
            {/* <label>Change your password: </label>
            <input type="password" /> */}
            <h3 className={AccountStyles.h3} >Current subscriptions</h3>
            <div className={AccountStyles.div} >
              <h4 className={AccountStyles.h4} >Select to unsubscribe</h4>
              <fieldset className={AccountStyles.accountFieldset} >
                <h6 className={AccountStyles.h6} >Categories</h6>
                {this.renderCategories()}
              </fieldset><br />
              <input className={AccountStyles.unsubscribe} type="submit" value="Unsubscribe" />
            </div>
            
          </form>
        </>
    } else if (loggedInUser.username && loggedInUser.categories.length === 0) {
      accountView = 
        <>
          <header className={AccountStyles.header} >
            <h1><span className={AccountStyles.span} >{loggedInUser.username}</span>'s Account</h1>
            <p>You can edit your subscriptions and newspapers</p>
          </header>
          <Nav links={links} />
          <h3 className={AccountStyles.h3} >You're not currently subscribed to any news</h3>
        </>
    } else {
      accountView = <h5 className={AccountStyles.h5} ><Link className={AccountStyles.link} to="/login">Log in</Link> to edit your Account</h5>
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
