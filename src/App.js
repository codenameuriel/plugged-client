import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Auth from './components/Auth'
import PageManager from './components/PageManager'
import AppStyles from './styles/App.module.css'

class App extends Component {
  state = {
    loggedInUser: {}, 
    categories: [],
    unsubscribe: [],
    article: {},
    topics: [],
    sources: [],
    loggedInUsersNewspapers: [],
    newspaper: {}
  }

  setNewspaper = title => {
    const { loggedInUsersNewspapers } = this.state
    let selectedNewspaper = loggedInUsersNewspapers.find(newspaper => newspaper.title === title)

    this.setState({
      newspaper: selectedNewspaper
    })
  }

  updateUsersNewspapers = newspaper => {
    const { loggedInUsersNewspapers } = this.state

    this.setState({
      loggedInUsersNewspapers: [...loggedInUsersNewspapers, newspaper]
    })
  }

  deleteNewspaper = (newspaper, user) => {
    fetch(`http://localhost:4000/newspaper/${newspaper.title}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: newspaper.title,
        user: user.id
      })
    })
    .then(resp => resp.json())
    // .then(console.log)
    .then(this.setState({
      loggedInUsersNewspapers: [...this.state.loggedInUsersNewspapers].filter(n => n.title !== newspaper.title)
    }))
  }

  postArticle = article => {
    fetch('http://localhost:4000/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(article)
    })
    .then(resp => resp.json())
    .then(this.setArticle)
  }

  setArticle = article => {
    this.setState({
      article: article
    }, () => this.addToCollection(this.state.article))
  }

  addToCollection = article => {
    let collectionObj = {
      user_id: this.state.loggedInUser.id,
      article_id: this.state.article.id
    }

    fetch('http://localhost:4000/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(collectionObj)
    })
  }

  setLoggedInUser = user => {
    this.setState({
      loggedInUser: user,
      categories: user.categories,
      topics: user.topics,
      sources: user.sources,
      loggedInUsersNewspapers: user.get_newspapers
    })
  }

  logOutUser = () => {
    this.setState({
      loggedInUser: {},
      categories: [],
      topics: [],
      sources: []
    })
  }

  subscribeToCategory = (userID, category) => {
    fetch('http://localhost:4000/user_categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: userID,
        category_name: category
      })
    })
    .then(resp => resp.json())
    .then(this.setLoggedInUser)
    // .then(console.log)
  }

  unsubscribeFromCategory = category => {
    let list = this.state.unsubscribe

    if (!list.find(c => c === category)){
      this.setState({
        unsubscribe: [...list, category]
      })
    } else {
      this.setState({
        unsubscribe: [...list.filter(c => c !== category)]
      })
    }
  }

  unsubscribeSubmit = event => {
    event.preventDefault()

    fetch('http://localhost:4000/user_categories/unsubscribe', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.loggedInUser.id,
        categories: this.state.unsubscribe
      })
    })
    .then(resp => resp.json())
    .then(this.setLoggedInUser)
    .then(this.setState({
      unsubscribe: []
    }))
  }
  
  render() {
    const links = [
      <NavLink className={`${AppStyles.link} ${AppStyles.right}`} onClick={this.logOutUser} to="/top-news">LOG OUT</NavLink>,
      <NavLink className={AppStyles.link} to="/collection">COLLECTION</NavLink>,
      <NavLink 
        className={AppStyles.link} 
        to="/top-news" 
      >TOP NEWS</NavLink>,
      <NavLink className={`${AppStyles.link} ${AppStyles.right}`} to="/login">LOG IN</NavLink>,
      <NavLink className={`${AppStyles.link} ${AppStyles.right}`} to="/signup">SIGN UP</NavLink>,
      <NavLink className={AppStyles.link} to="/categories">CATEGORIES</NavLink>,
      <NavLink className={AppStyles.link} to={`/${this.state.loggedInUser.username}/dashboard`}>DASHBOARD</NavLink>,
      <NavLink className={`${AppStyles.link} ${AppStyles.right}`} to={`/${this.state.loggedInUser.username}/account`}>ACCOUNT</NavLink>,
      <NavLink  className={AppStyles.link} to="/sources">SOURCES</NavLink>,
      <NavLink className={AppStyles.link} to="/newspapers">NEWSPAPER</NavLink>
    ]

    return (
      <div>
        <PageManager
           links={links}
           loggedInUser={this.state.loggedInUser}
           postArticle={this.postArticle}
           subscribeToCategory={this.subscribeToCategory}
           loggedInUsersNewspapers={this.state.loggedInUsersNewspapers}
           updateUsersNewspapers={this.updateUsersNewspapers}
           setNewspaper={this.setNewspaper}
           newspaper={this.state.newspaper}
           deleteNewspaper={this.deleteNewspaper}
        />
        <Auth
          links={links}
          loggedInUser={this.state.loggedInUser}
          setLoggedInUser={this.setLoggedInUser}
          unsubscribeFromCategory={this.unsubscribeFromCategory}
          unsubscribeSubmit={this.unsubscribeSubmit}
        />
      </div>
    );
  }
}

export default App
