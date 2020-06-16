import React, { Component } from 'react'
import { apiKey } from '../apiKey'
import Nav from './Nav.js'
import NewsMapper from './NewsMapper'

import TopNewsStyles from '../styles/TopNews.module.css'

class TopNews extends Component {
  state = {
    topNews: []
  }

  componentDidMount() {
    // this.getArticlesFromDB()
    this.getTopNews()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page)
      // this.getArticlesFromDB()
      this.getTopNews()
  }

  getTopNews = () => {
    const { page, setTotalResults } = this.props
    
    fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=9&page=${page}`, apiKey)
      .then(resp => resp.json())
      .then(data => this.setState({
         topNews: data.articles 
       }, () => setTotalResults(data.totalResults)))
  }
  
  // getArticlesFromDB = () => {
  //   fetch(`http://localhost:4000/articles?per_page=3&page=${this.props.page}`)
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     topNews: data
  //   }))
  // }

  render() {
    const { 
      page, loggedInUser, showPrevPageButton, prevPage, nextPage, lastPage
    } = this.props

    let jumbotronMessage; 
    let nextPageInnerText = `Go to Page ${page + 1}`

    if (!loggedInUser.username) {
      jumbotronMessage = 'Log in or create an account to get your news'
    }

    if (lastPage) {
      nextPageInnerText = 'Back to Page 1'
    }

    return (
      <div>
          <header className={TopNewsStyles.header} >
            <h1>Top Headlines</h1>
            <p>{jumbotronMessage}</p>
          </header>
        <Nav 
          links={this.props.links}
        />
        {showPrevPageButton && 
          <button className={TopNewsStyles.button} onClick={prevPage} >Previous Page</button>
        }
        <button
          className={TopNewsStyles.button} 
          onClick={nextPage} >{nextPageInnerText}</button>
        <NewsMapper
          news={this.state.topNews}
          loggedInUser={this.props.loggedInUser}
          postArticle={this.props.postArticle}
        />
      </div>
    )
  }
}

export default TopNews
