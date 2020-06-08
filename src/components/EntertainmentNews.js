import React, { Component } from 'react'
import { apiKey } from '../apiKey'
import Nav from './Nav'
import NewsMapper from './NewsMapper'

export default class EntertainmentNews extends Component {
  state = {
    entertainmentNews: []
  }

  componentDidMount() {
    this.getEntertainmentNews()
    // this.getArticlesFromDB()
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props

    if (prevProps.page !== page)
      // this.getArticlesFromDB()
      this.getEntertainmentNews()
  }

  // getArticlesFromDB = () => {
  //   fetch(`http://localhost:4000/articles?per_page=3&page=${this.props.page}`)
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     entertainmentNews: data
  //   }))
  // }

  getEntertainmentNews = () => {
    const { page, setTotalResults } = this.props

    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=entertainment&pageSize=9&page=${page}`, apiKey)
    .then(resp => resp.json())
    .then(data => this.setState({
      entertainmentNews: data.articles
    }, () => setTotalResults(data.totalResults)))
  }

  render() {
    const { entertainmentNews } = this.state
    const { page, links, loggedInUser, postArticle, showPrevPageButton, prevPage, nextPage, lastPage } = this.props

    let nextPageInnerText = `Go to Page ${page + 1}`

    if (lastPage) {
      nextPageInnerText = 'Back to Page 1'
    }

    return (
      <div>
        <Nav links={links}/>
        <h1>Top stories in Entertainment</h1>
        {showPrevPageButton && 
        <button onClick={prevPage} >Previous Page</button>}
        <button onClick={nextPage} >{nextPageInnerText}</button>
        <NewsMapper 
          news={entertainmentNews}
          loggedInUser={loggedInUser}
          postArticle={postArticle}
        />
      </div>
    )
  }
}
