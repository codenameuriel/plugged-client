/** @format */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// import components
import TopNews from './containers/TopNews/TopNews';
import Dashboard from './containers/Dashboard/Dashboard';
import CollectionNews from './containers/CollectionNews/CollectionNews';
import Categories from './containers/Categories/Categories';
import Source from './components/SourceNews'; // change to Source
import Newspaper from './components/NewspaperMenu'; // change to Newspaper
import Auth from './containers/Auth/Auth';
import TopicNews from './containers/TopicNews/TopicNews';

class App extends React.Component {
  // state = {
  //   loggedInUser: {},
  //   categories: [],
  //   unsubscribe: [],
  //   article: {},
  //   topics: [],
  //   sources: [],
  //   loggedInUsersNewspapers: [],
  //   newspaper: {},
  //   isAuthenticated: false
  // }

  // setNewspaper = title => {
  //   const { loggedInUsersNewspapers } = this.state
  //   let selectedNewspaper = loggedInUsersNewspapers.find(newspaper => newspaper.title === title)

  //   this.setState({
  //     newspaper: selectedNewspaper
  //   })
  // }

  // updateUsersNewspapers = newspaper => {
  //   const { loggedInUsersNewspapers } = this.state

  //   this.setState({
  //     loggedInUsersNewspapers: [...loggedInUsersNewspapers, newspaper]
  //   })
  // }

  // deleteNewspaper = (newspaper, user) => {
  //   fetch(`http://localhost:4000/newspaper/${newspaper.title}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       title: newspaper.title,
  //       user: user.id
  //     })
  //   })
  //   .then(resp => resp.json())
  //   .then(this.setState({
  //     loggedInUsersNewspapers: [...this.state.loggedInUsersNewspapers].filter(n => n.title !== newspaper.title)
  //   }))
  // }

  // postArticle = article => {
  //   fetch('http://localhost:4000/articles', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify(article)
  //   })
  //   .then(resp => resp.json())
  //   .then(this.setArticle)
  // }

  // setArticle = article => {
  //   this.setState({
  //     article: article
  //   }, () => this.addToCollection(this.state.article))
  // }

  // addToCollection = article => {
  //   let collectionObj = {
  //     user_id: this.state.loggedInUser.id,
  //     article_id: this.state.article.id
  //   }

  //   fetch('http://localhost:4000/collections', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify(collectionObj)
  //   })
  // }

  // setLoggedInUser = user => {
  //   this.setState({
  //     loggedInUser: user,
  //     categories: user.categories,
  //     topics: user.topics,
  //     sources: user.sources,
  //     loggedInUsersNewspapers: user.get_newspapers
  //   })
  // }

  // logOutUser = () => {
  //   this.setState({
  //     loggedInUser: {},
  //     categories: [],
  //     topics: [],
  //     sources: []
  //   })
  // }

  // subscribeToCategory = (userID, category) => {
  //   fetch('http://localhost:4000/user_categories', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user_id: userID,
  //       category_name: category
  //     })
  //   })
  //   .then(resp => resp.json())
  //   .then(this.setLoggedInUser)
  //   // .then(console.log)
  // }

  // unsubscribeFromCategory = category => {
  //   let list = this.state.unsubscribe

  //   if (!list.find(c => c === category)){
  //     this.setState({
  //       unsubscribe: [...list, category]
  //     })
  //   } else {
  //     this.setState({
  //       unsubscribe: [...list.filter(c => c !== category)]
  //     })
  //   }
  // }

  // unsubscribeSubmit = event => {
  //   event.preventDefault()

  //   fetch('http://localhost:4000/user_categories/unsubscribe', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user_id: this.state.loggedInUser.id,
  //       categories: this.state.unsubscribe
  //     })
  //   })
  //   .then(resp => resp.json())
  //   .then(this.setLoggedInUser)
  //   .then(this.setState({
  //     unsubscribe: []
  //   }))
  // }

  render() {
    const { user: isAuthenticated } = this.props

    // base routes, no user authentication needed
    let routes = (
      <Switch>
        <Route path='/login' component={Auth} />
        <Route path='/signup' component={Auth} />
        <Route path='/top-news' component={TopNews} />
        <Redirect from='/' to='/top-news' />
      </Switch>
    )

    // routes only available when a user is authenticated
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/login' component={Auth} />
          <Route path='/signup' component={Auth} />
          <Route path='/top-news' component={TopNews} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/topic-news' component={TopicNews} />
          <Route path='/collection' component={CollectionNews} />
          <Route path='/categories' component={Categories} />
          <Route path='/sources' component={Source} />
          <Route path='/newspapers' component={Newspaper} />
        </Switch>
      )
    }

    // const links = [
    //   <NavLink className={`${AppStyles.link} ${AppStyles.right}`} onClick={this.logOutUser} to="/top-news">LOG OUT</NavLink>,
    //   <NavLink className={AppStyles.link} to="/collection">COLLECTION</NavLink>,
    //   <NavLink
    //     className={AppStyles.link}
    //     to="/top-news"
    //   >TOP NEWS</NavLink>,
    //   <NavLink className={`${AppStyles.link} ${AppStyles.right}`} to="/login">LOG IN</NavLink>,
    //   <NavLink className={`${AppStyles.link} ${AppStyles.right}`} to="/signup">SIGN UP</NavLink>,
    //   <NavLink className={AppStyles.link} to="/categories">CATEGORIES</NavLink>,
    //   <NavLink className={AppStyles.link} to={`/${this.state.loggedInUser.username}/dashboard`}>DASHBOARD</NavLink>,
    //   <NavLink className={`${AppStyles.link} ${AppStyles.right}`} to={`/${this.state.loggedInUser.username}/account`}>ACCOUNT</NavLink>,
    //   <NavLink  className={AppStyles.link} to="/sources">SOURCES</NavLink>,
    //   <NavLink className={AppStyles.link} to="/newspapers">NEWSPAPER</NavLink>
    // ]

    return routes
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(App)
