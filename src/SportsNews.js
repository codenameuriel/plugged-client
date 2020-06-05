import React, { Component } from 'react'
// import { apiKey } from './apiKey'
import Nav from './Nav'
import NewsMapper from './NewsMapper'

export default class SportsNews extends Component {
  state = {
    sportsNews: []
  }

  componentDidMount() {
    // this.getsportsNews()
    this.getArticlesFromDB()
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props

    if (prevProps.page !== page)
      this.getArticlesFromDB()
  }

  getArticlesFromDB = () => {
    fetch(`http://localhost:4000/articles?per_page=3&page=${this.props.page}`)
    .then(resp => resp.json())
    .then(data => this.setState({
      sportsNews: data
    }))
  }

  // getsportsNews = () => {
  //   const { page } = this.state

  //   fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=5&${page}`, apiKey)
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     sportsNews: data.articles
  //   }))
  // }

  render() {
    const { sportsNews } = this.state
    const { links, loggedInUser, postArticle } = this.props

    return (
      <div>
        <Nav links={links}/>
        <h1>Top stories in Sports</h1>
        <NewsMapper 
          news={sportsNews}
          loggedInUser={loggedInUser}
          postArticle={postArticle}
        />
      </div>
    )
  }
}
