import React, { Component } from 'react'
// import { apiKey } from './apiKey'
import Nav from './Nav'
import NewsMapper from './NewsMapper'

export default class GeneralNews extends Component {
  state = {
    generalNews: []
  }

  componentDidMount() {
    // this.getgeneralNews()
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
      generalNews: data
    }))
  }

  // getgeneralNews = () => {
  //   const { page } = this.state

  //   fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=5&${page}`, apiKey)
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     generalNews: data.articles
  //   }))
  // }

  render() {
    const { generalNews } = this.state
    const { links, loggedInUser, postArticle } = this.props

    return (
      <div>
        <Nav links={links}/>
        <h1>Top stories in General</h1>
        <NewsMapper 
          news={generalNews}
          loggedInUser={loggedInUser}
          postArticle={postArticle}
        />
      </div>
    )
  }
}
