import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Auth from './Auth'
import Collection from './Collection';
import { apiKey }  from './apiKey'
import TopNewsContainer from './TopNewsContainer'

class App extends Component {
  state = {
    loggedInUser: {},
    page: 1,
    topNews: [],
    showPrevPageButton: false,
    article: {}
  }

  componentDidMount() {
    this.getTopNews()
  }

  getTopNews = () => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${this.state.page}`, apiKey)
      .then(resp => resp.json())
      .then(data => this.setState({
        topNews: data.articles
      }))
  }

  togglePrevPageButton = () => {
    if (this.state.page === 1) {
      this.setState({
        showPrevPageButton: false
      })
    } else {
      this.setState({
        showPrevPageButton: true
      })
    }
  }

  nextPage = () => {
    let page = this.state.page
    if (page === 8 ) {
      this.setState({
        page: 1
      }, () => {
        this.togglePrevPageButton()
        this.getTopNews()
      })
    } else {
      this.setState({
        page: page + 1
      }, () => {
        this.togglePrevPageButton()
        this.getTopNews()
      })
    }
  }

  prevPage = () => {
    let page = this.state.page
    if (page !== 1) {
      this.setState({
        page: page - 1
      }, () => {
        this.togglePrevPageButton()
        this.getTopNews()
      })
    }
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
    const logoutLink = <NavLink onClick={this.logOutUser} to="/dashboard">Log out</NavLink>
    const collectionLink = <NavLink to="/dashboard/collection">Collection</NavLink>
    const dashboardLink = <NavLink to="/dashboard">Dashboard</NavLink>
    const loginLink = <NavLink to="/login">Log in</NavLink>
    const signupLink = <NavLink to="/signup">Sign up</NavLink>
  
    let topNewsLinks;
    let collectionLinks;
    let authLinks = [dashboardLink, loginLink, signupLink]

    if (this.state.loggedInUser.username) {
      topNewsLinks = [collectionLink, logoutLink]
      collectionLinks = [dashboardLink, logoutLink]
    } else {
      topNewsLinks = [loginLink, signupLink]
    }

    return (
      <div className="App">
        <Auth
          links={authLinks}
          loggedInUser={this.state.loggedInUser}
          setLoggedInUser={this.setLoggedInUser}
        />
        <Route
          exact path="/dashboard"
          render={routerProps => <TopNewsContainer 
            {...routerProps}
            links={topNewsLinks}
            loggedInUser={this.state.loggedInUser}
            topNews={this.state.topNews}
            page={this.state.page}
            showPrevPageButton={this.state.showPrevPageButton}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
            postArticle={this.postArticle}
          />}
        />
        <Route
          exact path="/dashboard/collection"
          render={routerProps => <Collection 
            {...routerProps}
            links={collectionLinks}
          />}
        />
      </div>
    );
  }
}

export default App;
