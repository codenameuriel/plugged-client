import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth'
import PageManager from './PageManager'

export default class App extends Component {
  state = {
    loggedInUser: {},
    categories: [],
    article: {}
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
    .then(resp => resp.json())
    .then(console.log)
  }

  setLoggedInUser = user => {
    this.setState({
      loggedInUser: user,
      categories: user.categories
    })
  }

  logOutUser = () => {
    this.setState({
      loggedInUser: {},
      categories: []
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
  }

  render() {
    const links = [
      <Link onClick={this.logOutUser} to="/top-news">Log out</Link>,
      <Link to="/collection">Collection</Link>,
      <Link to="/top-news">Top News</Link>,
      <Link to="/login">Log in</Link>,
      <Link to="/signup">Sign up</Link>,
      <Link to="/categories">Categories</Link>,
      <Link to={`/${this.state.loggedInUser.username}/dashboard`}>Dashboard</Link>
    ]
  
    let authLinks = [links[2], links[3], links[4]]

    return (
      <div className="App">
        <PageManager
           links={links}
           loggedInUser={this.state.loggedInUser}
           postArticle={this.postArticle}
           subscribeToCategory={this.subscribeToCategory}
        />
        <Auth
          links={authLinks}
          loggedInUser={this.state.loggedInUser}
          setLoggedInUser={this.setLoggedInUser}
        />
      </div>
    );
  }
}
