import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth'
// import CategorySelector from './CategorySelector';
// import BusinessNews from './BusinessNews'
import PageManager from './PageManager'

export default class App extends Component {
  state = {
    loggedInUser: {},
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
    }, () => this.addToUserCollection(this.state.article))
  }

  addToUserCollection = article => {
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
      <Link onClick={this.logOutUser} to="/top-news">Log out</Link>,
      <Link to="/collection">Collection</Link>,
      <Link to="/top-news">Dashboard</Link>,
      <Link to="/login">Log in</Link>,
      <Link to="/signup">Sign up</Link>,
      <Link to="/categories">Categories</Link>
    ]
  
    let authLinks = [links[2], links[3], links[4]]

    return (
      <div className="App">
        <PageManager
           links={links}
           loggedInUser={this.state.loggedInUser}
           postArticle={this.postArticle}
        />
        <Auth
          links={authLinks}
          loggedInUser={this.state.loggedInUser}
          setLoggedInUser={this.setLoggedInUser}
        />
        {/* <Route
          exact path="/dashboard/categories"
          render={routerProps => <CategorySelector
            {...routerProps}
          />}
        />
        <Route
          exact path="/dashboard/categories/business"
          render={routerProps => <BusinessNews
            loggedInUser={this.state.loggedInUser}
            page={this.state.page}
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
            postArticle={this.postArticle}
          />}
        />  */}
      </div>
    );
  }
}
