import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { apiKey } from './apiKey'
import Nav from './Nav'
import NewsMapper from './NewsMapper'

class Dashboard extends Component {
  state = {
    articles: [],
    categories: []
  }

  componentDidMount() {
    if (this.props.loggedInUser.categories) {
      this.getUsersCategoryNews()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.state.articles.length < 1){
      this.getUsersCategoryNews()
    }
  }

  getUsersCategoryNews = () => {
    const { loggedInUser } = this.props
  
    loggedInUser.categories.forEach(category => {
      fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category.name.toLowerCase()}&pageSize=5&page=1`, apiKey)
      .then(resp => resp.json())
      .then(data => this.setState({
        articles: [...this.state.articles, data.articles]
      }, this.setState({
        categories: [...this.state.categories, category.name]
        })
      ))
    })
  }

  passDownToNewsMapper = () => {
    let views = []
    this.state.articles.forEach((articles, index) => views.push(<NewsMapper 
    key={index} news={articles} loggedInUser={this.props.loggedInUser} postArticle={this.props.postArticle} />))
    return views
  }

  createH1ForCategories = () => {
    let headers = []
    this.state.categories.forEach(category => headers.push(<h3>Top News in {category}</h3>))
    return headers
  }

  render() {
    const { loggedInUser, links } = this.props
    let dashboardDisplay;
    let v1, v2, v3, v4, v5, v6
    let header1, header2, header3, header4, header5, header6

    if (this.state.articles.length > 0) {
      const [view1, view2, view3, view4, view5, view6] = this.passDownToNewsMapper()
      const [h1, h2, h3, h4, h5, h6] = this.createH1ForCategories()

      v1 = view1
      v2 = view2
      v3 = view3
      v4 = view4
      v5 = view5
      v6 = view6

      header1 = h1
      header2 = h2
      header3 = h3
      header4 = h4
      header5 = h5
      header6 = h6

      dashboardDisplay = 
        <>
          <h1>Welcome to your Dashboard, {loggedInUser.username}</h1>
          <h2>Here are your top news</h2>
          {header1}
          {v1}
          {header2}
          {v2}
          {header3}
          {v3}
          {header4}
          {v4}
          {header5}
          {v5}
          {header6}
          {v6}
        </>
    } else if (!loggedInUser.username) {
      dashboardDisplay = <h1><Link to="/login">Log in</Link> to see your top news</h1>
    } else {
      dashboardDisplay = 
        <>
          <h1>You are not subscribed to any news categories</h1>
          <p><Link to="/categories">Subscribe</Link> to categories here!</p>
        </>
    }
    
    return (
      <div>
        <Nav links={links}/>
        {dashboardDisplay}
      </div>
    )
  }
}

export default Dashboard
