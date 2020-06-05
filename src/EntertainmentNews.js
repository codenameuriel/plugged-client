import React, { Component } from 'react'
// import { apiKey } from './apiKey'
import Nav from './Nav'
import NewsMapper from './NewsMapper'

export default class EntertainmentNews extends Component {
  state = {
    entertainmentNews: []
  }

  componentDidMount() {
    // this.getBusinessNews()
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
      entertainmentNews: data
    }))
  }

  // getBusinessNews = () => {
  //   const { page } = this.state

  //   fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=5&${page}`, apiKey)
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     businessNews: data.articles
  //   }))
  // }

  render() {
    const { entertainmentNews } = this.state
    const { links, loggedInUser, postArticle } = this.props

    return (
      <div>
        <Nav links={links}/>
        <h1>Top stories in Entertainment</h1>
        <NewsMapper 
          news={entertainmentNews}
          loggedInUser={loggedInUser}
          postArticle={postArticle}
        />
      </div>
    )
  }
}
