import React, { Component } from 'react'
import { apiKey } from '../apiKey'
import Nav from './Nav'
import NewsMapper from './NewsMapper'

export default class HealthNews extends Component {
  state = {
    healthNews: []
  }

  componentDidMount() {
    this.getHealthNews()
    // this.getArticlesFromDB()
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props

    if (prevProps.page !== page)
      // this.getArticlesFromDB()
      this.getHealthNews()
  }

  // getArticlesFromDB = () => {
  //   fetch(`http://localhost:4000/articles?per_page=3&page=${this.props.page}`)
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     healthNews: data
  //   }))
  // }

  getHealthNews = () => {
    const { page, setTotalResults } = this.props

    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=health&pageSize=9&page=${page}`, apiKey)
    .then(resp => resp.json())
    .then(data => this.setState({
      healthNews: data.articles
    }, () => setTotalResults(data.totalResults)))
  }

  render() {
    const { healthNews } = this.state
    const { page, links, loggedInUser, postArticle, showPrevPageButton, prevPage, nextPage, lastPage } = this.props
  
    let nextPageInnerText = `Go to Page ${page + 1}`
  
    if (lastPage) {
      nextPageInnerText = 'Back to Page 1'
    }
  
    return (
      <div>
        <Nav links={links}/>
        <h1>Top stories in Health</h1>
        {showPrevPageButton && 
          <button onClick={prevPage} >Previous Page</button>}
        <button onClick={nextPage} >{nextPageInnerText}</button>
        <NewsMapper 
          news={healthNews}
          loggedInUser={loggedInUser}
          postArticle={postArticle}
        />
      </div>
    )
  }
}
