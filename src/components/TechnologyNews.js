import React, { Component } from 'react'
import { apiKey } from '../apiKey'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import NewsMapper from './NewsMapper'
import CategoryNewsStyles from "../styles/CategoryNews.module.css"

export default class TechnologyNews extends Component {
  state = {
    technologyNews: []
  }

  componentDidMount() {
    this.getTechnologyNews()
    // this.getArticlesFromDB()
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props

    if (prevProps.page !== page)
      // this.getArticlesFromDB()
      this.getTechnologyNews()
  }

  // getArticlesFromDB = () => {
  //   fetch(`http://localhost:4000/articles?per_page=3&page=${this.props.page}`)
  //   .then(resp => resp.json())
  //   .then(data => this.setState({
  //     technologyNews: data
  //   }))
  // }

  getTechnologyNews = () => {
    const { page, setTotalResults } = this.props

    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=9&page=${page}`, apiKey)
    .then(resp => resp.json())
    .then(data => this.setState({
      technologyNews: data.articles
    }, () => setTotalResults(data.totalResults)))
  }

  renderDisplay = () => {
    const { technologyNews } = this.state
    const { page, links, loggedInUser, postArticle, showPrevPageButton, prevPage, nextPage, lastPage } = this.props
    let display;

    let nextPageInnerText = `Go to Page ${page + 1}`

    if (lastPage) {
      nextPageInnerText = 'Back to Page 1'
    }

    if (loggedInUser.username) {
      display = 
        <>
          <header className={CategoryNewsStyles.header} >
            <h1>Top stories in Technology</h1>
          </header>
          <Nav links={links}/>
          {showPrevPageButton && 
            <button className={CategoryNewsStyles.button} onClick={prevPage} >Previous Page</button>}
          <button className={CategoryNewsStyles.button} onClick={nextPage} >{nextPageInnerText}</button>
          <NewsMapper 
            news={technologyNews}
            loggedInUser={loggedInUser}
            postArticle={postArticle}
          />
        </>
    } else {
      display = 
        <>
          <h5 className={CategoryNewsStyles.h5} ><Link className={CategoryNewsStyles.link} to="/login">Log in</Link> to view your Sports news</h5>
        </>
    }
    return display
  }


  render() {
    return (
      <div>
        {this.renderDisplay()}
      </div>
    )
  }
}
